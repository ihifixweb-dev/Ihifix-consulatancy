'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowRight, Menu, MessageCircle, Phone, X } from 'lucide-react'
import { contact, navItems } from '@/lib/content'
import { Logo } from './primitives'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])

  // Close the sheet on navigation and lock page scroll while it is open.
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header className={cn('site-header', scrolled && 'is-scrolled')}>
        <div className="wrap">
          <div className="bar">
            <Link href="/" aria-label="Ihifix Technologies home" className="flex shrink-0 items-center">
              <Logo />
            </Link>

            <nav aria-label="Primary" className="ml-4 hidden lg:block">
              <ul className="flex items-center gap-1">
                {navItems.map((item) => {
                  const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
                  return (
                    <li key={item.href}>
                      <Link href={item.href} aria-current={active ? 'page' : undefined} className="nav-pill">
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="ml-auto flex items-center gap-2">
              <a
                href={contact.phoneHref}
                className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-navy transition-colors hover:bg-panel xl:inline-flex"
              >
                <Phone aria-hidden="true" className="size-4 text-primary" />
                {contact.phone}
              </a>
              <Link href="/contact" className="btn btn-primary btn-sm hidden min-[400px]:inline-flex">
                Start a project
              </Link>
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center rounded-full text-navy transition-colors hover:bg-panel lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-nav"
                onClick={() => setOpen(true)}
              >
                <Menu aria-hidden="true" />
                <span className="sr-only">Open menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Kept outside the header: its backdrop-filter would trap a fixed-position child. */}
      {open && (
        <div id="mobile-nav" className="sheet lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="wrap flex h-[var(--header)] shrink-0 items-center justify-between pt-3">
            <Link href="/" aria-label="Ihifix Technologies home" className="pl-[22px]">
              <Logo />
            </Link>
            <button
              type="button"
              className="mr-2 inline-flex size-11 items-center justify-center rounded-full bg-panel text-navy"
              onClick={() => setOpen(false)}
              autoFocus
            >
              <X aria-hidden="true" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <nav aria-label="Mobile" className="wrap py-4">
            <ul>
              {navItems.map((item, i) => (
                <li key={item.href} className="sheet-item" style={{ '--i': i } as React.CSSProperties}>
                  <Link href={item.href} className="sheet-link" onClick={() => setOpen(false)}>
                    {item.label}
                    <ArrowRight aria-hidden="true" className="size-5 text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="wrap mt-auto flex flex-col gap-3 pb-8 pt-6">
            <Link href="/contact" className="btn btn-primary w-full" onClick={() => setOpen(false)}>
              Start a project
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <a href={contact.phoneHref} className="btn btn-ghost">
                <Phone aria-hidden="true" className="size-4" /> Call
              </a>
              <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <MessageCircle aria-hidden="true" className="size-4" /> WhatsApp
              </a>
            </div>
            <p className="pt-2 text-center text-sm text-muted-foreground">{contact.phone}</p>
          </div>
        </div>
      )}
    </>
  )
}
