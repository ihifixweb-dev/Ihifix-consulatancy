import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Check } from 'lucide-react'
import { caseStudies, services } from '@/lib/content'
import { CaseCard } from '@/components/site/cards'
import { CtaBand, CtaLink, Eyebrow, PageHero, Rise } from '@/components/site/primitives'

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) return {}
  return { title: service.title, description: `${service.headline}. ${service.short}` }
}

const models = [
  { name: 'Discovery sprint', body: 'A short, fixed-fee engagement to validate the problem and scope.' },
  { name: 'Fixed-scope project', body: 'Agreed deliverables, timeline and price.' },
  { name: 'Dedicated team', body: 'A cross-functional squad embedded with your organisation.' },
  { name: 'Retainer / managed services', body: 'Ongoing support, operations and iteration.' },
]

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) notFound()

  const related = caseStudies.filter((c) => service.relatedCases.includes(c.slug))

  return (
    <>
      <PageHero
        eyebrow={service.title}
        title={service.headline}
        intro={service.outcome}
        crumbs={[{ href: '/services', label: 'Services' }, { label: service.title }]}
      >
        <CtaLink href={`/contact?service=${service.slug}`} arrow>
          Discuss a {service.title.toLowerCase()} project
        </CtaLink>
      </PageHero>

      <section className="section bg-background pt-8 md:pt-12">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-5 lg:col-span-5">
            <Eyebrow>The problem</Eyebrow>
            <p className="reveal text-pretty text-2xl font-semibold leading-snug tracking-[-0.02em] text-ink md:text-[1.75rem]">
              {service.problem}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:col-span-7">
            <ListBlock title="What's included" items={service.included} index={0} />
            <ListBlock title="Typical deliverables" items={service.deliverables} index={1} />
          </div>
        </div>
      </section>

      <section className="section bg-panel">
        <div className="wrap flex flex-col gap-16">
          <div className="flex flex-col gap-5">
            <Eyebrow>Technologies &amp; methods</Eyebrow>
            <ul className="flex flex-wrap gap-2">
              {service.tech.map((t, i) => (
                <li
                  key={t}
                  style={{ '--i': i } as React.CSSProperties}
                  className="reveal rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <Eyebrow>Engagement models</Eyebrow>
              <h2 className="h2">
                <Rise text="Choose how we work together" />
              </h2>
            </div>
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {models.map((m, i) => (
                <li
                  key={m.name}
                  style={{ '--i': i } as React.CSSProperties}
                  className="reveal flex flex-col gap-3 rounded-3xl bg-white p-7"
                >
                  <span className="text-sm font-semibold text-primary">0{i + 1}</span>
                  <h3 className="text-lg font-semibold text-ink">{m.name}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{m.body}</p>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground">
              Pricing depends on scope. Request an estimate and we will respond with a range within five working days.
            </p>
          </div>
        </div>
      </section>

      {service.slug === 'artificial-intelligence' && (
        <section className="bg-panel pb-20 md:pb-28">
          <div className="wrap">
            <div className="band-navy reveal-scale flex flex-col gap-4 rounded-[2rem] px-7 py-12 md:px-14 md:py-14">
              <Eyebrow inverted>Responsible AI &amp; data protection</Eyebrow>
              <p className="max-w-3xl text-pretty text-lg leading-relaxed text-white/85">
                Every AI engagement follows the Nigeria Data Protection Act 2023. We minimise personal data, document model
                limitations, test for bias on local populations, and keep a human in the loop for decisions that affect people.
              </p>
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="section bg-background">
          <div className="wrap flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <Eyebrow>Related work</Eyebrow>
              <h2 className="h2">
                <Rise text="See it in practice" />
              </h2>
            </div>
            <ul className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {related.map((c, i) => (
                <li key={c.slug} className="reveal" style={{ '--i': i } as React.CSSProperties}>
                  <CaseCard study={c} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section border-t border-border bg-background">
        <div className="wrap flex max-w-4xl flex-col gap-10">
          <div className="flex flex-col gap-4">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="h2">
              <Rise text="Frequently asked questions" />
            </h2>
          </div>
          <div className="faq reveal">
            {service.faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <div>
                  <p>{f.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title={`Ready to talk about ${service.title.toLowerCase()}?`} href={`/contact?service=${service.slug}`} />
    </>
  )
}

function ListBlock({ title, items, index }: { title: string; items: string[]; index: number }) {
  return (
    <div className="reveal card flex flex-col gap-5 p-7" style={{ '--i': index } as React.CSSProperties}>
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
      <ul className="flex flex-col gap-3">
        {items.map((i) => (
          <li key={i} className="flex gap-3 leading-relaxed text-muted-foreground">
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/10">
              <Check aria-hidden="true" className="size-3.5 text-primary" />
            </span>
            {i}
          </li>
        ))}
      </ul>
    </div>
  )
}
