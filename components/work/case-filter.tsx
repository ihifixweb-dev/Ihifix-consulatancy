'use client'

import { useState } from 'react'
import type { CaseStudy } from '@/lib/content'
import { CaseCard } from '@/components/site/cards'
import { cn } from '@/lib/utils'

export function CaseFilter({ studies }: { studies: CaseStudy[] }) {
  const sectors = ['All', ...Array.from(new Set(studies.map((s) => s.sector)))]
  const [active, setActive] = useState('All')
  const visible = active === 'All' ? studies : studies.filter((s) => s.sector === active)

  return (
    <div className="flex flex-col gap-10">
      <div role="group" aria-label="Filter by industry" className="flex max-w-full gap-1 self-start overflow-x-auto rounded-full bg-panel p-1">
        {sectors.map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={active === s}
            onClick={() => setActive(s)}
            className={cn(
              'h-10 shrink-0 whitespace-nowrap rounded-full px-5 text-sm transition-all duration-300',
              active === s
                ? 'bg-white font-semibold text-navy shadow-[0_2px_10px_-2px_rgba(5,20,90,0.2)]'
                : 'font-medium text-muted-foreground hover:text-navy',
            )}
          >
            {s}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} case studies
      </p>
      <ul key={active} className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((c, i) => (
          <li key={c.slug} className="reveal" style={{ '--i': i % 3 } as React.CSSProperties}>
            <CaseCard study={c} />
          </li>
        ))}
      </ul>
    </div>
  )
}
