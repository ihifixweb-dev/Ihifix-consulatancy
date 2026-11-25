import Link from 'next/link'
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { contact, groupSites, services } from '@/lib/content'
import { Logo } from './primitives'
import { NewsletterForm } from './newsletter-form'

const group = [groupSites.group, groupSites.academy, groupSites.school, groupSites.foundation]

const company = [
  { label: 'About', href: '/about' },
  { label: 'Case studies', href: '/work' },
  { label: 'How we work', href: '/how-we-work' },
  { label: 'Careers', href: '/careers' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Contact', href: '/contact' },
]

export function SiteFooter() {
  return (
    <footer className="site-footer band-night pb-24 lg:pb-0">

      <div className="wrap">
        <div className="grid gap-8 py-16 md:grid-cols-[1fr_auto] md:items-end md:py-20">
          <div className="flex flex-col gap-6">
            <Logo inverted className="self-start" />
            <p className="max-w-xl text-[clamp(1.5rem,1.1rem+1.6vw,2.4rem)] font-bold leading-[1.15] tracking-[-0.03em] text-white">
              <span className="text-white/55">The Technology &amp; Innovation Engine of Ihifix Group.</span>{' '}
              <span className="whitespace-nowrap">
                <span className="text-primary">&hellip;</span>it&apos;s Possible.
              </span>
            </p>
            <p className="max-w-md text-sm leading-relaxed text-white/60">Building digital solutions in Kaduna since 2017.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-primary">
              Start a project
            </Link>
            <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">
              <MessageCircle aria-hidden="true" className="size-4" /> WhatsApp us
            </a>
          </div>
        </div>

        <div className="grid gap-12 border-t border-white/10 py-14 md:grid-cols-2 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:col-span-4">
            <FooterTitle>Talk to us</FooterTitle>
            <ul className="flex flex-col gap-4 text-sm">
              <ContactItem icon={Phone} href={contact.phoneHref} label="Phone">
                {contact.phone}
              </ContactItem>
              <ContactItem icon={MessageCircle} href={contact.whatsapp} label="WhatsApp" external>
                {contact.phone}
              </ContactItem>
              <ContactItem icon={Mail} href={`mailto:${contact.email}`} label="Email">
                {contact.email}
              </ContactItem>
              <ContactItem icon={MapPin} label="Office">
                {contact.address}
              </ContactItem>
            </ul>
          </div>

          <FooterList title="Services" className="lg:col-span-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="footer-link">
                  {s.title}
                </Link>
              </li>
            ))}
          </FooterList>

          <FooterList title="Company" className="lg:col-span-2">
            {company.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className="footer-link">
                  {c.label}
                </Link>
              </li>
            ))}
          </FooterList>

          <div className="flex flex-col gap-4 lg:col-span-3">
            <FooterTitle>Insights by email</FooterTitle>
            <p className="text-sm leading-relaxed text-white/65">
              Occasional notes on civic tech, AI and digital transformation in Africa.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-8 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {group.map((g) => (
              <li key={g.label}>
                <a href={g.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-white">
                  {g.label}
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </a>
              </li>
            ))}
          </ul>
          <p>&copy; {new Date().getFullYear()} Ihifix Technologies Limited</p>
        </div>
      </div>
    </footer>
  )
}

function FooterTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-semibold text-white">{children}</h2>
}

function FooterList({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col gap-5 ${className ?? ''}`}>
      <FooterTitle>{title}</FooterTitle>
      <ul className="flex flex-col gap-3 text-sm">{children}</ul>
    </div>
  )
}

function ContactItem({
  icon: Icon,
  href,
  label,
  external,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  href?: string
  label: string
  external?: boolean
  children: React.ReactNode
}) {
  const body = (
    <>
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/[0.07] text-white group-hover:bg-primary">
        <Icon aria-hidden="true" className="size-4" />
      </span>
      <span className="flex flex-col">
        <span className="text-xs text-white/50">{label}</span>
        <span className="font-medium text-white/85 group-hover:text-white">{children}</span>
      </span>
    </>
  )
  return (
    <li>
      {href ? (
        <a
          href={href}
          className="group flex items-center gap-3"
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {body}
        </a>
      ) : (
        <div className="group flex items-center gap-3">{body}</div>
      )}
    </li>
  )
}
