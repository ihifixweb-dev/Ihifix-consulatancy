import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, BrainCircuit, Cloud, Code2, FlaskConical, Palette, Rocket } from 'lucide-react'
import type { CaseStudy, Service } from '@/lib/content'

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  'software-development': Code2,
  'artificial-intelligence': BrainCircuit,
  'digital-products': Rocket,
  'branding-and-creative': Palette,
  'it-infrastructure-and-cloud': Cloud,
  'research-and-development': FlaskConical,
}

export function ServiceCard({ service }: { service: Service }) {
  const Icon = icons[service.slug] ?? Code2
  return (
    <Link href={`/services/${service.slug}`} className="card lift group flex h-full flex-col gap-6 p-7 md:p-8">
      <div className="flex items-start justify-between">
        <span className="icon-tile">
          <Icon aria-hidden="true" className="size-6" />
        </span>
        <span className="grid size-10 place-items-center rounded-full bg-white text-navy transition-all duration-300 group-hover:bg-primary group-hover:text-white">
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-[1.375rem] font-semibold tracking-[-0.02em] text-ink">{service.title}</h3>
        <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">{service.short}</p>
      </div>
      <p className="mt-auto border-t border-black/[0.07] pt-5 text-sm font-medium leading-relaxed text-navy">
        {service.outcome}
      </p>
    </Link>
  )
}

export function CaseCard({ study }: { study: CaseStudy }) {
  return (
    <Link href={`/work/${study.slug}`} className="group flex h-full flex-col gap-5">
      <div className="relative aspect-[16/11] overflow-hidden rounded-3xl bg-muted">
        <Image
          src={study.image || '/placeholder.svg'}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.2,.75,.15,1)] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-navy backdrop-blur">
          {study.sector}
        </span>
        <span className="absolute bottom-4 right-4 grid size-11 translate-y-3 place-items-center rounded-full bg-primary text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowRight aria-hidden="true" className="size-4" />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 px-1">
        <p className="text-sm font-medium text-muted-foreground">
          {study.client} &middot; {study.year}
        </p>
        <h3 className="text-xl font-semibold tracking-[-0.02em] text-ink transition-colors group-hover:text-navy">
          {study.title}
        </h3>
        <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">{study.summary}</p>
        <div className="mt-auto flex items-baseline gap-3 border-t border-border pt-4">
          <span className="text-2xl font-bold tracking-[-0.03em] text-primary">{study.metric}</span>
          <span className="text-sm leading-snug text-navy">{study.metricLabel}</span>
        </div>
      </div>
    </Link>
  )
}
