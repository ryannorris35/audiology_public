import { Schema } from 'mongoose';
import { connectToAnalyticsDatabase } from '@/lib/mongodb';

export interface IVisitorSession {
  consentLevel: 'full' | 'anonymous';
  page: string;
  // Always collected (anonymous-safe)
  deviceCategory: 'mobile' | 'tablet' | 'desktop' | 'unknown';
  browserFamily: string;
  dayOfWeek: number;
  hourOfDay: number;
  referrerDomain?: string;
  // Full-consent fields only
  referrer?: string;
  userAgent?: string;
  browserName?: string;
  browserVersion?: string;
  os?: string;
  screenWidth?: number;
  screenHeight?: number;
  viewportWidth?: number;
  viewportHeight?: number;
  language?: string;
  timezone?: string;
  ipTruncated?: string;
  country?: string;
  sessionId?: string;
  createdAt: Date;
}

const VisitorSessionSchema = new Schema<IVisitorSession>({
  consentLevel: { type: String, enum: ['full', 'anonymous'], required: true },
  page: { type: String, required: true, maxlength: 500 },
  deviceCategory: { type: String, enum: ['mobile', 'tablet', 'desktop', 'unknown'], required: true },
  browserFamily: { type: String, required: true, maxlength: 50 },
  dayOfWeek: { type: Number, required: true },
  hourOfDay: { type: Number, required: true },
  referrerDomain: { type: String, maxlength: 200 },
  referrer: { type: String, maxlength: 500 },
  userAgent: { type: String, maxlength: 500 },
  browserName: { type: String, maxlength: 100 },
  browserVersion: { type: String, maxlength: 50 },
  os: { type: String, maxlength: 100 },
  screenWidth: { type: Number },
  screenHeight: { type: Number },
  viewportWidth: { type: Number },
  viewportHeight: { type: Number },
  language: { type: String, maxlength: 20 },
  timezone: { type: String, maxlength: 100 },
  ipTruncated: { type: String, maxlength: 50 },
  country: { type: String, maxlength: 100 },
  sessionId: { type: String, maxlength: 64 },
  createdAt: { type: Date, default: Date.now },
});

// Model is registered on the analytics connection, not the default connection.
export async function getVisitorSessionModel() {
  const conn = await connectToAnalyticsDatabase();
  return conn.models.VisitorSession ||
    conn.model<IVisitorSession>('VisitorSession', VisitorSessionSchema);
}
