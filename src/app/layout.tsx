'use client';

import { usePathname } from 'next/navigation';
import './globals.css';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import { ThemeProvider } from 'next-themes';
import ScrollToTop from './components/ScrollToTop';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isDocsRoute = pathname.startsWith('/docs');

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Header />
          {children}
          {!isDocsRoute && <Footer />}
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}