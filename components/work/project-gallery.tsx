'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { projectKinds, type Project, type ProjectKind } from '@/lib/content'
import { cn } from '@/lib/utils'

const kindLabel: Record<ProjectKind, string> = { website: 'Website', application: 'Application', wordpress: 'WordPress' }

/** Websites and applications the team has delivered, filterable by type. Each card opens the live site. */
export function ProjectGallery({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<ProjectKind | 'all'>('all')
  const visible = active === 'all' ? projects : projects.filter((p) => p.kind === active)

  return (
    <div className="flex flex-col gap-10">
      <div role="group" aria-label="Filter projects by type" className="flex max-w-full gap-1 self-start overflow-x-auto rounded-full bg-panel p-1">
        {projectKinds.map((k) => {
          const count = k.value === 'all' ? projects.length : projects.filter((p) => p.kind === k.value).length
          return (
            <button
              key={k.value}
              type="button"
              aria-pressed={active === k.value}
              onClick={() => setActive(k.value)}
              className={cn(
                'flex h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-5 text-sm transition-all duration-300',
                active === k.value
                  ? 'bg-white font-semibold text-navy shadow-[0_2px_10px_-2px_rgba(5,20,90,0.2)]'
                  : 'font-medium text-muted-foreground hover:text-navy',
              )}
            >
              {k.label}
              <span className="text-xs tabular-nums opacity-60">{count}</span>
            </button>
          )
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} projects
      </p>
      <ul key={active} className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => (
          <li key={p.host} className="reveal" style={{ '--i': i % 3 } as React.CSSProperties}>
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col gap-5">
              <div className="case-media relative aspect-[16/10] overflow-hidden rounded-3xl bg-muted ring-1 ring-border">
                <Image
                  src={p.image}
                  alt={`Homepage of ${p.name}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(.2,.75,.15,1)] group-hover:scale-[1.04]"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-navy backdrop-blur">
                  {kindLabel[p.kind]}
                </span>
                <span className="absolute bottom-4 right-4 grid size-11 translate-y-3 place-items-center rounded-full bg-primary text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2 px-1">
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-ink">{p.name}</h3>
                <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">{p.summary}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-navy">
                  {p.host}
                  <ArrowUpRight aria-hidden="true" className="size-4 text-primary transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
