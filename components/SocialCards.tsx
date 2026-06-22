import { Dictionary } from '@/lib/i18n/types';

interface SocialCardsProps {
  dict: Dictionary;
}

/**
 * Displays "like count" style cards for the practice's social media
 * profiles. The figures below are placeholders — once real API keys/access
 * tokens for each platform are available (see .env.example), replace
 * SOCIAL_STATS with data fetched from the relevant Graph API / API and
 * cache it (e.g. revalidate every hour) rather than calling on every request.
 */
const SOCIAL_STATS = [
  {
    name: 'Facebook',
    handle: 'Huw Latimer Audiology',
    likes: 482,
    href: 'https://www.facebook.com/profile.php?id=61590933583878',
    color: 'bg-[#1877F2]',
  },
  {
    name: 'Instagram',
    handle: '@huwlatimeraudiologist',
    likes: 311,
    href: 'https://www.instagram.com/huwlatimeraudiologist/',
    color: 'bg-[#E1306C]',
  },
  {
    name: 'LinkedIn',
    handle: 'Huw Latimer Hearing Care',
    likes: 128,
    href: 'https://www.linkedin.com/in/huw-latimer-125821418/',
    color: 'bg-[#0A66C2]',
  },
];

export default function SocialCards({ dict }: SocialCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {SOCIAL_STATS.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-xl border border-sand-dark bg-linen p-5 transition-shadow hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className={`rounded-full ${social.color} px-3 py-1 text-xs font-semibold text-linen`}>
              {social.name}
            </span>
            <span className="text-xs text-bark-light">{dict.common.visit} →</span>
          </div>
          <p className="mt-4 font-display text-2xl font-semibold text-bark">
            {social.likes.toLocaleString()}{' '}
            <span className="text-base font-normal text-bark-light">{dict.common.likes}</span>
          </p>
          <p className="mt-1 text-sm text-bark-light">{social.handle}</p>
        </a>
      ))}
    </div>
  );
}
