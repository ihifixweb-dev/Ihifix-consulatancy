import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { MobileContactBar } from '@/components/site/mobile-contact-bar'
import { CookieConsent } from '@/components/site/cookie-consent'
import { MotionRuntime, motionHeadScript } from '@/components/site/motion'
import { contact } from '@/lib/content'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: {
    default: 'Ihifix Technologies | Software, AI & Cloud Consultancy in Nigeria',
    template: '%s | Ihifix Technologies',
  },
  description:
    'Ihifix Technologies builds digital solutions, AI and cloud systems that work in African realities, backed by a track record of donor-funded and government-adopted platforms.',
  keywords: [
    'custom software development Nigeria',
    'AI solutions Africa',
    'civic tech platform',
    'digital transformation consultancy Nigeria',
    'MVP development Africa',
    'cloud services Nigeria',
  ],
  openGraph: {
    title: 'Ihifix Technologies',
    description: 'Software, AI and cloud systems that work in African realities.',
    type: 'website',
    locale: 'en_NG',
  },
  generator: 'v0.app',
  icons: {
    // One mark for light and dark tabs: navy square, red ring, white ring, navy centre.
    icon: [
      { url: '/favicon.ico', sizes: '32x32 48x48' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#05145a',
  width: 'device-width',
  initialScale: 1,
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Ihifix Technologies Limited',
  foundingDate: '2017',
  email: contact.email,
  telephone: '+2349161311555',
  logo: '/images/ihifix-logo.png',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'No. 2 Ahman Pategi, off Alkali Road',
    addressLocality: 'Kaduna',
    addressCountry: 'NG',
  },
  parentOrganization: { '@type': 'Organization', name: 'Ihifix Group' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jakarta.variable} bg-background`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionHeadScript }} />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <MobileContactBar />
        <CookieConsent />
        <MotionRuntime />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
