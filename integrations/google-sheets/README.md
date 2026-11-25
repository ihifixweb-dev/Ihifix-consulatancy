# Saving website forms to a Google Sheet

The **Start a project** form and the **Send us your CV** form save every submission to a Google Sheet you own:

- **Enquiries** tab: one row per project, tender or partnership enquiry.
- **CV applications** tab: one row per applicant.
- Uploaded files (briefs, ToRs and CVs) are saved in a Google Drive folder called **Ihifix website uploads**, and each row links to its file.

Until the two settings in step 4 are added, the forms still thank the visitor but nothing is stored.

## Setup (about 5 minutes)

1. **Create the sheet.** In Google Drive, create a new Google Sheet, for example "Ihifix website submissions". Use the account that should own the data. The tabs are created automatically on the first submission.

2. **Add the script.** In the sheet, open **Extensions → Apps Script**. Delete the sample code, paste in everything from [`Code.gs`](./Code.gs), and replace `PASTE-YOUR-SECRET-HERE` with a long random secret (for example 32+ random letters and numbers). Save.

3. **Deploy it.** Click **Deploy → New deployment**, choose the type **Web app**, and set:
   - **Execute as:** Me
   - **Who has access:** Anyone

   Click **Deploy** and allow the permissions it asks for (it needs your Sheet and Drive). Copy the **Web app URL**; it ends in `/exec`. Opening that URL in a browser should show `"Ihifix form endpoint is running."`

   "Anyone" only lets the website send rows in. Nobody can read the sheet through it, and rows are refused unless they carry your secret.

4. **Connect the website.** In Vercel, open the project → **Settings → Environment Variables**, add both of these for Production (and Preview if you like), then redeploy:

   | Name | Value |
   | --- | --- |
   | `SHEETS_WEBHOOK_URL` | the Web app URL from step 3 |
   | `SHEETS_WEBHOOK_SECRET` | the same secret you put in the script |

   To test on your own computer, put the same two lines in a file called `.env.local` in the project folder:

   ```
   SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
   SHEETS_WEBHOOK_SECRET=your-secret
   ```

5. **Test it.** Send one enquiry and one CV from the live site. A row should appear in each tab within a few seconds, with a link to the uploaded file.

## Good to know

- **Changing the script later:** after editing `Code.gs`, use **Deploy → Manage deployments → Edit → Version: New version** so the same URL keeps working.
- **If sending fails** (for example Google is briefly unreachable), the visitor sees a message asking them to try again or email info@ihifix.com, and the form keeps everything they typed.
- **Who can see the data:** only people you share the Google Sheet and the Drive folder with. Share them with your team from Google Drive as usual.
- **File size:** uploads are limited to 4 MB, because Vercel rejects larger requests.
