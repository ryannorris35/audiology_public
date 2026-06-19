import { getDictionary, getCurrentLocale } from '@/lib/i18n/getDictionary';
import BookingForm from '@/components/BookingForm';
import SoundwaveDivider from '@/components/SoundwaveDivider';

export default async function BookAppointmentPage() {
  const dict = await getDictionary();
  const locale = await getCurrentLocale();
  const { booking } = dict;

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
            <p className="mb-6 text-sm text-black">{booking.requiredHint}</p>
            <BookingForm dict={dict} locale={locale} />
          </div>
        </div>
      </section>
    </>
  );
}
