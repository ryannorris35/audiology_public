import mongoose from 'mongoose';

declare global {
  // eslint-disable-next-line no-var
  var _mongooseConn: Promise<typeof mongoose> | undefined;
}

/**
 * Connects to MongoDB, reusing the connection across hot reloads and
 * serverless invocations. Throws a clear error if MONGODB_URI is missing so
 * the API routes can return a helpful message instead of a generic crash.
 */
export async function connectToDatabase(): Promise<typeof mongoose> {
  const MONGODB_URI = process.env.MONGODB_URI;
  
  if (!MONGODB_URI) {
    throw new Error(
      'MONGODB_URI is not set. Add it to your .env.local file — see .env.example.'
    );
  }

  if (!global._mongooseConn) {
    global._mongooseConn = mongoose.connect(MONGODB_URI, {
      dbName: process.env.MONGODB_DB_NAME || 'willowbrook_hearing',
    });
  }

  return global._mongooseConn;
}
