import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CtaLink, Eyebrow, InsightMotif, Rise } from '@/components/site/primitives'

const links = [
  { href: '/services', label: 'Our services' },
  { href: '/work', label: 'Case studies' },
  { href: '/about', label: 'About Ihifix' },
]

export default function NotFound() {
  return (
    <section className="page-hero notfound has-pattern pattern-light">
      <InsightMotif kind="trend" />
      <div className="wrap flex min-h-[60vh] max-w-3xl flex-col items-start justify-center gap-6">
        <Eyebrow>Error 404</Eyebrow>
        <h1>
          <Rise text="This page doesn't exist." /> <em><Rise text="But your project can." start={4} /></em>
        </h1>
        <p className="lead">Try one of these instead:</p>
        <ul className="flex flex-wrap gap-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="link-arrow rounded-full bg-panel px-4 py-2.5 hover:bg-[var(--panel-2)]">
                {l.label} <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </li>
          ))}
        </ul>
        <div className="btn-row pt-2">
          <CtaLink href="/contact" arrow>
            Start a project
          </CtaLink>
        </div>
      </div>
    </section>
  )
}
