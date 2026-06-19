import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import VisitorLog from '@/lib/models/VisitorLog';

/**
 * Increments a single, invisible site-wide visitor counter. This is not
 * displayed anywhere on the site and is not linked to any personal data.
 * No email alerts are sent — totals can be checked directly in MongoDB
 * (collection "visitorlogs", document key "site_total") if ever needed.
 */
export async function POST() {
  try {
    await connectToDatabase();

    await VisitorLog.findOneAndUpdate(
      { key: 'site_total' },
      { $inc: { count: 1 }, $set: { lastVisitAt: new Date() } },
      { upsert: true }
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    // Visitor tracking should never break the site for the user.
    // eslint-disable-next-line no-console
    console.error('Visitor log error:', error);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
