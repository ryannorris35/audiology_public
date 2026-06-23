import type { Metadata } from 'next';
import Image from 'next/image';
import { getDictionary } from '@/lib/i18n/getDictionary';
import SoundwaveDivider from '@/components/SoundwaveDivider';
import ClinicLocations from '@/components/ClinicLocations';

export const metadata: Metadata = {
  title: 'Contact | Audiologist Swansea',
  description:
    'Contact Huw Latimer Hearing Care in Swansea. Book a micro-suction ear wax removal, hearing assessment or hearing aid appointment.',
  alternates: { canonical: '/contact' },
  openGraph: { title: 'Contact Huw Latimer | Audiologist Swansea', url: '/contact' },
};


export default async function ContactPage() {
  const dict = await getDictionary();
  const { contact } = dict;

  return (
    <>
      <section className="bg-sage-600 text-linen">
        <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[280px_1fr]">
          <div className="relative mx-auto aspect-square w-48 overflow-hidden rounded-full border-4 border-linen sm:w-56 lg:mx-0">
            <Image
              src="/images/huw-robert-latimer.jpg"
              alt={contact.name}
              fill
              className="object-cover object-center"
              sizes="224px"
              unoptimized
            />
          </div>
          <div className="text-center lg:text-left">
            <h1 className="font-display text-4xl font-semibold">{contact.name}</h1>
            <p className="mt-1 text-lg text-clay-light">{contact.role}</p>
          </div>
        </div>
      </section>

      <SoundwaveDivider className="bg-linen text-sage-400 py-2" />

      <section className="bg-linen">
        <div className="mx-auto max-w-content px-4 py-14 sm:px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr]">
            <div>
              <h2 className="font-display text-2xl font-semibold text-bark">{contact.aboutMeTitle}</h2>
              <div className="mt-3 space-y-4 text-sm text-bark-light">
                {contact.aboutMeBody.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              <h2 className="mt-10 font-display text-2xl font-semibold text-bark">{contact.qualificationsTitle}</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-bark-light">
                {contact.qualifications.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>

              <h2 className="mt-10 font-display text-2xl font-semibold text-bark">{contact.workplaceTitle}</h2>
              <div className="mt-3 space-y-4 text-sm text-bark-light">
                {contact.workplaceBody.map((paragraph, i) => (
                  <p key={i}>
                    {paragraph.includes('Viney Hearing Care website') ? (
                      <>
                        {paragraph.split('Viney Hearing Care website')[0]}
                        <a
                          href="https://www.vineyhearingcare.co.uk/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold hover:opacity-80"
                          style={{ color: '#1877F2' }}
                        >
                          Viney Hearing Care website
                        </a>
                        {paragraph.split('Viney Hearing Care website')[1]}
                      </>
                    ) : (
                      paragraph
                    )}
                  </p>
                ))}
              </div>

              <ClinicLocations />
            </div>

            <aside className="rounded-xl border border-sand-dark bg-sand p-6">
              <h2 className="font-display text-lg font-semibold text-bark">{contact.detailsTitle}</h2>
              <dl className="mt-4 space-y-3 text-sm text-bark-light">
                <div>
                  <dt className="font-semibold text-bark">{dict.booking.fields.email}</dt>
                  <dd>
                    <a href={`mailto:${contact.email}`} className="text-bark hover:text-clay-dark break-all">
                      {contact.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-bark">{dict.booking.fields.phone}</dt>
                  <dd>
                    <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="text-bark hover:text-clay-dark">
                      {contact.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-bark">Primary Clinic</dt>
                  <dd className="leading-relaxed">{contact.address}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
