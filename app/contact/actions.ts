'use server'

export type EnquiryState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: Partial<Record<string, string>>
}

const MAX_FILE_BYTES = 10 * 1024 * 1024
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function submitEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  if (String(formData.get('website') ?? '').length > 0) {
    return { status: 'success', message: 'Thank you.' }
  }

  const get = (k: string) => String(formData.get(k) ?? '').trim()
  const data = {
    type: get('type'),
    name: get('name'),
    organisation: get('organisation'),
    role: get('role'),
    email: get('email'),
    phone: get('phone'),
    services: formData.getAll('services').map(String),
    budget: get('budget'),
    timeline: get('timeline'),
    brief: get('brief'),
    reference: get('reference'),
    deadline: get('deadline'),
    consent: formData.get('consent') === 'on',
  }

  const errors: Record<string, string> = {}
  if (data.name.length < 2 || data.name.length > 120) errors.name = 'Please enter your full name.'
  if (data.organisation.length < 2) errors.organisation = 'Please enter your organisation.'
  if (!EMAIL_RE.test(data.email)) errors.email = 'Please enter a valid email address.'
  if (data.brief.length < 20) errors.brief = 'Please tell us a little more (at least 20 characters).'
  if (data.brief.length > 5000) errors.brief = 'Please keep your brief under 5,000 characters.'
  if (!data.consent) errors.consent = 'Please confirm consent so we can respond.'
  if (data.type === 'tender' && !data.reference) errors.reference = 'Please add the tender reference number.'

  const file = formData.get('attachment')
  if (file instanceof File && file.size > MAX_FILE_BYTES) errors.attachment = 'Files must be 10 MB or smaller.'

  if (Object.keys(errors).length > 0) {
    return { status: 'error', message: 'Please fix the highlighted fields.', errors }
  }

  // TODO: route to CRM / BD inbox and send auto-acknowledgement email once providers are chosen.
  console.log('[v0] Enquiry received', { type: data.type, organisation: data.organisation, services: data.services })

  return {
    status: 'success',
    message: `Thank you, ${data.name.split(' ')[0]}. Our Business Development team will reply to ${data.email} within two working days.`,
  }
}
