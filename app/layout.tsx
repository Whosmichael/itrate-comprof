import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import { themeInitScript } from '@/lib/theme'
import { site } from '@/lib/site'
import './globals.css'

const body = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
})
// Variable font (full weight axis) so "Iterate." can step through weights letter by letter.
const heading = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-heading',
})
const code = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-code',
})

const SITE_URL = 'https://www.itrate.tech'
const TITLE = 'itrate | Websites, custom systems & AI automations for small businesses'
const DESCRIPTION =
  'itrate is the tech team for small businesses in Indonesia: company profile websites, landing pages, custom systems, and AI automations, built, shipped, and looked after for you.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: 'itrate',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'itrate',
    title: 'itrate | Build. Ship. Iterate.',
    description: 'Your tech team for small businesses. Websites, custom systems, and AI automations.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'itrate | Build. Ship. Iterate.',
    description: 'Your tech team for small businesses. Websites, custom systems, and AI automations.',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'itrate',
  url: SITE_URL,
  logo: `${SITE_URL}/icon-192.png`,
  image: `${SITE_URL}/opengraph-image.png`,
  description: DESCRIPTION,
  slogan: 'Build. Ship. Iterate.',
  email: site.email,
  telephone: site.whatsappDisplay,
  areaServed: 'ID',
  sameAs: [site.instagramUrl],
  knowsAbout: ['Company profile websites', 'Landing pages', 'Custom business systems', 'AI automation'],
}

export const viewport: Viewport = {
  themeColor: '#f7f8fa',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${body.variable} ${heading.variable} ${code.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          // Tells search engines who we are and how to reach us.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
