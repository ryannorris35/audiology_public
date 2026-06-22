import mongoose, { Connection } from 'mongoose';

declare global {
  // eslint-disable-next-line no-var
  var _mongooseConn: Promise<typeof mongoose> | undefined;
  // eslint-disable-next-line no-var
  var _mongooseAnalyticsConn: Connection | undefined;
  // eslint-disable-next-line no-var
  var _mongooseAnalyticsConnPromise: Promise<Connection> | undefined;
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
      dbName: process.env.MONGODB_DB_NAME || 'huwlatimeraudiology_hearing',
    });
  }

  return global._mongooseConn;
}

export async function connectToAnalyticsDatabase(): Promise<Connection> {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not set. Add it to your .env.local file — see .env.example.');
  }

  if (global._mongooseAnalyticsConn) return global._mongooseAnalyticsConn;

  if (!global._mongooseAnalyticsConnPromise) {
    global._mongooseAnalyticsConnPromise = mongoose
      .createConnection(MONGODB_URI, {
        dbName: process.env.MONGODB_ANALYTICS_DB_NAME || 'huwlatimeraudiology_analytics',
      })
      .asPromise();
  }

  global._mongooseAnalyticsConn = await global._mongooseAnalyticsConnPromise;
  return global._mongooseAnalyticsConn;
}
