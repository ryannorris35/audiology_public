/**
 * Quick standalone check that the database is reachable and that the
 * Booking and VisitorLog models work as expected.
 *
 * Usage:
 *   1. Make sure MongoDB is running (e.g. `docker compose up -d`)
 *   2. Make sure MONGODB_URI is set in .env.local
 *   3. Run: npm run db:test
 *
 * This script creates a temporary booking, reads it back, then deletes it
 * again — it does not leave any test data behind. It also increments and
 * then restores the visitor counter so the real total is unaffected.
 */

import { config } from 'dotenv';
import path from 'path';

// Load .env.local the same way Next.js would, since this script runs outside
// of the Next.js process.
config({ path: path.resolve(__dirname, '../.env.local') });

import mongoose from 'mongoose';
import { connectToDatabase } from '../lib/mongodb';
import Booking from '../lib/models/Booking';
import VisitorLog from '../lib/models/VisitorLog';

async function main() {
  console.log('Connecting to MongoDB...');
  console.log(`  MONGODB_URI: ${process.env.MONGODB_URI || '(not set)'}`);
  console.log(`  MONGODB_DB_NAME: ${process.env.MONGODB_DB_NAME || 'willowbrook_hearing (default)'}`);

  await connectToDatabase();
  console.log('✔ Connected.\n');

  // --- Booking model ---------------------------------------------------
  console.log('Creating a test booking...');
  const testBooking = await Booking.create({
    firstName: 'Test',
    lastName: 'Patient',
    email: 'test-patient@example.com',
    phone: '+44 7700 900000',
    postcode: 'AB1 2CD',
    reason: 'General hearing checkup',
    locale: 'en',
  });
  console.log(`✔ Created booking with id ${testBooking.id}\n`);

  console.log('Reading it back...');
  const found = await Booking.findById(testBooking.id);
  if (!found) throw new Error('Could not read back the test booking.');
  console.log(`✔ Found booking for ${found.firstName} ${found.lastName} (${found.email})\n`);

  console.log('Deleting the test booking...');
  await Booking.findByIdAndDelete(testBooking.id);
  const afterDelete = await Booking.findById(testBooking.id);
  if (afterDelete) throw new Error('Test booking was not deleted.');
  console.log('✔ Deleted.\n');

  // --- VisitorLog model --------------------------------------------------
  console.log('Checking the visitor counter...');
  const before = await VisitorLog.findOne({ key: 'site_total' });
  const beforeCount = before?.count ?? 0;
  console.log(`  Current count: ${beforeCount}`);

  await VisitorLog.findOneAndUpdate(
    { key: 'site_total' },
    { $inc: { count: 1 }, $set: { lastVisitAt: new Date() } },
    { upsert: true }
  );
  const afterIncrement = await VisitorLog.findOne({ key: 'site_total' });
  console.log(`✔ Incremented to: ${afterIncrement?.count}`);

  // Restore the original count so this test run doesn't skew real numbers.
  await VisitorLog.findOneAndUpdate({ key: 'site_total' }, { $set: { count: beforeCount } });
  console.log(`✔ Restored count to: ${beforeCount}\n`);

  console.log('All checks passed! Your database connection and models are working.');
}

main()
  .catch((err) => {
    console.error('\n✘ Database test failed:');
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });