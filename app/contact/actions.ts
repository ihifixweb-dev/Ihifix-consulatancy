'use server'

import { saveToSheet } from '@/lib/sheets'

export type EnquiryState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: Partial<Record<string, string>>
}

// Vercel rejects request bodies over 4.5 MB, so attachments are capped below that.
const MAX_FILE_BYTES = 4 * 1024 * 1024
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
  if (file instanceof File && file.size > MAX_FILE_BYTES) errors.attachment = 'Files must be 4 MB or smaller.'

  if (Object.keys(errors).length > 0) {
    return { status: 'error', message: 'Please fix the highlighted fields.', errors }
  }

  const saved = await saveToSheet(
    'enquiry',
    {
      type: data.type,
      name: data.name,
      organisation: data.organisation,
      role: data.role,
      email: data.email,
      phone: data.phone,
      services: data.services.join(', '),
      budget: data.budget,
      timeline: data.timeline,
      reference: data.reference,
      deadline: data.deadline,
      brief: data.brief,
    },
    file instanceof File ? file : null,
  )
  if (!saved.ok && saved.reason === 'failed') {
    return {
      status: 'error',
      message: 'We could not send your enquiry just now. Please try again in a minute, or email info@ihifix.com.',
    }
  }

  return {
    status: 'success',
    message: `Thank you, ${data.name.split(' ')[0]}. Our Business Development team will reply to ${data.email} within two working days.`,
  }
}
