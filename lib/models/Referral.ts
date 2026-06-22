import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReferral extends Document {
  referrerFirstName: string;
  referrerLastName: string;
  referrerEmail: string;
  referrerPhone?: string;
  patientName: string;
  status: 'pending' | 'attended' | 'rewarded' | 'cancelled';
  createdAt: Date;
}

const ReferralSchema = new Schema<IReferral>({
  referrerFirstName: { type: String, required: true, trim: true, maxlength: 100 },
  referrerLastName: { type: String, required: true, trim: true, maxlength: 100 },
  referrerEmail: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
  referrerPhone: { type: String, trim: true, maxlength: 30 },
  patientName: { type: String, required: true, trim: true, maxlength: 200 },
  status: {
    type: String,
    enum: ['pending', 'attended', 'rewarded', 'cancelled'],
    default: 'pending',
  },
  createdAt: { type: Date, default: Date.now },
});

const Referral: Model<IReferral> =
  mongoose.models.Referral || mongoose.model<IReferral>('Referral', ReferralSchema);

export default Referral;
