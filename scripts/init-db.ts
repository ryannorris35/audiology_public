/**
 * Initialises both MongoDB databases (huwlatimeraudiology_hearing and
 * huwlatimeraudiology_analytics) by creating their collections and indexes.
 * MongoDB creates databases automatically on first write, so running this
 * script is enough to bring them into existence in Atlas.
 *
 * Usage:
 *   npx tsx scripts/init-db.ts
 */

import { config } from 'dotenv';
import path from 'path';

config({ path: path.resolve(__dirname, '../.env.local') });

import mongoose from 'mongoose';
import { connectToDatabase, connectToAnalyticsDatabase } from '../lib/mongodb';
import Booking from '../lib/models/Booking';
import VisitorLog from '../lib/models/VisitorLog';
import Referral from '../lib/models/Referral';
import { getVisitorSessionModel } from '../lib/models/VisitorSession';

async function main() {
  console.log('\n── Initialising HuwLatimerAudiology databases ──\n');

  // ── huwlatimeraudiology_hearing ───────────────────────────────────────────
  console.log(`Connecting to: ${process.env.MONGODB_DB_NAME || 'huwlatimeraudiology_hearing'}`);
  await connectToDatabase();
  console.log('✔ Connected.\n');

  // Bookings collection + indexes
  console.log('Setting up bookings collection...');
  await Booking.createCollection();
  await Booking.syncIndexes();
  const bookingCount = await Booking.countDocuments();
  console.log(`✔ bookings — ${bookingCount} document(s)\n`);

  // Referrals collection + indexes
  console.log('Setting up referrals collection...');
  await Referral.createCollection();
  await Referral.syncIndexes();
  const referralCount = await Referral.countDocuments();
  console.log(`✔ referrals — ${referralCount} document(s)\n`);

  // VisitorLog — seed the counter document if it doesn't exist yet
  console.log('Setting up visitorlogs collection...');
  await VisitorLog.createCollection();
  await VisitorLog.findOneAndUpdate(
    { key: 'site_total' },
    { $setOnInsert: { key: 'site_total', count: 0, lastVisitAt: new Date() } },
    { upsert: true }
  );
  const log = await VisitorLog.findOne({ key: 'site_total' });
  console.log(`✔ visitorlogs — site_total counter: ${log?.count ?? 0}\n`);

  // ── huwlatimeraudiology_analytics ─────────────────────────────────────────
  console.log(`Connecting to: ${process.env.MONGODB_ANALYTICS_DB_NAME || 'huwlatimeraudiology_analytics'}`);
  const analyticsConn = await connectToAnalyticsDatabase();
  console.log('✔ Connected.\n');

  // VisitorSessions collection + indexes
  console.log('Setting up visitorsessions collection...');
  const VisitorSession = await getVisitorSessionModel();
  await VisitorSession.createCollection();

  // Index on consentLevel for fast filtering of full vs anonymous records
  await analyticsConn.collection('visitorsessions').createIndex({ consentLevel: 1 });
  // Index on createdAt for time-range queries
  await analyticsConn.collection('visitorsessions').createIndex({ createdAt: -1 });
  // Compound index useful for audience analysis
  await analyticsConn.collection('visitorsessions').createIndex({ country: 1, createdAt: -1 });

  const sessionCount = await VisitorSession.countDocuments();
  console.log(`✔ visitorsessions — ${sessionCount} document(s)\n`);

  console.log('── All done ──────────────────────────────────────────────────\n');
  console.log('Both databases are ready in your Atlas cluster.');
  console.log('They will appear in Browse Collections within a few seconds.\n');
}

main()
  .catch((err) => {
    console.error('\n✘ Initialisation failed:');
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
    process.exit();
  });
