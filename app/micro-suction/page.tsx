import Image from 'next/image';
import { getDictionary } from '@/lib/i18n/getDictionary';
import SoundwaveDivider from '@/components/SoundwaveDivider';

export default async function MicroSuctionPage() {
  const dict = await getDictionary();
  const { microSuction } = dict;

  return (
    <>
      <section className="bg-sage-600 text-linen">
        <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2">
          <div>
            <h1 className="font-display text-4xl font-semibold">{microSuction.title}</h1>
            <p className="mt-4 max-w-xl text-lg text-black">{microSuction.intro}</p>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
            <Image
              src="https://picsum.photos/seed/micro-suction-procedure/800/600"
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <SoundwaveDivider className="bg-linen text-sage-400 py-2" />

      {/* What to expect */}
      <section className="bg-linen">
        <div className="mx-auto max-w-content px-4 py-14 sm:px-6">
          <h2 className="font-display text-2xl font-semibold text-bark">{microSuction.expectTitle}</h2>
          <div className="mt-8 space-y-6">
            {microSuction.steps.map((step) => (
              <div key={step.title} className="rounded-xl border border-sand-dark bg-sand p-6">
                <h3 className="font-display text-lg font-semibold text-bark-light">{step.title}</h3>
                <p className="mt-2 text-sm text-bark-light">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aftercare */}
      <section className="bg-sand">
        <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl lg:order-2">
            <Image
              src="https://picsum.photos/seed/micro-suction-aftercare/800/600"
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="lg:order-1">
            <h2 className="font-display text-2xl font-semibold text-bark">{microSuction.aftercareTitle}</h2>
            <p className="mt-3 text-sm text-bark-light">{microSuction.aftercare}</p>
          </div>
        </div>
      </section>

      {/* Reassurance */}
      <section className="bg-linen">
        <div className="mx-auto max-w-content px-4 py-14 sm:px-6">
          <div className="rounded-2xl border-l-4 border-clay bg-sand p-6">
            <p className="text-base text-bark">{microSuction.reassurance}</p>
          </div>
        </div>
      </section>
    </>
  );
}
