export interface UtmParams {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
}

export function buildUtmUrl(baseUrl: string, params: UtmParams): string {
  const url = new URL(baseUrl);
  if (params.source) url.searchParams.set('utm_source', params.source);
  if (params.medium) url.searchParams.set('utm_medium', params.medium);
  if (params.campaign) url.searchParams.set('utm_campaign', params.campaign);
  if (params.content) url.searchParams.set('utm_content', params.content);
  if (params.term) url.searchParams.set('utm_term', params.term);
  return url.toString();
}

const SITE_DOMAIN =
  process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL).hostname
    : 'huwlatimerhearingcare.co.uk';

export function blueprintBookingUrl(content = 'book-appointment-page'): string | null {
  const base = process.env.BLUEPRINT_BOOKING_URL;
  if (!base) return null;
  return buildUtmUrl(base, {
    source: SITE_DOMAIN,
    medium: 'website',
    campaign: 'online-booking',
    content,
  });
}
