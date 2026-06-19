import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/mongodb';
import Booking from '@/lib/models/Booking';
import { sendBookingConfirmation, buildGoogleCalendarUrl } from '@/lib/email';

const bookingSchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  dob: z.string().trim().optional().or(z.literal('')),
  email: z.string().trim().email().max(254),
  phone: z
    .string()
    .trim()
    .min(7)
    .max(20)
    .regex(/^[+()\d\s-]+$/),
  postcode: z.string().trim().max(20).optional().or(z.literal('')),
  reason: z.string().trim().min(1).max(200),
  locale: z.string().trim().max(5).optional(),
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed.', issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;

  try {
    await connectToDatabase();

    const booking = await Booking.create({
      firstName: data.firstName,
      lastName: data.lastName,
      dob: data.dob || undefined,
      email: data.email,
      phone: data.phone,
      postcode: data.postcode || undefined,
      reason: data.reason,
      locale: data.locale || 'en',
    });

    const calendarUrl = buildGoogleCalendarUrl(data.reason);

    const emailResult = await sendBookingConfirmation({
      to: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      reason: data.reason,
      calendarUrl,
    });

    return NextResponse.json({
      success: true,
      bookingId: booking.id,
      calendarUrl,
      emailSent: emailResult.sent,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'We could not save your booking. Please try again later.' },
      { status: 500 }
    );
  }
}
