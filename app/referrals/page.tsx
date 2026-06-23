import type { Metadata } from 'next';
import Image from 'next/image';
import { getDictionary } from '@/lib/i18n/getDictionary';

export const metadata: Metadata = {
  title: 'Refer a Friend & Earn £30 | Hearing Care Swansea',
  description:
    'Know someone who needs hearing care in Swansea? Refer them to Huw Latimer Hearing Care and earn £30 for every successful appointment. No limit on referrals.',
  alternates: { canonical: '/referrals' },
  openGraph: { title: 'Referral Programme — Earn £30 | Huw Latimer Hearing Care', url: '/referrals' },
};
import SoundwaveDivider from '@/components/SoundwaveDivider';
import ReferralForm from '@/components/ReferralForm';

export default async function ReferralsPage() {
  const dict = await getDictionary();
  const { referral } = dict;

  return (
    <>
      {/* Hero */}
      <section className="bg-sage-600 text-linen">
        <div className="mx-auto max-w-content px-4 py-14 sm:px-6">
          <span className="inline-block rounded-full bg-clay px-4 py-1 text-sm font-semibold text-linen">
            {referral.rewardBadge}
          </span>
          <h1 className="mt-4 font-display text-4xl font-semibold">{referral.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-black">{referral.heroSubtitle}</p>
        </div>
      </section>

      <SoundwaveDivider className="bg-linen text-sage-400 py-2" />

      {/* About */}
      <section className="bg-linen">
        <div className="mx-auto max-w-content px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl font-semibold text-bark">{referral.aboutTitle}</h2>
            <p className="mt-4 text-base text-bark-light">{referral.aboutBody}</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-sand">
        <div className="mx-auto max-w-content px-4 py-14 sm:px-6">
          <h2 className="font-display text-3xl font-semibold text-bark text-center">{referral.howTitle}</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {referral.steps.map((step) => (
              <div key={step.heading} className="rounded-xl border border-sand-dark bg-linen p-6">
                <h3 className="font-display text-lg font-semibold text-sage-700">{step.heading}</h3>
                <p className="mt-2 text-sm text-bark-light">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image + Form */}
      <section className="bg-linen">
        <div className="mx-auto max-w-content px-4 py-14 sm:px-6">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/referral-friends.jpg"
                alt="Two friends sharing good news about hearing care"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                unoptimized
              />
            </div>
            <div>
              <h2 className="font-display text-3xl font-semibold text-bark">{referral.formTitle}</h2>
              <p className="mb-6 mt-3 text-sm text-black">{referral.requiredHint}</p>
              <ReferralForm dict={dict} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
