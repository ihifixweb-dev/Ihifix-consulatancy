import type { Metadata } from 'next'
import Image from 'next/image'
import { FileCheck2, KeyRound, Lock, ShieldCheck } from 'lucide-react'
import { process } from '@/lib/content'
import { CtaBand, Eyebrow, NetworkPattern, PageHero, Rise } from '@/components/site/primitives'

export const metadata: Metadata = {
  title: 'How We Work',
  description: 'Our delivery process, engagement models, security and data-protection practices, and procurement readiness.',
}

const models = [
  { name: 'Discovery sprint', body: 'Validate the problem, users and scope before committing a full budget.' },
  { name: 'Fixed-scope project', body: 'Clear deliverables, milestones and price, ideal for tenders and grants.' },
  { name: 'Dedicated team', body: 'A cross-functional squad working as an extension of your organisation.' },
  { name: 'Retainer / managed services', body: 'Ongoing operations, support and iteration with agreed service levels.' },
]

const practices = [
  { icon: ShieldCheck, title: 'Secure SDLC', body: 'Code review, dependency scanning and security testing on every release.' },
  { icon: KeyRound, title: 'Access controls', body: 'Least-privilege access, MFA and audited credentials across environments.' },
  { icon: Lock, title: 'Backups & recovery', body: 'Daily encrypted backups with regularly tested restores.' },
  { icon: FileCheck2, title: 'NDPA 2023 compliance', body: 'Lawful basis, consent, data subject rights and a defined breach process.' },
]

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="How we work"
        title="Transparent delivery, from discovery to scale"
        intro="Clients see progress every step of the way, with artefacts they can share with boards, funders and auditors."
        crumbs={[{ label: 'How We Work' }]}
      />

      <section className="section bg-background pt-8 md:pt-12">
        <div className="wrap flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <Eyebrow>Delivery process</Eyebrow>
            <h2 className="h2">
              <Rise text="Five stages, clear touchpoints" />
            </h2>
          </div>
          <ol className="flex flex-col gap-3">
            {process.map((p, i) => (
              <li key={p.name} style={{ '--i': i } as React.CSSProperties} className="reveal">
                <div className="group grid gap-4 rounded-3xl bg-panel p-6 transition-colors hover:bg-[var(--panel-2)] md:grid-cols-12 md:items-center md:p-8">
                  <span className="grid size-12 place-items-center rounded-full bg-navy text-sm font-bold text-white transition-colors group-hover:bg-primary md:col-span-1">
                    0{i + 1}
                  </span>
                  <h3 className="text-2xl font-semibold tracking-[-0.02em] text-ink md:col-span-3">{p.name}</h3>
                  <p className="leading-relaxed text-muted-foreground md:col-span-5">{p.desc}</p>
                  <p className="text-sm font-medium text-navy md:col-span-3">
                    <span className="block text-xs text-muted-foreground">You receive</span>
                    {p.artefact}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-wash">
        <div className="wrap grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            <Eyebrow>Engagement models</Eyebrow>
            <h2 className="h2">
              <Rise text="Choose how we work together" />
            </h2>
            <div className="reveal-scale relative mt-2 aspect-[3/2] overflow-hidden rounded-[2rem]">
              <Image
                src="/images/academy-graduates.jpg"
                alt="Ihifix Digital Academy participants holding their workbooks in a group photo"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <ul className="flex flex-col gap-3 self-end">
            {models.map((m, i) => (
              <li
                key={m.name}
                style={{ '--i': i } as React.CSSProperties}
                className="reveal flex flex-col gap-2 rounded-3xl bg-white p-7"
              >
                <span className="text-sm font-semibold text-primary">0{i + 1}</span>
                <h3 className="text-lg font-semibold text-ink">{m.name}</h3>
                <p className="leading-relaxed text-muted-foreground">{m.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band-navy has-pattern section">
        <NetworkPattern id="practices" />
        <div className="wrap flex flex-col gap-12">
          <div className="flex max-w-2xl flex-col gap-4">
            <Eyebrow inverted>Quality, security &amp; data protection</Eyebrow>
            <h2 className="h2 text-white">
              <Rise text="We follow the practices we sell" />
            </h2>
          </div>
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {practices.map(({ icon: Icon, title, body }, i) => (
              <li
                key={title}
                style={{ '--i': i } as React.CSSProperties}
                className="reveal flex flex-col gap-4 rounded-3xl bg-white/[0.06] p-7 ring-1 ring-white/10"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-primary text-white">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-white/70">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-background">
        <div className="wrap flex max-w-4xl flex-col gap-8">
          <div className="flex flex-col gap-4">
            <Eyebrow>Procurement readiness</Eyebrow>
            <h2 className="h2">
              <Rise text="Ready for your due diligence" />
            </h2>
          </div>
          <ul className="grid gap-3 md:grid-cols-2">
            {[
              'CAC company registration details',
              'Tax and compliance documents on request',
              'Reference contacts on request',
              'Capability statement and credentials pack',
            ].map((item, i) => (
              <li
                key={item}
                style={{ '--i': i } as React.CSSProperties}
                className="reveal flex items-center gap-4 rounded-2xl bg-panel p-5 font-medium text-ink"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/10">
                  <FileCheck2 aria-hidden="true" className="size-4 text-primary" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
