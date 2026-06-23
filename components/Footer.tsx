'use client';

import Link from 'next/link';
import { Dictionary } from '@/lib/i18n/types';
import SoundwaveDivider from './SoundwaveDivider';

interface FooterProps {
  dict: Dictionary;
}

const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/huw-latimer-125821418/',
    style: { backgroundColor: '#0A66C2' },
    icon: (
      <path d="M4.98 3.5C4.98 4.6 4.1 5.5 3 5.5S1.02 4.6 1.02 3.5 1.9 1.5 3 1.5s1.98.9 1.98 2zM1.5 8.5h3v12h-3v-12zm6 0h2.9v1.7h.04c.4-.76 1.4-1.56 2.9-1.56 3.1 0 3.66 2.04 3.66 4.7v7.16h-3v-6.35c0-1.5-.03-3.44-2.1-3.44-2.1 0-2.42 1.64-2.42 3.33v6.46h-3v-12z" />
    ),
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61590933583878',
    style: { backgroundColor: '#1877F2' },
    icon: (
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.13 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46H15.2c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.91h-2.33V22c4.78-.81 8.43-4.94 8.43-9.94z" />
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/huwlatimeraudiologist/',
    style: {
      background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
    },
    icon: (
      <path d="M12 2.2c2.7 0 3 .01 4.1.06 1 .05 1.6.22 1.96.36.5.2.85.43 1.22.8.37.36.6.72.8 1.22.15.37.32.97.36 1.96.05 1.1.06 1.4.06 4.1s-.01 3-.06 4.1c-.05 1-.22 1.6-.36 1.96-.2.5-.43.85-.8 1.22-.36.37-.72.6-1.22.8-.37.15-.97.32-1.96.36-1.1.05-1.4.06-4.1.06s-3-.01-4.1-.06c-1-.05-1.6-.22-1.96-.36-.5-.2-.85-.43-1.22-.8a3.3 3.3 0 0 1-.8-1.22c-.15-.37-.32-.97-.36-1.96C2.21 15 2.2 14.7 2.2 12s.01-3 .06-4.1c.05-1 .22-1.6.36-1.96.2-.5.43-.85.8-1.22.36-.37.72-.6 1.22-.8.37-.15.97-.32 1.96-.36C7.7 2.21 8 2.2 10.7 2.2H12zm0 1.8c-2.65 0-2.96.01-4.01.06-.86.04-1.32.18-1.63.3-.41.16-.7.35-1.01.66-.31.31-.5.6-.66 1.01-.12.31-.26.77-.3 1.63C4.34 8.71 4.33 9.02 4.33 12s.01 3.29.06 4.34c.04.86.18 1.32.3 1.63.16.41.35.7.66 1.01.31.31.6.5 1.01.66.31.12.77.26 1.63.3 1.05.05 1.36.06 4.01.06s2.96-.01 4.01-.06c.86-.04 1.32-.18 1.63-.3.41-.16.7-.35 1.01-.66.31-.31.5-.6.66-1.01.12-.31.26-.77.3-1.63.05-1.05.06-1.36.06-4.34s-.01-3.29-.06-4.34c-.04-.86-.18-1.32-.3-1.63a2.7 2.7 0 0 0-.66-1.01 2.7 2.7 0 0 0-1.01-.66c-.31-.12-.77-.26-1.63-.3C14.96 4.01 14.65 4 12 4zm0 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 1.8a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4zm5.4-3.5a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1z" />
    ),
  },
];

export default function Footer({ dict }: FooterProps) {
  const year = new Date().getFullYear();

  const links = [
    { href: '/', label: dict.nav.home },
    { href: '/about-hearing-impairment', label: dict.nav.about },
    { href: '/micro-suction', label: dict.nav.microSuction },
    { href: '/types-of-hearing-aids', label: dict.nav.hearingAids },
    { href: '/contact', label: dict.nav.contact },
    { href: '/referrals', label: dict.nav.referrals },
    { href: '/book-appointment', label: dict.nav.bookAppointment },
  ];

  function openCookieSettings() {
    window.dispatchEvent(new CustomEvent('wb-open-cookie-settings'));
  }

  return (
    <footer className="bg-bark text-linen">
      <SoundwaveDivider className="text-clay-light/60" />
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h2 className="font-display text-lg font-semibold text-linen">{dict.meta.siteName}</h2>
            <p className="mt-2 max-w-xs text-sm text-sand-dark/80">{dict.footer.tagline}</p>
          </div>

          <div>
            <h3 className="font-display text-base font-semibold text-clay-light">{dict.footer.quickLinks}</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sand-dark/90 hover:text-linen">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base font-semibold text-clay-light">{dict.footer.getInTouch}</h3>
            <address className="mt-3 space-y-1 text-sm not-italic text-sand-dark/90">
              <p>{dict.contact.name}</p>
              <p>{dict.contact.address}</p>
              <p>{dict.contact.phone}</p>
              <p>
                <a href={`mailto:${dict.contact.email}`} className="hover:text-linen">
                  {dict.footer.emailMe}
                </a>
              </p>
            </address>

            <h3 className="mt-6 font-display text-base font-semibold text-clay-light">{dict.footer.followUs}</h3>
            <div className="mt-3 flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  style={social.style}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-opacity hover:opacity-80"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-sage-700 pt-6 text-xs text-sand-dark/70 sm:flex-row">
          <p>
            © {year} {dict.contact.name} — {dict.footer.rights}
          </p>
          <button
            type="button"
            onClick={openCookieSettings}
            className="underline-offset-2 hover:text-linen hover:underline"
          >
            {dict.footer.privacy}
          </button>
        </div>
      </div>
    </footer>
  );
}
