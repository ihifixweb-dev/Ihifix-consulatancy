/**
 * Saves website form submissions to the Ihifix Google Sheet (see integrations/google-sheets/README.md).
 *
 * The sheet is fed by a small Google Apps Script web app. Set two environment variables (on Vercel and in .env.local):
 *   SHEETS_WEBHOOK_URL     the web app URL that ends in /exec
 *   SHEETS_WEBHOOK_SECRET  the same secret written into the script
 * Uploaded files are sent along with the row; the script stores them in Google Drive and links them in the sheet.
 * Server-side only: called from the form server actions, so the URL and secret never reach the browser.
 */

export type SheetForm = 'enquiry' | 'application'

export type SheetResult = { ok: true } | { ok: false; reason: 'not-configured' | 'failed' }

export async function saveToSheet(form: SheetForm, fields: Record<string, string>, file?: File | null): Promise<SheetResult> {
  const url = process.env.SHEETS_WEBHOOK_URL
  const secret = process.env.SHEETS_WEBHOOK_SECRET
  if (!url || !secret) {
    console.warn(`[sheets] SHEETS_WEBHOOK_URL / SHEETS_WEBHOOK_SECRET not set: ${form} submission was not stored.`)
    return { ok: false, reason: 'not-configured' }
  }

  let attachment: { name: string; type: string; data: string } | undefined
  if (file instanceof File && file.size > 0) {
    attachment = { name: file.name, type: file.type || 'application/octet-stream', data: Buffer.from(await file.arrayBuffer()).toString('base64') }
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, form, submittedAt: new Date().toISOString(), fields, file: attachment }),
      redirect: 'follow', // Apps Script answers through a redirect to googleusercontent.com
      signal: AbortSignal.timeout(25_000),
    })
    const result = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null
    if (!res.ok || !result?.ok) {
      console.error('[sheets] Sheet rejected the submission', res.status, result?.error)
      return { ok: false, reason: 'failed' }
    }
    return { ok: true }
  } catch (err) {
    console.error('[sheets] Could not reach the sheet', err)
    return { ok: false, reason: 'failed' }
  }
}
