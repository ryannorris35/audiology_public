import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import VisitorTracker from '@/components/VisitorTracker';
import LocalBusinessSchema from '@/components/LocalBusinessSchema';
import { getDictionary, getCurrentLocale } from '@/lib/i18n/getDictionary';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://huwlatimerhearingcare.co.uk';

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: 'Audiologist Swansea | Huw Latimer Hearing Care',
      template: '%s | Huw Latimer Hearing Care Swansea',
    },
    description:
      'Expert hearing care in Swansea. Specialist in micro-suction ear wax removal, hearing aids and hearing assessments. Book your appointment today.',
    keywords: [
      'audiologist swansea', 'ear wax removal swansea', 'micro suction swansea',
      'hearing aids swansea', 'hearing test swansea', 'hearing care swansea',
      'huw latimer', 'blocked ear swansea', 'hearing impairment swansea',
    ],
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      siteName: 'Huw Latimer Hearing Care',
      url: siteUrl,
    },
    twitter: { card: 'summary_large_image' },
    robots: { index: true, follow: true },
    alternates: { canonical: siteUrl },
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
        <LocalBusinessSchema />
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
