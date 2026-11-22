import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronRight, Phone } from 'lucide-react'
import { contact } from '@/lib/content'
import { cn } from '@/lib/utils'

export function Logo({ inverted = false, className }: { inverted?: boolean; className?: string }) {
  return (
    <Image
      src={inverted ? '/images/ihifix-logo-white.png' : '/images/ihifix-logo.png'}
      alt="Ihifix Technologies"
      width={720}
      height={243}
      priority={!inverted}
      className={cn('logo-img', className)}
    />
  )
}

/**
 * Wraps each word in a mask so the headline rises word by word (see .w in globals.css).
 * `start` offsets the stagger so a second line continues where the first stopped.
 */
export function Rise({ text, start = 0 }: { text: string; start?: number }) {
  const words = text.split(' ')
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="w" style={{ '--d': Math.min(start + i, 15) } as React.CSSProperties}>
            <span>{word}</span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </>
  )
}

export function Eyebrow({
  children,
  inverted = false,
  className,
}: {
  children: React.ReactNode
  inverted?: boolean
  className?: string
}) {
  return <p className={cn('eyebrow', inverted && 'on-dark', className)}>{children}</p>
}

type CtaProps = {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'outline' | 'outline-inverted' | 'navy' | 'light'
  size?: 'md' | 'sm'
  arrow?: boolean
  className?: string
}

const ctaVariants: Record<NonNullable<CtaProps['variant']>, string> = {
  primary: 'btn-primary',
  outline: 'btn-ghost',
  'outline-inverted': 'btn-outline-light',
  navy: 'btn-navy',
  light: 'btn-light',
}

export function CtaLink({ href, children, variant = 'primary', size = 'md', arrow = false, className }: CtaProps) {
  return (
    <Link href={href} className={cn('btn', ctaVariants[variant], size === 'sm' && 'btn-sm', className)}>
      {children}
      {arrow && <ArrowRight aria-hidden="true" className="arrow size-4" />}
    </Link>
  )
}

export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="crumbs">
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link href="/">Home</Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1">
            <ChevronRight aria-hidden="true" className="size-3.5 opacity-60" />
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current="page" className="font-medium text-navy">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  children,
}: {
  eyebrow: string
  title: string
  intro?: string
  crumbs: { href?: string; label: string }[]
  children?: React.ReactNode
}) {
  return (
    <section className="page-hero has-pattern pattern-light">
      <NetworkPattern id="page-hero" />
      <div className="wrap flex flex-col gap-6">
        <Breadcrumbs items={crumbs} />
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>
          <Rise text={title} />
        </h1>
        {intro && <p className="lead max-w-2xl">{intro}</p>}
        {children && <div className="btn-row flex flex-wrap gap-3 pt-2">{children}</div>}
      </div>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  link,
  inverted = false,
}: {
  eyebrow: string
  title: string
  lead?: string
  link?: { href: string; label: string }
  inverted?: boolean
}) {
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_minmax(0,26rem)] md:items-end md:gap-12">
      <div className="flex max-w-2xl flex-col gap-4">
        <Eyebrow inverted={inverted}>{eyebrow}</Eyebrow>
        <h2 className={cn('h2', inverted && 'text-white')}>
          <Rise text={title} />
        </h2>
      </div>
      {(lead || link) && (
        <div className="reveal flex flex-col items-start gap-5">
          {lead && <p className={cn('lead', inverted && 'text-white/75')}>{lead}</p>}
          {link && (
            <Link href={link.href} className={cn('link-arrow', inverted && 'text-white')}>
              {link.label} <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

export function CtaBand({
  title = 'Have a project, tender or partnership in mind?',
  body = 'Tell us what you are trying to achieve. A member of our Business Development team responds within two working days.',
  href = '/contact',
}: {
  title?: string
  body?: string
  href?: string
}) {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="wrap">
        <div className="cta-card reveal-scale has-pattern px-7 py-12 md:px-16 md:py-20">
          <NetworkPattern id="cta" />
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div className="flex max-w-2xl flex-col gap-4">
              <Eyebrow inverted>Start a project</Eyebrow>
              <h2 className="h2 text-white">
                <Rise text={title} />
              </h2>
              <p className="lead text-white/75">{body}</p>
            </div>
            <div className="flex flex-col items-start gap-5 lg:items-end">
              <CtaLink href={href} arrow>
                Start a project
              </CtaLink>
              <a
                href={contact.phoneHref}
                className="inline-flex items-center gap-3 text-white/80 transition-colors hover:text-white"
              >
                <span className="grid size-10 place-items-center rounded-full bg-white/10">
                  <Phone aria-hidden="true" className="size-4" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-xs text-white/60">Or call us</span>
                  <span className="font-semibold">{contact.phone}</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * A faint street grid with dotted data routes that flow, nodes that ping and packets travelling the routes.
 * Light-on-dark by default; put `pattern-light` on the host for navy-on-white. Decorative only.
 */
export function NetworkPattern({ id }: { id: string }) {
  const r1 = `${id}-r1`
  const r2 = `${id}-r2`
  const r3 = `${id}-r3`
  return (
    <svg className="pattern" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <g className="streets">
        <path d="M0 120H1200M0 360H1200M0 600H1200M180 0V700M520 0V700M860 0V700M1080 0V700M0 520 700 0M600 700 1200 250" />
      </g>
      <path id={r1} className="route" d="M180 700V360H520V120H860V0" />
      <path id={r2} className="route" d="M1200 600H1080V360H860V120" />
      <path id={r3} className="route" d="M0 120H180V360" />
      <circle className="node" cx="520" cy="360" r="5" />
      <circle className="node" cx="860" cy="120" r="6" />
      <circle className="node" cx="1080" cy="360" r="5" />
      <circle className="node" cx="180" cy="360" r="5" />
      <circle className="ping" cx="860" cy="120" r="10" />
      <circle className="ping late" cx="1080" cy="360" r="10" />
      <circle className="ping" cx="180" cy="360" r="10" />
      <circle className="packet motion-only" r="5">
        <animateMotion dur="9s" repeatCount="indefinite" rotate="auto">
          <mpath href={`#${r1}`} />
        </animateMotion>
      </circle>
      <circle className="packet motion-only" r="4">
        <animateMotion dur="7s" begin="-3s" repeatCount="indefinite">
          <mpath href={`#${r2}`} />
        </animateMotion>
      </circle>
      <circle className="packet motion-only" r="4">
        <animateMotion dur="5s" begin="-1s" repeatCount="indefinite">
          <mpath href={`#${r3}`} />
        </animateMotion>
      </circle>
    </svg>
  )
}
