import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/mongodb';
import Referral from '@/lib/models/Referral';
import { sendReferralNotification, sendReferralConfirmation } from '@/lib/email';

const referralSchema = z.object({
  referrerFirstName: z.string().trim().min(1).max(100),
  referrerLastName: z.string().trim().min(1).max(100),
  referrerEmail: z.string().trim().email().max(254),
  referrerPhone: z.union([
    z.string().trim().regex(/^[+()\d\s-]{7,20}$/).max(30),
    z.literal(''),
  ]).optional(),
  patientName: z.string().trim().min(1).max(200),
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = referralSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed.', issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;

  try {
    await connectToDatabase();

    const referral = await Referral.create({
      referrerFirstName: data.referrerFirstName,
      referrerLastName: data.referrerLastName,
      referrerEmail: data.referrerEmail,
      referrerPhone: data.referrerPhone || undefined,
      patientName: data.patientName,
    });

    // Send practitioner notification and referrer confirmation in parallel.
    // Future: also POST to Blueprint Solutions API once credentials are provisioned.
    await Promise.all([
      sendReferralNotification(data),
      sendReferralConfirmation(data),
    ]);

    return NextResponse.json({ success: true, referralId: referral.id });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Referral error:', error);
    return NextResponse.json(
      { error: 'We could not save your referral. Please try again later.' },
      { status: 500 }
    );
  }
}
