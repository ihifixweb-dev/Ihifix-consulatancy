import type { Metadata } from 'next'
import { Mail, MapPin, MessageCircle } from 'lucide-react'
import { contact } from '@/lib/content'
import { EnquiryForm } from '@/components/contact/enquiry-form'
import { Eyebrow, PageHero } from '@/components/site/primitives'

export const metadata: Metadata = {
  title: 'Start a Project',
  description: 'Send a project brief, tender invitation or partnership request to Ihifix Technologies in Kaduna, Nigeria.',
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>
}) {
  const { service } = await searchParams

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start a project with Ihifix"
        intro="Share a brief, a tender invitation or a partnership idea. We respond to every qualified enquiry within two working days."
        crumbs={[{ label: 'Start a Project' }]}
      />
      <section className="bg-background pb-20 pt-4 md:pb-28">
        <div className="wrap relative grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="reveal rounded-[2rem] bg-panel p-6 md:p-10 lg:col-span-8">
            <EnquiryForm defaultService={service} />
          </div>
          <aside className="flex flex-col gap-4 lg:col-span-4">
            <div className="reveal band-navy flex flex-col gap-6 rounded-[2rem] p-8" style={{ '--i': 1 } as React.CSSProperties}>
              <Eyebrow inverted>Talk to us directly</Eyebrow>
              <a
                href={contact.phoneHref}
                className="group flex flex-col gap-1 rounded-2xl bg-white/[0.07] p-5 ring-1 ring-white/10 transition-colors hover:bg-white/[0.12]"
              >
                <span className="text-xs text-white/60">Call Business Development</span>
                <span className="text-2xl font-bold tracking-[-0.02em] text-white">{contact.phone}</span>
              </a>
              <ul className="flex flex-col gap-4 text-sm">
                <ContactRow icon={Mail} label="Email">
                  <a href={`mailto:${contact.email}`} className="hover:underline">
                    {contact.email}
                  </a>
                </ContactRow>
                <ContactRow icon={MessageCircle} label="WhatsApp">
                  <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Chat on {contact.phone}
                  </a>
                </ContactRow>
                <ContactRow icon={MapPin} label="Office">
                  {contact.address}
                </ContactRow>
              </ul>
            </div>
            <div className="reveal overflow-hidden rounded-[2rem] bg-panel" style={{ '--i': 2 } as React.CSSProperties}>
              <iframe
                title="Map showing Kaduna, Nigeria"
                src="https://www.openstreetmap.org/export/embed.html?bbox=7.36%2C10.46%2C7.50%2C10.58&layer=mapnik"
                loading="lazy"
                className="aspect-square w-full"
              />
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  children: React.ReactNode
}) {
  return (
    <li className="flex gap-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/[0.08]">
        <Icon aria-hidden="true" className="size-4 text-[#ff8a66]" />
      </span>
      <div className="flex flex-col gap-0.5">
        <span className="text-xs text-white/60">{label}</span>
        <span className="text-white/90">{children}</span>
      </div>
    </li>
  )
}
