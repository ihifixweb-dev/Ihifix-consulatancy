'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export function NewsletterForm() {
  const [done, setDone] = useState(false)

  if (done) {
    return (
      <p role="status" className="flex items-center gap-2 text-sm font-medium text-white">
        <CheckCircle2 aria-hidden="true" className="size-4 text-primary" />
        Thanks. Please check your inbox to confirm.
      </p>
    )
  }

  return (
    <form
      className="flex items-center gap-1 rounded-full bg-white/[0.07] p-1.5 ring-1 ring-white/15 transition-shadow focus-within:ring-white/40"
      onSubmit={(e) => {
        e.preventDefault()
        setDone(true)
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@organisation.org"
        className="h-10 min-w-0 flex-1 bg-transparent px-4 text-sm text-white placeholder:text-white/45 focus-visible:outline-none"
      />
      <button type="submit" className="btn btn-primary btn-sm h-10 shrink-0 px-4">
        Subscribe <ArrowRight aria-hidden="true" className="arrow size-4" />
      </button>
    </form>
  )
}
