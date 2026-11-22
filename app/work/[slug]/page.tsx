import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Check } from 'lucide-react'
import { caseStudies } from '@/lib/content'
import { CaseCard } from '@/components/site/cards'
import { CtaBand, Eyebrow, PageHero, Rise } from '@/components/site/primitives'

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const study = caseStudies.find((c) => c.slug === slug)
  if (!study) return {}
  return { title: study.title, description: study.summary }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = caseStudies.find((c) => c.slug === slug)
  if (!study) notFound()

  const more = caseStudies.filter((c) => c.slug !== study.slug).slice(0, 3)

  return (
    <>
      <PageHero
        eyebrow={study.sector}
        title={study.title}
        intro={study.summary}
        crumbs={[{ href: '/work', label: 'Work' }, { label: study.title }]}
      />

      <section className="bg-background pb-20 pt-4 md:pb-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <dl className="reveal grid grid-cols-2 gap-6 self-start rounded-3xl bg-panel p-7 lg:sticky lg:top-28 lg:col-span-4 lg:grid-cols-1">
            <Fact label="Client" value={study.client} />
            <Fact label="Year" value={study.year} />
            <Fact label="Sector" value={study.sector} />
            <Fact label="Services" value={study.services.join(', ')} />
            <div className="col-span-2 flex flex-col gap-1 rounded-2xl bg-navy p-5 lg:col-span-1">
              <dt className="text-sm text-white/75">{study.metricLabel}</dt>
              <dd className="order-first text-4xl font-bold tracking-[-0.04em] text-white">{study.metric}</dd>
            </div>
          </dl>
          <div className="flex flex-col gap-14 lg:col-span-8">
            <div className="reveal-scale relative aspect-[16/9] overflow-hidden rounded-[2rem] bg-muted">
              <Image src={study.image || '/placeholder.svg'} alt="" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
            </div>
            <Block title="The challenge">{study.challenge}</Block>
            <Block title="Our solution">{study.solution}</Block>
            <div className="flex flex-col gap-5">
              <Eyebrow>Outcomes</Eyebrow>
              <ul className="flex flex-col gap-3">
                {study.outcomes.map((o, i) => (
                  <li
                    key={o}
                    style={{ '--i': i } as React.CSSProperties}
                    className="reveal flex gap-4 rounded-2xl bg-panel p-5 text-lg leading-relaxed text-ink"
                  >
                    <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-primary">
                      <Check aria-hidden="true" className="size-3.5 text-white" />
                    </span>
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-panel">
        <div className="wrap flex flex-col gap-12">
          <h2 className="h2">
            <Rise text="More case studies" />
          </h2>
          <ul className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {more.map((c, i) => (
              <li key={c.slug} className="reveal" style={{ '--i': i } as React.CSSProperties}>
                <CaseCard study={c} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className="font-semibold text-ink">{value}</dd>
    </div>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="reveal flex flex-col gap-4">
      <Eyebrow>{title}</Eyebrow>
      <p className="text-pretty text-lg leading-relaxed text-ink md:text-xl">{children}</p>
    </div>
  )
}
