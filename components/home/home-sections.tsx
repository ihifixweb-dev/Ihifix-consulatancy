import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, Layers, Quote, ShieldCheck } from 'lucide-react'
import { caseStudies, groupSites, industries, partners, process, services, stats, trustedBy, type PartnerLogo } from '@/lib/content'
import { CaseCard, ServiceCard } from '@/components/site/cards'
import { CtaLink, Eyebrow, Rise, SectionHeading } from '@/components/site/primitives'

const stagger = (i: number) => ({ '--i': i }) as React.CSSProperties

export function Hero() {
  return (
    <section className="hero has-pattern">
      <div className="hero-bg" aria-hidden="true" data-parallax="0.18">
        <Image src="/images/hero-team.png" alt="" fill priority sizes="100vw" />
      </div>
      <div className="wrap">
        <div className="flex max-w-3xl flex-col items-start">
          <p className="hero-kicker mb-6">Ihifix Technologies &middot; Since 2017</p>
          <h1>
            <Rise text="Digital solutions that work." /> <em><Rise text="Built for African realities." start={4} /></em>
          </h1>
          <p className="lead mb-10 mt-7 max-w-[34em]">
            We build software, AI and cloud systems for governments, development partners and growing businesses, backed by
            platforms adopted by state governments and funded by UKAID, USAID and the MacArthur Foundation.
          </p>
          <div className="btn-row flex flex-wrap gap-3">
            <CtaLink href="/contact" arrow>
              Start a project
            </CtaLink>
            <CtaLink href="/work" variant="outline-inverted">
              View our work
            </CtaLink>
          </div>
          <ul className="trust mt-10">
            <li>
              <BadgeCheck aria-hidden="true" className="size-4" /> Government-adopted platforms
            </li>
            <li>
              <ShieldCheck aria-hidden="true" className="size-4" /> NDPA 2023 compliant
            </li>
            <li>
              <Layers aria-hidden="true" className="size-4" /> Research to cloud
            </li>
          </ul>
        </div>
      </div>
      <span className="hero-scroll hidden md:block" aria-hidden="true" />
    </section>
  )
}

function splitStat(value: string) {
  const match = value.match(/^(\d+)(.*)$/)
  return match ? { n: Number(match[1]), suffix: match[2] } : null
}

function LogoTile({ logo, hidden = false, i = 0 }: { logo: PartnerLogo; hidden?: boolean; i?: number }) {
  return (
    <li
      className={hidden ? 'marquee-item dup' : 'marquee-item'}
      aria-hidden={hidden || undefined}
      style={{ '--i': i } as React.CSSProperties}
    >
      <div className="logo-tile" title={logo.name}>
        <Image
          src={logo.src}
          alt={hidden || logo.label ? '' : logo.name}
          width={logo.width}
          height={logo.height}
          style={{ height: logo.size, width: 'auto' }}
        />
        {logo.label && <span>{logo.label}</span>}
      </div>
    </li>
  )
}

export function ProofStrip() {
  return (
    <section aria-label="Track record" className="bg-background py-16 md:py-24">
      <div className="wrap flex flex-col gap-16">
        <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s, i) => {
            const parts = splitStat(s.value)
            return (
              <div key={s.label} className="reveal card flex flex-col gap-2 p-6 md:p-7" style={stagger(i)}>
                <dt className="order-2 text-sm font-medium text-muted-foreground">{s.label}</dt>
                <dd className="order-1 text-[clamp(2.4rem,1.8rem+2vw,3.4rem)] font-bold leading-none tracking-[-0.04em] text-navy">
                  {parts ? (
                    <span data-count={parts.n} data-suffix={parts.suffix}>
                      {s.value}
                    </span>
                  ) : (
                    s.value
                  )}
                </dd>
              </div>
            )
          })}
        </dl>
        <div className="flex flex-col items-center gap-8">
          <p className="reveal text-center text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Trusted by development partners, foundations and government
          </p>
          <div className="marquee w-full">
            <ul className="marquee-track">
              {trustedBy.map((logo, i) => (
                <LogoTile key={logo.name} logo={logo} i={i} />
              ))}
              {trustedBy.map((logo, i) => (
                <LogoTile key={`dup-${logo.name}`} logo={logo} hidden i={trustedBy.length + i} />
              ))}
            </ul>
          </div>
          <Link href="/work#partners" className="reveal link-arrow">
            See who we have delivered with <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export function ServicesGrid() {
  return (
    <section className="section bg-background pt-8 md:pt-12">
      <div className="wrap flex flex-col gap-12 md:gap-16">
        <SectionHeading
          eyebrow="What we do"
          title="Full-stack capability, from research to cloud operations"
          lead="Six capabilities under one roof, so nothing is lost between vendors."
          link={{ href: '/services', label: 'All services' }}
        />
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <li key={s.slug} className="reveal" style={stagger(i % 3)}>
              <ServiceCard service={s} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function FeaturedWork() {
  return (
    <section className="section bg-panel">
      <div className="wrap flex flex-col gap-12 md:gap-16">
        <SectionHeading
          eyebrow="Selected work"
          title="Platforms with measurable public outcomes"
          lead="Civic-tech and accountability systems adopted by governments and backed by international funders."
          link={{ href: '/work', label: 'All case studies' }}
        />
        <ul className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.slice(0, 3).map((c, i) => (
            <li key={c.slug} className="reveal" style={stagger(i)}>
              <CaseCard study={c} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const reasons = [
  {
    title: 'Civic-tech and governance depth',
    body: 'Our platforms have shaped a state budget and run citizen monitoring since 2017. We understand how public institutions actually adopt technology.',
  },
  {
    title: 'Development-sector trust',
    body: 'Delivery for UKAID/DFID, USAID, Ford, MacArthur and Google means we already meet donor compliance, reporting and safeguarding standards.',
  },
  {
    title: 'Full-stack, one partner',
    body: 'Research, branding, build and cloud operations under one roof, so nothing is lost between vendors.',
  },
  {
    title: 'Local presence, wider reach',
    body: 'Rooted in Northern Nigeria with reach across 49 countries, and a talent pipeline through the Ihifix Digital Academy.',
  },
]

export function WhyIhifix() {
  return (
    <section className="band-navy has-pattern section">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <Eyebrow inverted>Why Ihifix</Eyebrow>
          <h2 className="h2 text-white">
            <Rise text="A partner that has done this in the field, not just on slides." />
          </h2>
          <div className="reveal-scale relative mt-4 aspect-[4/3] overflow-hidden rounded-[2rem] ring-1 ring-white/10" data-parallax="0.1">
            <Image
              src="/images/academy-training.jpg"
              alt="An Ihifix Digital Academy trainer leading a session on search marketing"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <ul className="grid gap-4 self-center md:grid-cols-2 lg:col-span-7">
          {reasons.map((r, i) => (
            <li
              key={r.title}
              className="reveal flex flex-col gap-4 rounded-3xl bg-white/[0.06] p-7 ring-1 ring-white/10 hover:bg-white/[0.1]"
              style={stagger(i)}
            >
              <span className="text-sm font-semibold text-[#ff8a66]">0{i + 1}</span>
              <h3 className="text-xl font-semibold tracking-[-0.02em] text-white">{r.title}</h3>
              <p className="text-[0.9375rem] leading-relaxed text-white/70">{r.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function IndustriesTeaser() {
  return (
    <section className="section bg-background">
      <div className="wrap flex flex-col gap-12 md:gap-16">
        <SectionHeading
          eyebrow="Who we serve"
          title="Built for the sectors where trust matters most"
          link={{ href: '/solutions', label: 'All solutions' }}
        />
        <ul className="grid gap-4 md:grid-cols-2">
          {industries.map((ind, i) => (
            <li key={ind.slug} className="reveal" style={stagger(i % 2)}>
              <Link href={`/solutions#${ind.slug}`} className="card lift group flex h-full flex-col gap-4 p-7 md:p-9">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl font-semibold tracking-[-0.02em] text-ink md:text-2xl">{ind.title}</h3>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                    <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </div>
                <p className="max-w-lg leading-relaxed text-muted-foreground">{ind.desc}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                  {ind.refs.map((ref) => (
                    <li key={ref} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-navy">
                      {ref}
                    </li>
                  ))}
                </ul>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function ProcessTeaser() {
  return (
    <section className="section bg-wash">
      <div className="wrap flex flex-col gap-12 md:gap-16">
        <SectionHeading
          eyebrow="How we work"
          title="A delivery process built for accountability"
          lead="Every stage ends with an artefact you can share with boards, funders and auditors."
          link={{ href: '/how-we-work', label: 'Our process' }}
        />
        <ol className="timeline timeline-row relative grid gap-4 md:grid-cols-5" data-timeline>
          {process.map((p, i) => (
            <li key={p.name} className="lift relative flex gap-5 rounded-3xl bg-white p-6 md:flex-col md:gap-4" data-step>
              <span className="step-dot grid size-11 shrink-0 place-items-center rounded-full bg-navy text-sm font-bold text-white">
                {i + 1}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-ink">{p.name}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                <p className="pt-1 text-xs font-semibold text-primary">{p.artefact}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Testimonial() {
  const partner = partners[0]
  return (
    <section className="section bg-background">
      <figure className="wrap flex max-w-5xl flex-col items-center gap-8 text-center">
        <span className="reveal-scale grid size-16 place-items-center rounded-full bg-primary text-white shadow-[0_16px_30px_-12px_rgba(228,44,4,0.6)]">
          <Quote aria-hidden="true" className="size-7" />
        </span>
        <blockquote className="rise text-[clamp(1.6rem,1.1rem+1.8vw,2.6rem)] font-semibold leading-[1.25] tracking-[-0.025em] text-ink">
          <Rise text="“For the first time, the priorities communities told us about were sitting in front of the people writing the budget, in a format they could use.”" />
        </blockquote>
        <figcaption className="reveal flex items-center gap-3 text-sm text-muted-foreground">
          <span className="h-px w-8 bg-primary" aria-hidden="true" />
          Programme lead, {partner.name} &middot; reference available on request
        </figcaption>
      </figure>
    </section>
  )
}

export function EcosystemBand() {
  return (
    <section className="bg-background pb-20 md:pb-28">
      <div className="wrap">
        <div className="grid gap-8 rounded-[2rem] bg-panel p-8 md:grid-cols-3 md:p-12">
          <div className="reveal flex flex-col gap-3">
            <Eyebrow>The Triple Helix</Eyebrow>
            <p className="text-2xl font-bold tracking-[-0.03em] text-ink">Part of Ihifix Group</p>
          </div>
          <p className="reveal leading-relaxed text-muted-foreground" style={stagger(1)}>
            <a href={groupSites.academy.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-navy underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
              Ihifix Digital Academy
            </a>{' '}
            trains the engineers, designers and
            analysts who join our delivery teams.
          </p>
          <p className="reveal leading-relaxed text-muted-foreground" style={stagger(2)}>
            <a href={groupSites.foundation.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-navy underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
              Ihifix Innovation Foundation
            </a>{' '}
            extends digital access to
            underserved communities across Northern Nigeria.
          </p>
        </div>
      </div>
    </section>
  )
}
