'use client'

import { startTransition, useActionState, useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { services } from '@/lib/content'
import { submitEnquiry, type EnquiryState } from '@/app/contact/actions'
import { cn } from '@/lib/utils'

const initial: EnquiryState = { status: 'idle' }

const types = [
  { value: 'project', label: 'Start a project' },
  { value: 'tender', label: 'Tender / RFP' },
  { value: 'partnership', label: 'Partnership' },
]

export const inputCls =
  'h-12 w-full rounded-xl border border-input bg-white px-4 text-ink transition-[border-color,box-shadow] placeholder:text-muted-foreground/70 hover:border-navy/40 focus-visible:border-navy focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-navy/10 aria-invalid:border-destructive'

export function EnquiryForm({ defaultService }: { defaultService?: string }) {
  const [state, action, pending] = useActionState(submitEnquiry, initial)
  const [type, setType] = useState('project')

  if (state.status === 'success') {
    return (
      <div role="status" className="flex flex-col items-start gap-4 p-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <span className="grid size-14 place-items-center rounded-full bg-primary text-white">
          <CheckCircle2 aria-hidden="true" className="size-7" />
        </span>
        <h2 className="text-2xl font-bold text-ink">Enquiry received</h2>
        <p className="leading-relaxed text-muted-foreground">{state.message}</p>
      </div>
    )
  }

  const err = state.errors ?? {}

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

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 text-sm font-semibold text-ink">What can we help with?</legend>
        <div className="grid gap-1 rounded-2xl bg-white p-1 ring-1 ring-input sm:grid-cols-3 sm:rounded-full">
          {types.map((t) => (
            <label
              key={t.value}
              className={cn(
                'flex h-11 cursor-pointer items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 has-focus-visible:ring-2 has-focus-visible:ring-ring',
                type === t.value ? 'bg-navy text-white shadow-[0_6px_16px_-6px_rgba(5,20,90,0.6)]' : 'text-muted-foreground hover:text-navy',
              )}
            >
              <input
                type="radio"
                name="type"
                value={t.value}
                checked={type === t.value}
                onChange={() => setType(t.value)}
                className="sr-only"
              />
              {t.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-6 md:grid-cols-2">
        <Field id="name" label="Full name" error={err.name} required>
          <input id="name" name="name" autoComplete="name" required className={inputCls} aria-invalid={!!err.name} aria-describedby={err.name ? 'name-error' : undefined} />
        </Field>
        <Field id="organisation" label="Organisation" error={err.organisation} required>
          <input id="organisation" name="organisation" autoComplete="organization" required className={inputCls} aria-invalid={!!err.organisation} aria-describedby={err.organisation ? 'organisation-error' : undefined} />
        </Field>
        <Field id="role" label="Role">
          <input id="role" name="role" autoComplete="organization-title" className={inputCls} />
        </Field>
        <Field id="email" label="Work email" error={err.email} required>
          <input id="email" name="email" type="email" autoComplete="email" required className={inputCls} aria-invalid={!!err.email} aria-describedby={err.email ? 'email-error' : undefined} />
        </Field>
        <Field id="phone" label="Phone">
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={inputCls} />
        </Field>
        <Field id="timeline" label="Timeline">
          <select id="timeline" name="timeline" className={inputCls} defaultValue="">
            <option value="">Select</option>
            <option>Within 1 month</option>
            <option>1 to 3 months</option>
            <option>3 to 6 months</option>
            <option>Exploring options</option>
          </select>
        </Field>
      </div>

      {type === 'tender' && (
        <div className="grid gap-6 rounded-2xl bg-white p-6 ring-1 ring-input animate-in fade-in slide-in-from-top-2 duration-300 md:grid-cols-2">
          <Field id="reference" label="Tender reference number" error={err.reference} required>
            <input id="reference" name="reference" className={inputCls} aria-invalid={!!err.reference} aria-describedby={err.reference ? 'reference-error' : undefined} />
          </Field>
          <Field id="deadline" label="Submission deadline">
            <input id="deadline" name="deadline" type="date" className={inputCls} />
          </Field>
        </div>
      )}

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 text-sm font-semibold text-ink">Services of interest</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {services.map((s) => (
            <label key={s.slug} className="flex cursor-pointer items-center gap-3 rounded-xl border border-input bg-white px-4 py-3 text-sm font-medium text-ink transition-colors hover:border-navy/40 has-checked:border-navy has-checked:bg-wash">
              <input
                type="checkbox"
                name="services"
                value={s.title}
                defaultChecked={defaultService === s.slug}
                className="size-4 accent-primary"
              />
              {s.title}
            </label>
          ))}
        </div>
      </fieldset>

      <Field id="budget" label="Budget range (optional)">
        <select id="budget" name="budget" className={inputCls} defaultValue="">
          <option value="">Prefer not to say</option>
          <option>Under ₦10m</option>
          <option>₦10m to ₦50m</option>
          <option>₦50m to ₦150m</option>
          <option>Over ₦150m</option>
          <option>Donor-funded / to be confirmed</option>
        </select>
      </Field>

      <Field id="brief" label="Project brief" error={err.brief} required>
        <textarea
          id="brief"
          name="brief"
          rows={6}
          required
          placeholder="What are you trying to achieve, who are the users, and what does success look like?"
          className={cn(inputCls, 'h-auto py-3 leading-relaxed')}
          aria-invalid={!!err.brief}
          aria-describedby={err.brief ? 'brief-error' : undefined}
        />
      </Field>

      <Field id="attachment" label="Attach a brief or ToR (PDF, DOCX, up to 4 MB)" error={err.attachment}>
        <input
          id="attachment"
          name="attachment"
          type="file"
          accept=".pdf,.doc,.docx,.ppt,.pptx"
          className="text-sm text-navy file:mr-4 file:h-10 file:rounded-full file:border-0 file:bg-white file:px-5 file:font-semibold file:text-navy file:ring-1 file:ring-input"
        />
      </Field>

      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
          <input type="checkbox" name="consent" className="mt-1 size-4 shrink-0 accent-primary" aria-invalid={!!err.consent} aria-describedby={err.consent ? 'consent-error' : undefined} />
          I agree that Ihifix Technologies may store and process my details to respond to this enquiry, in line with the Nigeria
          Data Protection Act 2023.
        </label>
        {err.consent && (
          <p id="consent-error" className="text-sm font-medium text-destructive">
            {err.consent}
          </p>
        )}
      </div>

      <button type="submit" disabled={pending} className="btn btn-primary disabled:opacity-60 sm:self-start">
        {pending ? 'Sending…' : 'Send enquiry'}
        {!pending && <ArrowRight aria-hidden="true" className="arrow size-4" />}
      </button>
    </form>
  )
}

export function Field({
  id,
  label,
  error,
  required,
  children,
}: {
  id: string
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
        {required && (
          <span className="text-primary" aria-hidden="true">
            {' *'}
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
