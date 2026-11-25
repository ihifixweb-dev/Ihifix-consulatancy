import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { groupSites } from '@/lib/content'
import { TripleHelix } from '@/components/about/triple-helix'
import { CtaBand, CtaLink, Eyebrow, PageHero, Rise } from '@/components/site/primitives'

export const metadata: Metadata = {
  title: 'About',
  description: 'Ihifix Technologies Limited, the Technology & Innovation Engine of Ihifix Group. Founded in Kaduna in 2017.',
}

const helix = [
  { name: 'Consultancy', body: 'Ihifix Technologies develops digital solutions and technology advisory.', current: true, links: [] },
  {
    name: 'Education',
    body: 'Ihifix Digital Academy and International School build talent.',
    current: false,
    links: [groupSites.academy, groupSites.school],
  },
  {
    name: 'Foundation',
    body: 'Ihifix Innovation Foundation expands access in underserved communities.',
    current: false,
    links: [groupSites.foundation],
  },
]

const values = ['Innovation', 'Integrity', 'Excellence', 'Impact', 'Inclusion', 'Optimism']

const milestones = [
  { year: '2017', text: 'Founded in Kaduna; Eyes & Ears citizen monitoring begins' },
  { year: '2019', text: 'Google Digital Skills partnership' },
  { year: '2021', text: 'MacArthur accountability platforms in Borno and Zamfara' },
  { year: '2022', text: 'Meepeeya (USAID State2State) and Citizens Demand (DFID PERL) launch' },
  { year: '2023', text: 'Citizen input shapes the Kaduna State budget; Afriscale summit' },
]

const leaders = [
  {
    name: 'Emmanuel Odeh Adikpe',
    role: 'Founder & CEO',
    photo: '/images/team/emmanuel-odeh-adikpe.jpg',
    bio: 'Digital specialist and Certified Management Consultant with 10+ years leading large-scale education and technology initiatives.',
  },
  {
    name: 'Adewole Adegbesan',
    role: 'Business Development Manager',
    photo: '/images/team/adewole-adegbesan.jpg',
    bio: 'Senior banking executive leading partnerships, procurement and client relationships.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="The Technology & Innovation Engine of Ihifix Group"
        intro="Since 2017 we have built digital systems that help governments listen, help funders see impact and help businesses grow, from our base in Kaduna."
        crumbs={[{ label: 'About' }]}
      />

      <section className="section bg-background pt-8 md:pt-12">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="reveal-scale relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-[var(--shadow-card)]">
            <TripleHelix />
          </div>
          <div className="flex flex-col gap-6">
            <Eyebrow>The Triple Helix</Eyebrow>
            <h2 className="h2">
              <Rise text="Three arms, one mission" />
            </h2>
            <ul className="flex flex-col gap-3">
              {helix.map((h, i) => (
                <li
                  key={h.name}
                  style={{ '--i': i } as React.CSSProperties}
                  className={`reveal flex flex-col gap-1 rounded-3xl p-6 ${h.current ? 'bg-navy text-white' : 'bg-panel text-navy'}`}
                >
                  <h3 className="flex items-center gap-2 text-lg font-semibold">
                    {h.name}
                    {h.current && (
                      <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-white">You are here</span>
                    )}
                  </h3>
                  <p className={`text-sm leading-relaxed ${h.current ? 'text-white/75' : 'text-muted-foreground'}`}>{h.body}</p>
                  {h.links.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {h.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-navy ring-1 ring-border transition-colors hover:bg-navy hover:text-white"
                        >
                          {l.label.replace('Ihifix ', '')}
                          <ArrowUpRight aria-hidden="true" className="size-3.5" />
                          <span className="sr-only"> (opens {l.label} website)</span>
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section bg-panel">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <Eyebrow>Our values</Eyebrow>
            <h2 className="h2">
              <Rise text="What we hold ourselves to" />
            </h2>
            <ul className="flex flex-wrap gap-2">
              {values.map((v, i) => (
                <li
                  key={v}
                  style={{ '--i': i } as React.CSSProperties}
                  className="reveal rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy shadow-[0_1px_0_rgba(5,20,90,0.05)]"
                >
                  {v}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-8 lg:col-span-7">
            <Eyebrow>Milestones</Eyebrow>
            <ol className="relative flex flex-col gap-3">
              {milestones.map((m, i) => (
                <li
                  key={m.year}
                  style={{ '--i': i } as React.CSSProperties}
                  className="reveal-left grid grid-cols-[5.5rem_1fr] items-baseline gap-4 rounded-3xl bg-white p-6"
                >
                  <span className="text-2xl font-bold tracking-[-0.03em] text-primary">{m.year}</span>
                  <span className="leading-relaxed text-ink">{m.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="leadership" className="section bg-background">
        <div className="wrap flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <Eyebrow>Leadership</Eyebrow>
            <h2 className="h2">
              <Rise text="The people accountable for delivery" />
            </h2>
          </div>
          <ul className="grid gap-4 md:grid-cols-2">
            {leaders.map((l, i) => (
              <li key={l.name} style={{ '--i': i } as React.CSSProperties} className="reveal card flex flex-col gap-5 p-7 sm:flex-row sm:items-center">
                <div className="relative size-28 shrink-0 overflow-hidden rounded-2xl bg-panel sm:size-32">
                  <Image src={l.photo} alt={`Portrait of ${l.name}`} fill sizes="128px" className="object-cover object-top" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold text-ink">{l.name}</h3>
                  <p className="text-sm font-semibold text-primary">{l.role}</p>
                  <p className="pt-2 text-sm leading-relaxed text-muted-foreground">{l.bio}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="reveal max-w-3xl leading-relaxed text-muted-foreground">
            Our board brings expertise in international development, governance, education reform, marketing and management
            consulting.
          </p>
        </div>
      </section>

      <section id="careers" className="bg-background">
        <div className="wrap">
          <div className="band-navy reveal-scale flex flex-col gap-8 rounded-[2rem] px-7 py-12 md:flex-row md:items-center md:justify-between md:px-14 md:py-16">
            <div className="flex max-w-2xl flex-col gap-4">
              <Eyebrow inverted>Careers</Eyebrow>
              <h2 className="h2 text-white">
                <Rise text="Engineers, designers and analysts: build work that matters" />
              </h2>
              <p className="leading-relaxed text-white/75">
                We grow talent through the Ihifix Digital Academy and hire for meaningful, high-impact projects.
              </p>
            </div>
            <CtaLink href="/careers" variant="light" arrow className="shrink-0">
              Send us your CV
            </CtaLink>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
