/**
 * Ihifix website → Google Sheet
 *
 * Receives submissions from the website's "Start a project" and "Send us your CV" forms, adds one row per
 * submission to the "Enquiries" or "CV applications" tab, and saves any uploaded file (brief, ToR or CV) to a
 * Google Drive folder, with a link to it in the row. Setup steps: integrations/google-sheets/README.md
 */

// 1. Replace this with a long random secret, and put the same value in SHEETS_WEBHOOK_SECRET on Vercel.
const SECRET = 'PASTE-YOUR-SECRET-HERE'

// 2. Uploaded files go into this Drive folder (created automatically the first time).
const FOLDER_NAME = 'Ihifix website uploads'

const FORMS = {
  enquiry: {
    tab: 'Enquiries',
    columns: [
      ['submittedAt', 'Submitted'],
      ['type', 'Enquiry type'],
      ['name', 'Name'],
      ['organisation', 'Organisation'],
      ['role', 'Role'],
      ['email', 'Email'],
      ['phone', 'Phone'],
      ['services', 'Services of interest'],
      ['budget', 'Budget'],
      ['timeline', 'Timeline'],
      ['reference', 'Tender reference'],
      ['deadline', 'Tender deadline'],
      ['brief', 'Project brief'],
      ['file', 'Attachment'],
    ],
  },
  application: {
    tab: 'CV applications',
    columns: [
      ['submittedAt', 'Submitted'],
      ['name', 'Name'],
      ['email', 'Email'],
      ['phone', 'Phone'],
      ['location', 'City / State'],
      ['area', 'Area of interest'],
      ['experience', 'Experience'],
      ['link', 'LinkedIn / portfolio'],
      ['note', 'Note'],
      ['file', 'CV'],
    ],
  },
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents)
    if (SECRET === 'PASTE-YOUR-SECRET-HERE' || body.secret !== SECRET) return reply({ ok: false, error: 'unauthorised' })
    const form = FORMS[body.form]
    if (!form) return reply({ ok: false, error: 'unknown form' })

    const lock = LockService.getScriptLock()
    lock.waitLock(20000)
    try {
      const sheet = getTab(form)
      const fileUrl = body.file && body.file.data ? saveFile(body.file, body.form, body.fields || {}) : ''
      const row = form.columns.map(([key]) => {
        if (key === 'submittedAt') return new Date(body.submittedAt || Date.now())
        if (key === 'file') return fileUrl
        return clean((body.fields || {})[key])
      })
      sheet.appendRow(row)
    } finally {
      lock.releaseLock()
    }
    return reply({ ok: true })
  } catch (err) {
    return reply({ ok: false, error: String(err) })
  }
}

// Opening the web app URL in a browser shows this, so you can check the deployment is live.
function doGet() {
  return reply({ ok: true, message: 'Ihifix form endpoint is running.' })
}

function getTab(form) {
  const book = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = book.getSheetByName(form.tab)
  if (!sheet) {
    sheet = book.insertSheet(form.tab)
    sheet.appendRow(form.columns.map(([, label]) => label))
    sheet.setFrozenRows(1)
    sheet.getRange(1, 1, 1, form.columns.length).setFontWeight('bold').setBackground('#05145a').setFontColor('#ffffff')
  }
  return sheet
}

function saveFile(file, formName, fields) {
  const folders = DriveApp.getFoldersByName(FOLDER_NAME)
  const folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(FOLDER_NAME)
  const who = String(fields.name || 'unknown').replace(/[^\w\s.-]/g, '').trim()
  const stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HHmm')
  const blob = Utilities.newBlob(Utilities.base64Decode(file.data), file.type || 'application/octet-stream', `${stamp} ${formName} ${who} - ${file.name}`)
  return folder.createFile(blob).getUrl()
}

// Text that starts with = + - @ would be read as a formula; prefix it so it stays plain text.
function clean(value) {
  const text = value == null ? '' : String(value)
  return /^[=+\-@]/.test(text) ? "'" + text : text
}

function reply(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON)
}
