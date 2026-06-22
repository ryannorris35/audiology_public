import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/mongodb';
import VisitorLog from '@/lib/models/VisitorLog';
import { getVisitorSessionModel } from '@/lib/models/VisitorSession';

const fullSchema = z.object({
  consentLevel: z.literal('full'),
  page: z.string().max(500),
  referrer: z.string().max(500).optional(),
  screenWidth: z.number().int().positive().optional(),
  screenHeight: z.number().int().positive().optional(),
  viewportWidth: z.number().int().positive().optional(),
  viewportHeight: z.number().int().positive().optional(),
  language: z.string().max(20).optional(),
  timezone: z.string().max(100).optional(),
  sessionId: z.string().max(64).optional(),
});

const anonymousSchema = z.object({
  consentLevel: z.literal('anonymous'),
  page: z.string().max(500),
  referrerDomain: z.string().max(200).optional(),
});

const bodySchema = z.discriminatedUnion('consentLevel', [fullSchema, anonymousSchema]);

function parseUserAgent(ua: string) {
  const browserPatterns: [RegExp, string][] = [
    [/Edg\/([\d.]+)/, 'Edge'],
    [/OPR\/([\d.]+)/, 'Opera'],
    [/Chrome\/([\d.]+)/, 'Chrome'],
    [/Firefox\/([\d.]+)/, 'Firefox'],
    [/Safari\/([\d.]+)/, 'Safari'],
  ];

  let browserName = 'Other';
  let browserVersion = '';
  for (const [regex, name] of browserPatterns) {
    const match = ua.match(regex);
    if (match) {
      browserName = name;
      browserVersion = match[1]?.split('.')[0] ?? '';
      break;
    }
  }

  const osPatterns: [RegExp, string][] = [
    [/Windows NT/, 'Windows'],
    [/Mac OS X/, 'macOS'],
    [/Android/, 'Android'],
    [/iPhone|iPad|iPod/, 'iOS'],
    [/Linux/, 'Linux'],
  ];

  let os = 'Unknown';
  for (const [regex, name] of osPatterns) {
    if (regex.test(ua)) { os = name; break; }
  }

  const isMobile = /Mobile|Android|iPhone|iPod/.test(ua);
  const isTablet = /iPad|Tablet/.test(ua);
  const deviceCategory = isTablet ? 'tablet' : isMobile ? 'mobile' : 'desktop';

  const browserFamily =
    browserName === 'Chrome' || browserName === 'Edge' || browserName === 'Opera' ? 'Chromium' :
    browserName === 'Firefox' ? 'Firefox' :
    browserName === 'Safari' ? 'Safari' : 'Other';

  return { browserName, browserVersion, os, deviceCategory, browserFamily } as const;
}

function truncateIp(ip: string): string {
  // Remove last octet from IPv4, last group from IPv6 — stores region not identity.
  if (ip.includes(':')) return ip.split(':').slice(0, -1).join(':') + ':xxxx';
  const parts = ip.split('.');
  if (parts.length === 4) return `${parts[0]}.${parts[1]}.${parts[2]}.xxx`;
  return 'unknown';
}

function getIp(req: NextRequest): string {
  return (
    req.headers.get('cf-connecting-ip') ||
    req.headers.get('x-real-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  );
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const data = parsed.data;
  const ua = request.headers.get('user-agent') ?? '';
  const now = new Date();
  const { browserName, browserVersion, os, deviceCategory, browserFamily } = parseUserAgent(ua);

  try {
    const [VisitorSession] = await Promise.all([
      getVisitorSessionModel(),
      connectToDatabase(),
    ]);

    // Always increment the site-wide counter.
    await VisitorLog.findOneAndUpdate(
      { key: 'site_total' },
      { $inc: { count: 1 }, $set: { lastVisitAt: now } },
      { upsert: true }
    );

    if (data.consentLevel === 'full') {
      const ip = getIp(request);
      const country = request.headers.get('cf-ipcountry') ?? undefined;
      const referrerDomain = data.referrer
        ? (() => { try { return new URL(data.referrer).hostname; } catch { return undefined; } })()
        : undefined;

      await VisitorSession.create({
        consentLevel: 'full',
        page: data.page,
        deviceCategory,
        browserFamily,
        dayOfWeek: now.getUTCDay(),
        hourOfDay: now.getUTCHours(),
        referrerDomain,
        referrer: data.referrer,
        userAgent: ua,
        browserName,
        browserVersion,
        os,
        screenWidth: data.screenWidth,
        screenHeight: data.screenHeight,
        viewportWidth: data.viewportWidth,
        viewportHeight: data.viewportHeight,
        language: data.language,
        timezone: data.timezone,
        ipTruncated: ip !== 'unknown' ? truncateIp(ip) : undefined,
        country,
        sessionId: data.sessionId,
        createdAt: now,
      });
    } else {
      // Anonymous — no IP, no user agent, no session ID stored.
      await VisitorSession.create({
        consentLevel: 'anonymous',
        page: data.page,
        deviceCategory,
        browserFamily,
        dayOfWeek: now.getUTCDay(),
        hourOfDay: now.getUTCHours(),
        referrerDomain: data.referrerDomain,
        createdAt: now,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Visitor tracking error:', error);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
