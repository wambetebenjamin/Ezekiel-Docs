import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import '@/styles/globals.css';
import { Providers } from '@/components/Providers';
import { Navigation } from '@/components/Navigation';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { VoiceTourButton } from '@/components/VoiceTourButton';
import { CookieConsent } from '@/components/CookieConsent';
import { Loader } from '@/components/Loader';

const interVariable = localFont({
  src: [
    {
      path: '../assets/fonts/Inter-roman.var.woff2',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Inter-italic.var.woff2',
      weight: '100 900',
      style: 'italic',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Ezekiel Docs - Your Legal Documents, Done Right',
    template: '%s | Ezekiel Docs',
  },
  description: 'Generate legally compliant Kenyan legal documents in minutes. NDA, Service Agreements, Employment Contracts, and more. Lawyer-reviewed, instant PDF download.',
  keywords: ['legal documents', 'Kenya', 'NDA', 'contracts', 'legal templates', 'SME', 'freelancer', 'startup'],
  authors: [{ name: 'Ezekiel Docs' }],
  creator: 'Ezekiel Docs',
  publisher: 'Ezekiel Docs',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: '/',
    siteName: 'Ezekiel Docs',
    title: 'Ezekiel Docs - Your Legal Documents, Done Right',
    description: 'Generate legally compliant Kenyan legal documents in minutes. NDA, Service Agreements, Employment Contracts, and more.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ezekiel Docs - Legal Document Automation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ezekiel Docs - Your Legal Documents, Done Right',
    description: 'Generate legally compliant Kenyan legal documents in minutes.',
    images: ['/images/og-image.jpg'],
    creator: '@ezekieldocs',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" data-bs-theme="light">
      <head>
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
      </head>
      <body className={`${interVariable.variable} font-sans bg-body-bg text-body-color`}>
        <Providers>
          <Loader />
          <Navigation />
          <main className="pt-16 pb-safe">{children}</main>
          <WhatsAppButton />
          <VoiceTourButton />
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}