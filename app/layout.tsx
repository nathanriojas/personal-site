import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { site } from '@/content'
import {
  siteUrl,
  siteName,
  defaultDescription,
  jsonLdPerson,
  jsonLdWebsite,
} from '@/lib/seo'
import { JsonLd } from '@/components/json-ld'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: '%s · Nathan Riojas',
  },
  description: defaultDescription,
  applicationName: 'Nathan Riojas',
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  generator: 'v0.app',
  keywords: [
    'Nathan Riojas',
    'Forward Deployed Engineer',
    'Data Engineer',
    'Software Engineer',
    'Dallas',
    'Georgia Tech',
    'data pipelines',
    'robotics',
    'machine learning',
  ],
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName,
    title: siteName,
    description: defaultDescription,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: defaultDescription,
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#15171a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {/* Site-wide structured data: identifies the person and the website */}
        <JsonLd data={[jsonLdPerson(), jsonLdWebsite()]} />
        {children}
        {/* Film-grain overlay for subtle texture across the whole site */}
        <div className="grain-overlay" aria-hidden="true" />
        {process.env.NODE_ENV === 'production' && (
            <>
              <Analytics />
              <SpeedInsights />
            </>
          )
        }
      </body>
    </html>
  )
}
