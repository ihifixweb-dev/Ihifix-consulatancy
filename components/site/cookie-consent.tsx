'use client'

import { useSyncExternalStore, useState } from 'react'
import { Cookie } from 'lucide-react'

const KEY = 'ihifix-cookie-consent'

function subscribe() {
  return () => {}
}

function read() {
  try {
    return localStorage.getItem(KEY)
  } catch {
    return 'unavailable'
  }
}

export function CookieConsent() {
  const stored = useSyncExternalStore(subscribe, read, () => 'ssr')
  const [dismissed, setDismissed] = useState(false)

  if (stored || dismissed) return null

  const choose = (value: 'accepted' | 'essential') => {
    try {
      localStorage.setItem(KEY, value)
    } catch {}
    setDismissed(true)
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie preferences"
      className="consent fixed inset-x-3 bottom-21 z-50 mx-auto flex max-w-xl flex-col gap-4 rounded-3xl bg-white p-5 shadow-[0_30px_60px_-24px_rgba(5,20,90,0.45)] ring-1 ring-black/5 sm:flex-row sm:items-center lg:bottom-6"
    >
      <span className="hidden size-11 shrink-0 place-items-center rounded-2xl bg-wash text-navy sm:grid">
        <Cookie aria-hidden="true" className="size-5" />
      </span>
      <p className="text-sm leading-relaxed text-muted-foreground">
        We use essential cookies to run this site and, with your consent, privacy-respecting analytics to improve it, in line with
        the Nigeria Data Protection Act 2023 and GDPR.
      </p>
      <div className="flex shrink-0 gap-2 sm:flex-col">
        <button type="button" onClick={() => choose('accepted')} className="btn btn-navy btn-sm h-10">
          Accept
        </button>
        <button type="button" onClick={() => choose('essential')} className="btn btn-ghost btn-sm h-10">
          Essential only
        </button>
      </div>
    </div>
  )
}
