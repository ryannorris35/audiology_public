'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dictionary } from '@/lib/i18n/types';
import { LocaleCode } from '@/lib/i18n/config';
import LanguageSwitcher from './LanguageSwitcher';

interface NavbarProps {
  dict: Dictionary;
  locale: LocaleCode;
}

const NAV_OPEN_KEY = 'wb_nav_open';

export default function Navbar({ dict, locale }: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Restore the collapse state so it persists across page navigations.
  useEffect(() => {
    const stored = window.localStorage.getItem(NAV_OPEN_KEY);
    setOpen(stored === 'true');
    setHydrated(true);
  }, []);

  function toggleOpen() {
    const next = !open;
    setOpen(next);
    window.localStorage.setItem(NAV_OPEN_KEY, String(next));
  }

  function closeMenu() {
    setOpen(false);
    window.localStorage.setItem(NAV_OPEN_KEY, 'false');
  }

  const links = [
    { href: '/', label: dict.nav.home },
    { href: '/about-hearing-impairment', label: dict.nav.about },
    { href: '/micro-suction', label: dict.nav.microSuction },
    { href: '/types-of-hearing-aids', label: dict.nav.hearingAids },
    { href: '/contact', label: dict.nav.contact },
    { href: '/referrals', label: dict.nav.referrals },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-sage-600 text-bark shadow-sm" style={{ height: 'var(--nav-height)' }}>
      <div className="mx-auto flex h-full max-w-content items-start px-4 pt-2 sm:px-6 lg:items-center lg:pt-0">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight text-bark mr-auto pr-8 lg:pr-12" onClick={closeMenu}>
          {dict.meta.siteName}
        </Link>

        {/* Desktop navigation */}
        <nav aria-label={dict.nav.menu} className="hidden items-baseline lg:flex">
          {links.map((link, index) => {
            const active = pathname === link.href;
            const marginLeft =
              index === 0 ? 'ml-0' :
              index === 1 ? 'ml-8' :
              index === 2 ? 'ml-2' :
              index === 5 ? 'ml-[21px]' :
              'ml-4';
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body text-sm transition-colors hover:text-clay-light ${marginLeft} ${
                  active ? 'border-b-2 border-clay text-bark' : 'text-bark'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="ml-12"><LanguageSwitcher currentLocale={locale} label={dict.nav.language} /></div>
          <Link
            href="/book-appointment"
            className="ml-12 rounded-full bg-[#191B1D] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2a2d33]"
          >
            {dict.nav.bookAppointment}
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={toggleOpen}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className={`flex flex-col items-center justify-center gap-1.5 rounded-md p-2 lg:hidden ${
            hydrated && !open ? 'animate-gentle-flash' : ''
          }`}
        >
          <span className="sr-only">{dict.nav.menu}</span>
          <span className={`block h-0.5 w-6 bg-bark transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-6 bg-bark transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-bark transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={`absolute left-0 right-0 top-full origin-top bg-sage-600 shadow-md transition-all lg:hidden ${
          open ? 'max-h-[28rem] opacity-100' : 'max-h-0 overflow-hidden opacity-0'
        }`}
      >
        <nav aria-label={dict.nav.menu} className="flex flex-col gap-1 px-4 py-3">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`rounded-md px-3 py-2 text-base ${
                  active ? 'bg-sage-700 text-bark' : 'text-bark hover:bg-sage-700'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/book-appointment"
            onClick={closeMenu}
            className="mt-2 rounded-full bg-[#191B1D] px-4 py-2 text-center text-base font-semibold text-white hover:bg-[#2a2d33]"
          >
            {dict.nav.bookAppointment}
          </Link>
          <div className="mt-3 border-t border-sage-500 pt-3">
            <LanguageSwitcher currentLocale={locale} label={dict.nav.language} />
          </div>
        </nav>
      </div>
    </header>
  );
}
