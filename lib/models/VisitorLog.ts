import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * A single document tracks the all-time visit count. It is written to by
 * the /api/visitor route only, is never exposed to the frontend, and is not
 * linked to any personal data.
 */
export interface IVisitorLog extends Document {
  key: string;
  count: number;
  lastVisitAt: Date;
}

const VisitorLogSchema = new Schema<IVisitorLog>({
  key: { type: String, required: true, unique: true, default: 'site_total' },
  count: { type: Number, default: 0 },
  lastVisitAt: { type: Date, default: Date.now },
});

const VisitorLog: Model<IVisitorLog> =
  mongoose.models.VisitorLog || mongoose.model<IVisitorLog>('VisitorLog', VisitorLogSchema);

export default VisitorLog;
