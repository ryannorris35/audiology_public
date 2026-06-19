import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import VisitorTracker from '@/components/VisitorTracker';
import { getDictionary, getCurrentLocale } from '@/lib/i18n/getDictionary';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.meta.siteName,
    description: dict.meta.description,
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const dict = await getDictionary();
  const locale = await getCurrentLocale();

  return (
    <html lang={locale}>
      <body className={`${inter.variable} font-body`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar dict={dict} locale={locale} />
        <main id="main-content" style={{ paddingTop: 'var(--nav-height)' }}>
          {children}
        </main>
        <Footer dict={dict} />
        <CookieConsent dict={dict} />
        <VisitorTracker />
      </body>
    </html>
  );
}
