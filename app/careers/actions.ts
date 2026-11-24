'use server'

export type ApplicationState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: Partial<Record<string, string>>
}

// Vercel rejects request bodies over 4.5 MB, so CVs are capped below that.
const MAX_CV_BYTES = 4 * 1024 * 1024
const CV_TYPES = ['.pdf', '.doc', '.docx']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function submitApplication(_prev: ApplicationState, formData: FormData): Promise<ApplicationState> {
  // Honeypot: bots fill the hidden field; pretend it worked.
  if (String(formData.get('website') ?? '').length > 0) {
    return { status: 'success', message: 'Thank you.' }
  }

  const get = (k: string) => String(formData.get(k) ?? '').trim()
  const data = {
    name: get('name'),
    email: get('email'),
    phone: get('phone'),
    location: get('location'),
    area: get('area'),
    experience: get('experience'),
    link: get('link'),
    note: get('note'),
    consent: formData.get('consent') === 'on',
  }

  const errors: Record<string, string> = {}
  if (data.name.length < 2 || data.name.length > 120) errors.name = 'Please enter your full name.'
  if (!EMAIL_RE.test(data.email)) errors.email = 'Please enter a valid email address.'
  if (data.phone.replace(/\D/g, '').length < 7) errors.phone = 'Please enter a phone number we can reach you on.'
  if (!data.area) errors.area = 'Please choose the area you would like to work in.'
  if (data.link && !/^https?:\/\/\S+\.\S+/i.test(data.link)) errors.link = 'Please enter a full link, starting with https://'
  if (data.note.length > 3000) errors.note = 'Please keep your note under 3,000 characters.'
  if (!data.consent) errors.consent = 'Please confirm consent so we can review your application.'

  const cv = formData.get('cv')
  if (!(cv instanceof File) || cv.size === 0) {
    errors.cv = 'Please attach your CV.'
  } else if (!CV_TYPES.some((ext) => cv.name.toLowerCase().endsWith(ext))) {
    errors.cv = 'Please upload your CV as a PDF or Word document.'
  } else if (cv.size > MAX_CV_BYTES) {
    errors.cv = 'Your CV must be 4 MB or smaller.'
  }

  if (Object.keys(errors).length > 0) {
    return { status: 'error', message: 'Please fix the highlighted fields.', errors }
  }

  // TODO: deliver the application and CV to the careers inbox (or an ATS) and send an acknowledgement email
  // once an email provider is chosen. Until then nothing is stored or sent.
  console.log('[careers] Application received', { area: data.area, experience: data.experience })

  return {
    status: 'success',
    message: `Thank you, ${data.name.split(' ')[0]}. We have received your CV and will be in touch at ${data.email} if there is a suitable role.`,
  }
}
