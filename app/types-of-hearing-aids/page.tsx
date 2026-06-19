import Image from 'next/image';
import { getDictionary } from '@/lib/i18n/getDictionary';
import SoundwaveDivider from '@/components/SoundwaveDivider';

export default async function TypesOfHearingAidsPage() {
  const dict = await getDictionary();
  const { hearingAids } = dict;

  return (
    <>
      <section className="bg-sage-600 text-linen">
        <div className="mx-auto max-w-content px-4 py-14 sm:px-6">
          <h1 className="font-display text-4xl font-semibold">{hearingAids.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-bark">{hearingAids.intro}</p>
        </div>
      </section>

      <SoundwaveDivider className="bg-linen text-sage-400 py-2" />

      <section className="bg-linen">
        <div className="mx-auto max-w-content px-4 py-14 sm:px-6">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {hearingAids.types.map((type, index) => (
              <div key={type.name} className="overflow-hidden rounded-xl border border-sand-dark bg-sand">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={`https://picsum.photos/seed/hearing-aid-${index}/600/450`}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-bark-light">{type.name}</h3>
                  <p className="mt-2 text-sm text-bark-light">{type.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
