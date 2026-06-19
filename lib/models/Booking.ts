import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBooking extends Document {
  firstName: string;
  lastName: string;
  dob?: string;
  email: string;
  phone: string;
  postcode?: string;
  reason: string;
  locale: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>({
  firstName: { type: String, required: true, trim: true, maxlength: 100 },
  lastName: { type: String, required: true, trim: true, maxlength: 100 },
  dob: { type: String, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
  phone: { type: String, required: true, trim: true, maxlength: 30 },
  postcode: { type: String, trim: true, maxlength: 20 },
  reason: { type: String, required: true, trim: true, maxlength: 200 },
  locale: { type: String, default: 'en', maxlength: 5 },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  },
  createdAt: { type: Date, default: Date.now },
});

// Avoids "Cannot overwrite model" errors when Next.js hot-reloads in dev.
const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
