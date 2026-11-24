import type { Metadata } from 'next'
import { GraduationCap, Mail, MessageCircle } from 'lucide-react'
import { contact } from '@/lib/content'
import { CvForm } from '@/components/careers/cv-form'
import { Eyebrow, PageHero } from '@/components/site/primitives'

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Send your CV to Ihifix Technologies. We hire engineers, designers and analysts in Kaduna for meaningful, high-impact projects.',
}

const steps = [
  { title: 'We read every CV', body: 'Our team reviews each application against current and upcoming projects.' },
  { title: 'A short conversation', body: 'If there is a fit, we will call or email to learn more about you and your work.' },
  { title: 'A practical task', body: 'For most roles, a small task or portfolio review based on real work, then a final interview.' },
]

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Send us your CV"
        intro="Engineers, designers and analysts: build work that matters. Tell us about yourself and we will be in touch when there is a role that fits."
        crumbs={[{ href: '/about', label: 'About' }, { label: 'Careers' }]}
      />
      <section className="bg-background pb-20 pt-4 md:pb-28">
        <div className="wrap relative grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="reveal rounded-[2rem] bg-panel p-6 md:p-10 lg:col-span-8">
            <CvForm />
          </div>
          <aside className="flex flex-col gap-4 lg:col-span-4">
            <div className="reveal band-navy flex flex-col gap-6 rounded-[2rem] p-8" style={{ '--i': 1 } as React.CSSProperties}>
              <Eyebrow inverted>What happens next</Eyebrow>
              <ol className="flex flex-col gap-5">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/[0.08] text-sm font-bold text-[#ff8a66]">
                      {i + 1}
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-white">{s.title}</span>
                      <span className="text-sm leading-relaxed text-white/70">{s.body}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="reveal flex flex-col gap-4 rounded-[2rem] bg-panel p-8" style={{ '--i': 2 } as React.CSSProperties}>
              <span className="grid size-12 place-items-center rounded-2xl bg-navy text-white">
                <GraduationCap aria-hidden="true" className="size-6" />
              </span>
              <h2 className="text-lg font-semibold text-ink">Early in your career?</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We grow talent through the Ihifix Digital Academy. Choose &ldquo;Internship / Digital Academy graduate&rdquo; in
                the form and tell us what you are learning.
              </p>
            </div>
            <div className="reveal flex flex-col gap-3 rounded-[2rem] bg-panel p-8 text-sm" style={{ '--i': 3 } as React.CSSProperties}>
              <span className="font-semibold text-ink">Questions about working with us?</span>
              <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 text-navy hover:underline">
                <Mail aria-hidden="true" className="size-4 text-primary" /> {contact.email}
              </a>
              <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-navy hover:underline">
                <MessageCircle aria-hidden="true" className="size-4 text-primary" /> WhatsApp {contact.phone}
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
