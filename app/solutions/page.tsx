import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { caseStudies, industries } from '@/lib/content'
import { CtaBand, CtaLink, Eyebrow, PageHero, Rise } from '@/components/site/primitives'

export const metadata: Metadata = {
  title: 'Solutions & Industries',
  description: 'Digital solutions for government, development and civil society, education, and financial services and SMEs.',
}

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Technology for the institutions that shape people's lives"
        intro="We work where credibility and accountability matter most: public sector, donor-funded programmes, education and growing African businesses."
        crumbs={[{ label: 'Solutions' }]}
      />
      {industries.map((ind, idx) => {
        const cases = caseStudies.filter((c) => c.sector === ind.title)
        const even = idx % 2 === 0
        return (
          <section
            key={ind.slug}
            id={ind.slug}
            aria-labelledby={`${ind.slug}-title`}
            className={`section scroll-mt-24 ${idx === 0 ? 'pt-8 md:pt-12' : ''} ${even ? 'bg-background' : 'bg-panel'}`}
          >
            <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="flex flex-col items-start gap-5 lg:col-span-6">
                <Eyebrow>Industry 0{idx + 1}</Eyebrow>
                <h2 id={`${ind.slug}-title`} className="h2">
                  <Rise text={ind.title} />
                </h2>
                <p className="lead reveal">{ind.desc}</p>
                <ul className="reveal flex flex-wrap gap-2">
                  {ind.refs.map((r) => (
                    <li
                      key={r}
                      className={`rounded-full px-4 py-2 text-sm font-semibold text-navy ${even ? 'bg-panel' : 'bg-white'}`}
                    >
                      {r}
                    </li>
                  ))}
                </ul>
                <div className="reveal pt-2">
                  <CtaLink href="/contact" variant="outline" arrow>
                    Talk to our {ind.title.split(' ')[0].toLowerCase()} team
                  </CtaLink>
                </div>
              </div>
              <div className="flex flex-col gap-4 lg:col-span-6">
                <h3 className="text-sm font-semibold text-muted-foreground">Related case studies</h3>
                {cases.length > 0 ? (
                  <ul className="flex flex-col gap-3">
                    {cases.map((c, i) => (
                      <li key={c.slug} className="reveal" style={{ '--i': i } as React.CSSProperties}>
                        <Link
                          href={`/work/${c.slug}`}
                          className={`group flex items-center justify-between gap-4 rounded-3xl p-6 transition-colors ${even ? 'bg-panel hover:bg-[var(--panel-2)]' : 'bg-white hover:bg-wash'}`}
                        >
                          <span className="flex flex-col gap-1">
                            <span className="text-lg font-semibold text-ink">{c.title}</span>
                            <span className="text-sm text-muted-foreground">
                              {c.client} &middot; {c.year}
                            </span>
                          </span>
                          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-navy text-white transition-colors group-hover:bg-primary">
                            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="reveal rounded-3xl border border-dashed border-input p-6 text-sm text-muted-foreground">
                    Case studies coming soon.
                  </p>
                )}
              </div>
            </div>
          </section>
        )
      })}
      <CtaBand />
    </>
  )
}
