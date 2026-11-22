import type { Metadata } from 'next'
import Image from 'next/image'
import { Download } from 'lucide-react'
import { caseStudies, partners } from '@/lib/content'
import { CaseFilter } from '@/components/work/case-filter'
import { CtaBand, CtaLink, Eyebrow, PageHero, Rise } from '@/components/site/primitives'

export const metadata: Metadata = {
  title: 'Our Work',
  description: 'Case studies, platforms and partners: civic tech, accountability platforms and digital products by Ihifix Technologies.',
}

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Proof, not promises"
        intro="Civic-tech platforms, accountability systems and digital products delivered with governments, donors and foundations."
        crumbs={[{ label: 'Work' }]}
      >
        <CtaLink href="/contact?request=capability-statement" variant="outline">
          <Download aria-hidden="true" className="size-4" /> Request capability statement
        </CtaLink>
      </PageHero>

      <section className="bg-background pb-20 pt-4 md:pb-28">
        <div className="wrap">
          <CaseFilter studies={caseStudies} />
        </div>
      </section>

      <section id="partners" className="section bg-panel">
        <div className="wrap flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <Eyebrow>Clients &amp; partners</Eyebrow>
            <h2 className="h2">
              <Rise text="Who we have delivered with" />
            </h2>
          </div>
          <div className="reveal overflow-x-auto rounded-3xl bg-white">
            <table className="w-full min-w-[760px] text-left text-sm">
              <caption className="sr-only">Clients and partners with period, type and key impact</caption>
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th scope="col" className="px-6 py-5 font-semibold">Partner</th>
                  <th scope="col" className="px-6 py-5 font-semibold">Period</th>
                  <th scope="col" className="px-6 py-5 font-semibold">Type</th>
                  <th scope="col" className="px-6 py-5 font-semibold">Key impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {partners.map((p) => (
                  <tr key={p.name} className="transition-colors hover:bg-wash">
                    <th scope="row" className="px-6 py-4 font-semibold text-ink">
                      <span className="flex items-center gap-4">
                        <span className="grid h-16 w-32 shrink-0 place-items-center rounded-2xl bg-white px-3 ring-1 ring-border">
                          <Image
                            src={p.logo.src}
                            alt=""
                            width={p.logo.width}
                            height={p.logo.height}
                            className="h-auto max-h-11 w-auto max-w-full object-contain"
                          />
                        </span>
                        {p.name}
                      </span>
                    </th>
                    <td className="px-6 py-5 text-muted-foreground">{p.period}</td>
                    <td className="px-6 py-5 text-muted-foreground">{p.type}</td>
                    <td className="px-6 py-5 text-navy">{p.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
