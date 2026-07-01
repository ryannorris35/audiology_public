import type { Metadata } from 'next';
import { getDictionary, getCurrentLocale } from '@/lib/i18n/getDictionary';
import { blueprintBookingUrl } from '@/lib/utm';
import BookingForm from '@/components/BookingForm';
import SoundwaveDivider from '@/components/SoundwaveDivider';

export const metadata: Metadata = {
  title: 'Book a Hearing Appointment Swansea',
  description:
    'Book your hearing care appointment online in minutes. Micro-suction ear wax removal, hearing assessments and hearing aid fittings in Swansea.',
  alternates: { canonical: '/book-appointment' },
  openGraph: { title: 'Book a Hearing Appointment | Huw Latimer Swansea', url: '/book-appointment' },
};

export default async function BookAppointmentPage() {
  const dict = await getDictionary();
  const locale = await getCurrentLocale();
  const { booking } = dict;

  // When BLUEPRINT_BOOKING_URL is set, redirect patients directly to Blueprint
  // with UTM parameters so the source is tracked in analytics.
  const blueprintUrl = blueprintBookingUrl('book-appointment-page');

  return (
    <>
      <section className="bg-sage-600 text-linen">
        <div className="mx-auto max-w-content px-4 py-14 sm:px-6">
          <h1 className="font-display text-4xl font-semibold">{booking.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-black">{booking.intro}</p>
          <p className="mt-2 max-w-2xl text-sm text-clay-light">{booking.clinicNotice}</p>
        </div>
      </section>

      <SoundwaveDivider className="bg-linen text-sage-400 py-2" />

      <section className="bg-linen">
        <div className="mx-auto max-w-content px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-3xl">
            {blueprintUrl ? (
              <div className="text-center">
                <p className="mb-8 text-sm text-bark-light">{booking.clinicNotice}</p>
                <a
                  href={blueprintUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-lg bg-sage-600 px-8 py-4 font-semibold text-linen shadow hover:bg-sage-700 transition-colors"
                >
                  Book your appointment
                </a>
              </div>
            ) : (
              <>
                <p className="mb-6 text-sm text-black">{booking.requiredHint}</p>
                <BookingForm dict={dict} locale={locale} />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
