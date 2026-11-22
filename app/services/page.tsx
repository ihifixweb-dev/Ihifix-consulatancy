import type { Metadata } from 'next'
import { services } from '@/lib/content'
import { ServiceCard } from '@/components/site/cards'
import { CtaBand, PageHero } from '@/components/site/primitives'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Software development, AI, digital products, branding, IT infrastructure and cloud, and R&D from Ihifix Technologies.',
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Six capabilities. One accountable partner."
        intro="From the first field interview to the cloud environment it runs on, we deliver every layer of a digital solution."
        crumbs={[{ label: 'Services' }]}
      />
      <section className="bg-background pb-8 pt-4 md:pb-12">
        <div className="wrap">
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <li key={s.slug} className="reveal" style={{ '--i': i % 3 } as React.CSSProperties}>
                <ServiceCard service={s} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
