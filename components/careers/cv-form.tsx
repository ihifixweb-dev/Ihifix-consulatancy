'use client'

import { startTransition, useActionState, useState } from 'react'
import { ArrowRight, CheckCircle2, FileText, Upload, X } from 'lucide-react'
import { submitApplication, type ApplicationState } from '@/app/careers/actions'
import { Field, inputCls } from '@/components/contact/enquiry-form'
import { cn } from '@/lib/utils'

const initial: ApplicationState = { status: 'idle' }

const MAX_CV_BYTES = 4 * 1024 * 1024
const CV_TYPES = ['.pdf', '.doc', '.docx']

const areas = [
  'Software engineering',
  'AI, data & analytics',
  'Product & UI/UX design',
  'Research & M&E analysis',
  'Cloud & IT infrastructure',
  'Branding & creative',
  'Project management',
  'Business development',
  'Internship / Digital Academy graduate',
  'Other',
]

const experience = ['Student or graduate', 'Under 2 years', '2 to 5 years', '5 to 10 years', 'Over 10 years']

function formatSize(bytes: number) {
  return bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

export function CvForm() {
  const [state, action, pending] = useActionState(submitApplication, initial)
  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string>()

  if (state.status === 'success') {
    return (
      <div role="status" className="flex flex-col items-start gap-4 p-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <span className="grid size-14 place-items-center rounded-full bg-primary text-white">
          <CheckCircle2 aria-hidden="true" className="size-7" />
        </span>
        <h2 className="text-2xl font-bold text-ink">Application received</h2>
        <p className="leading-relaxed text-muted-foreground">{state.message}</p>
      </div>
    )
  }

  // A newly chosen file replaces any earlier CV error from the server; the client-side check reports its own.
  const err: Partial<Record<string, string>> = { ...state.errors }
  if (file) delete err.cv
  if (fileError) err.cv = fileError

  const pickFile = (input: HTMLInputElement) => {
    const f = input.files?.[0] ?? null
    setFileError(undefined)
    if (f && !CV_TYPES.some((ext) => f.name.toLowerCase().endsWith(ext))) {
      setFileError('Please upload your CV as a PDF or Word document.')
      input.value = ''
      setFile(null)
      return
    }
    if (f && f.size > MAX_CV_BYTES) {
      setFileError('Your CV must be 4 MB or smaller.')
      input.value = ''
      setFile(null)
      return
    }
    setFile(f)
  }

  const clearFile = () => {
    const input = document.getElementById('cv') as HTMLInputElement | null
    if (input) input.value = ''
    setFile(null)
    setFileError(undefined)
  }

  return (
    <form
      noValidate
      className="flex flex-col gap-8"
      // Submitted by hand (not via the form `action` prop) so React does not clear the fields when there is an error.
      onSubmit={(e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        startTransition(() => action(data))
      }}
    >
      {state.status === 'error' && (
        <p role="alert" className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm font-medium text-destructive">
          {state.message}
        </p>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Field id="name" label="Full name" error={err.name} required>
          <input id="name" name="name" autoComplete="name" required className={inputCls} aria-invalid={!!err.name} aria-describedby={err.name ? 'name-error' : undefined} />
        </Field>
        <Field id="email" label="Email" error={err.email} required>
          <input id="email" name="email" type="email" autoComplete="email" required className={inputCls} aria-invalid={!!err.email} aria-describedby={err.email ? 'email-error' : undefined} />
        </Field>
        <Field id="phone" label="Phone" error={err.phone} required>
          <input id="phone" name="phone" type="tel" autoComplete="tel" required className={inputCls} aria-invalid={!!err.phone} aria-describedby={err.phone ? 'phone-error' : undefined} />
        </Field>
        <Field id="location" label="City / State">
          <input id="location" name="location" autoComplete="address-level2" placeholder="e.g. Kaduna" className={inputCls} />
        </Field>
        <Field id="area" label="Area you would like to work in" error={err.area} required>
          <select id="area" name="area" required defaultValue="" className={inputCls} aria-invalid={!!err.area} aria-describedby={err.area ? 'area-error' : undefined}>
            <option value="" disabled>
              Select
            </option>
            {areas.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </Field>
        <Field id="experience" label="Experience">
          <select id="experience" name="experience" defaultValue="" className={inputCls}>
            <option value="">Select</option>
            {experience.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="link" label="LinkedIn, portfolio or GitHub (optional)" error={err.link}>
        <input
          id="link"
          name="link"
          type="url"
          inputMode="url"
          placeholder="https://"
          className={inputCls}
          aria-invalid={!!err.link}
          aria-describedby={err.link ? 'link-error' : undefined}
        />
      </Field>

      <div className="flex flex-col gap-2">
        <span id="cv-label" className="text-sm font-semibold text-ink">
          Your CV
          <span className="text-primary" aria-hidden="true">
            {' *'}
          </span>
        </span>
        <label
          htmlFor="cv"
          className={cn(
            'group flex cursor-pointer items-center gap-4 rounded-2xl border-2 border-dashed bg-white p-5 transition-colors has-focus-visible:ring-4 has-focus-visible:ring-navy/10',
            err.cv ? 'border-destructive' : file ? 'border-navy/40' : 'border-input hover:border-navy/40',
          )}
        >
          <span
            className={cn(
              'grid size-12 shrink-0 place-items-center rounded-xl transition-colors',
              file ? 'bg-navy text-white' : 'bg-panel text-navy group-hover:bg-navy group-hover:text-white',
            )}
          >
            {file ? <FileText aria-hidden="true" className="size-5" /> : <Upload aria-hidden="true" className="size-5" />}
          </span>
          <span className="flex min-w-0 flex-col gap-0.5">
            <span className="truncate font-semibold text-ink">{file ? file.name : 'Choose a file to upload'}</span>
            <span className="text-sm text-muted-foreground">{file ? formatSize(file.size) : 'PDF or Word document, up to 4 MB'}</span>
          </span>
          <input
            id="cv"
            name="cv"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            required
            className="sr-only"
            aria-labelledby="cv-label"
            aria-invalid={!!err.cv}
            aria-describedby={err.cv ? 'cv-error' : undefined}
            onChange={(e) => pickFile(e.currentTarget)}
          />
        </label>
        {file && (
          <button type="button" onClick={clearFile} className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-muted-foreground hover:text-navy">
            <X aria-hidden="true" className="size-4" /> Remove file
          </button>
        )}
        {err.cv && (
          <p id="cv-error" className="text-sm font-medium text-destructive">
            {err.cv}
          </p>
        )}
      </div>

      <Field id="note" label="A short note about you (optional)" error={err.note}>
        <textarea
          id="note"
          name="note"
          rows={5}
          maxLength={3000}
          placeholder="What kind of work excites you, and what have you built or delivered that you are proud of?"
          className={cn(inputCls, 'h-auto py-3 leading-relaxed')}
          aria-invalid={!!err.note}
          aria-describedby={err.note ? 'note-error' : undefined}
        />
      </Field>

      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
          <input type="checkbox" name="consent" className="mt-1 size-4 shrink-0 accent-primary" aria-invalid={!!err.consent} aria-describedby={err.consent ? 'consent-error' : undefined} />
          I agree that Ihifix Technologies may store and review my CV and details for current and future roles, in line with the
          Nigeria Data Protection Act 2023.
        </label>
        {err.consent && (
          <p id="consent-error" className="text-sm font-medium text-destructive">
            {err.consent}
          </p>
        )}
      </div>

      <button type="submit" disabled={pending} className="btn btn-primary disabled:opacity-60 sm:self-start">
        {pending ? 'Sending…' : 'Send application'}
        {!pending && <ArrowRight aria-hidden="true" className="arrow size-4" />}
      </button>
    </form>
  )
}
