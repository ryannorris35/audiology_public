import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getDictionary } from '@/lib/i18n/getDictionary';

export const metadata: Metadata = {
  title: 'Audiologist Swansea | Ear Wax Removal & Hearing Aids',
  description:
    'Huw Latimer is a registered hearing care practitioner based in Swansea. Offering micro-suction ear wax removal, hearing assessments and hearing aid fittings. Book online today.',
  alternates: { canonical: '/' },
  openGraph: { title: 'Huw Latimer Hearing Care Swansea', url: '/' },
};
import SoundwaveDivider from '@/components/SoundwaveDivider';
import SocialCards from '@/components/SocialCards';

export default async function HomePage() {
  const dict = await getDictionary();
  const { home } = dict;

  return (
    <>
      {/* Hero */}
      <section className="bg-sage-600 text-linen">
        <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="font-body text-sm font-semibold uppercase tracking-widest text-black">
              {home.heroEyebrow}
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              {home.heroTitle}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-black">{home.heroSubtitle}</p>
            <Link
              href="/book-appointment"
              className="mt-8 inline-block rounded-full bg-[#191B1D] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#2a2d33]"
            >
              {home.heroCta}
            </Link>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
            <Image
              src="https://picsum.photos/seed/huwlatimeraudiology-hero/800/600"
              alt=""
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <SoundwaveDivider className="bg-linen text-sage-400 py-2" />

      {/* Intro */}
      <section className="bg-linen">
        <div className="mx-auto max-w-content px-4 py-14 text-center sm:px-6">
          <h2 className="font-display text-3xl font-semibold text-bark">{home.introTitle}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-bark-light">{home.introBody}</p>
        </div>
      </section>

      {/* Services */}
      <section className="bg-sand">
        <div className="mx-auto max-w-content px-4 py-14 sm:px-6">
          <h2 className="font-display text-3xl font-semibold text-bark text-center">{home.servicesTitle}</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {home.services.map((service) => (
              <div key={service.title} className="rounded-xl border border-sand-dark bg-linen p-6">
                <h3 className="font-display text-xl font-semibold text-bark-light">{service.title}</h3>
                <p className="mt-2 text-sm text-bark-light">{service.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social */}
      <section className="bg-linen">
        <div className="mx-auto max-w-content px-4 py-14 sm:px-6">
          <div className="text-center">
            <h2 className="font-display text-3xl font-semibold text-bark">{home.socialTitle}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-bark-light">{home.socialSubtitle}</p>
          </div>
          <div className="mt-10">
            <SocialCards dict={dict} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sage-700 text-linen">
        <div className="mx-auto max-w-content px-4 py-14 text-center sm:px-6">
          <h2 className="font-display text-3xl font-semibold">{home.ctaTitle}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-black">{home.ctaBody}</p>
          <Link
            href="/book-appointment"
            className="mt-8 inline-block rounded-full bg-clay px-6 py-3 text-base font-semibold text-linen transition-colors hover:bg-clay-dark"
          >
            {dict.common.bookNow}
          </Link>
        </div>
      </section>
    </>
  );
}
