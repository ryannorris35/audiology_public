import { test, expect } from '@playwright/test';

// Mirror the regexes used in BookingForm and ReferralForm
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+()\d\s-]{7,20}$/;

test.describe('Email validation', () => {
  const validEmails = [
    'user@example.com',
    'user.name+tag@domain.co.uk',
    'huw.latimer.audiologist@gmail.com',
    'test@test.org',
  ];

  const invalidEmails = [
    'not-an-email',
    '@nodomain.com',
    'missingat.com',
    '',
    '   ',
    'two@@ats.com',
  ];

  for (const email of validEmails) {
    test(`"${email}" is valid`, () => {
      expect(EMAIL_REGEX.test(email)).toBe(true);
    });
  }

  for (const email of invalidEmails) {
    test(`"${email}" is invalid`, () => {
      expect(EMAIL_REGEX.test(email)).toBe(false);
    });
  }
});

test.describe('Phone validation', () => {
  const validPhones = [
    '+44 7700 900123',
    '07700900123',
    '+1 (555) 123-4567',
    '01792 123456',
    '+44-1234-567890',
  ];

  const invalidPhones = [
    'abc',
    '123',         // too short
    'call me',
    '!@#$%^',
    '+44 7700 900123 extension 12345678', // too long
  ];

  for (const phone of validPhones) {
    test(`"${phone}" is valid`, () => {
      expect(PHONE_REGEX.test(phone)).toBe(true);
    });
  }

  for (const phone of invalidPhones) {
    test(`"${phone}" is invalid`, () => {
      expect(PHONE_REGEX.test(phone)).toBe(false);
    });
  }
});

test.describe('IP truncation logic', () => {
  function truncateIp(ip: string): string {
    if (ip.includes(':')) return ip.split(':').slice(0, -1).join(':') + ':xxxx';
    const parts = ip.split('.');
    if (parts.length === 4) return `${parts[0]}.${parts[1]}.${parts[2]}.xxx`;
    return 'unknown';
  }

  test('IPv4 last octet is replaced with xxx', () => {
    expect(truncateIp('192.168.1.100')).toBe('192.168.1.xxx');
    expect(truncateIp('82.34.12.200')).toBe('82.34.12.xxx');
  });

  test('IPv6 last group is replaced', () => {
    expect(truncateIp('2001:db8:85a3:0:0:8a2e:370:7334')).toContain(':xxxx');
    expect(truncateIp('2001:db8:85a3:0:0:8a2e:370:7334')).not.toContain('7334');
  });

  test('unknown IP returns unknown', () => {
    expect(truncateIp('not-an-ip')).toBe('unknown');
  });
});

test.describe('User agent parsing', () => {
  function parseUserAgent(ua: string) {
    const browserPatterns: [RegExp, string][] = [
      [/Edg\/([\d.]+)/, 'Edge'],
      [/OPR\/([\d.]+)/, 'Opera'],
      [/Chrome\/([\d.]+)/, 'Chrome'],
      [/Firefox\/([\d.]+)/, 'Firefox'],
      [/Safari\/([\d.]+)/, 'Safari'],
    ];
    let browserName = 'Other';
    for (const [regex, name] of browserPatterns) {
      if (regex.test(ua)) { browserName = name; break; }
    }
    const isMobile = /Mobile|Android|iPhone|iPod/.test(ua);
    const isTablet = /iPad|Tablet/.test(ua);
    const deviceCategory = isTablet ? 'tablet' : isMobile ? 'mobile' : 'desktop';
    return { browserName, deviceCategory };
  }

  test('Chrome desktop UA is detected', () => {
    const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36';
    const { browserName, deviceCategory } = parseUserAgent(ua);
    expect(browserName).toBe('Chrome');
    expect(deviceCategory).toBe('desktop');
  });

  test('Firefox UA is detected', () => {
    const ua = 'Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0';
    expect(parseUserAgent(ua).browserName).toBe('Firefox');
  });

  test('Safari iOS mobile UA is detected as mobile', () => {
    const ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1';
    const { deviceCategory } = parseUserAgent(ua);
    expect(deviceCategory).toBe('mobile');
  });

  test('iPad UA is detected as tablet', () => {
    const ua = 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1';
    expect(parseUserAgent(ua).deviceCategory).toBe('tablet');
  });

  test('Edge UA is detected correctly (not as Chrome)', () => {
    const ua = 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0';
    expect(parseUserAgent(ua).browserName).toBe('Edge');
  });
});
