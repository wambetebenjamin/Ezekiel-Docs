import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { Providers } from '@/components/Providers';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { VoiceTour } from '@/components/VoiceTour';
import { CookieConsent } from '@/components/CookieConsent';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: 'Ezekiel Docs - Your Legal Documents, Done Right',
  description: 'Generate legal documents in minutes. Kenyan-law-compliant contracts for SMEs, freelancers, and startups. Lawyer-reviewed, instant PDF download, secure and private.',
  keywords: 'legal documents, Kenya, contracts, NDA, service agreement, employment contract, freelancer contract, sale agreement, tenancy agreement',
  authors: [{ name: 'Ezekiel Docs' }],
  creator: 'Ezekiel Docs',
  publisher: 'Ezekiel Docs',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: 'https://ezekieldocs.com',
    siteName: 'Ezekiel Docs',
    title: 'Ezekiel Docs - Your Legal Documents, Done Right',
    description: 'Generate legal documents in minutes. Kenyan-law-compliant contracts for SMEs, freelancers, and startups.',
    images: [
      {
        url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
        width: 1200,
        height: 630,
        alt: 'Ezekiel Docs - Legal Document Automation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ezekiel Docs - Your Legal Documents, Done Right',
    description: 'Generate legal documents in minutes. Kenyan-law-compliant contracts for SMEs, freelancers, and startups.',
    images: ['https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" data-bs-theme="light" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://www.gstatic.com" />
      </head>
      <body className="pb-safe">
        <LoadingScreen />
        <Providers>
          <Navigation />
          <main id="main-content" className="pt-navbar">{children}</main>
          <Footer />
          <WhatsAppButton />
          <VoiceTour />
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}