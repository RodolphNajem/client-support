import mongoose, { Schema, Document } from 'mongoose';

export interface IComplaint extends Document {
  title: string;
  body: string;
  categories: string[]; // Assuming category IDs or names are stored as strings
  status: 'PENDING' | 'INPROGRESS' | 'RESOLVED' | 'REJECTED';
}

const ComplaintSchema: Schema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  categories: [{ type: String, required: true }],
  status: { type: String, enum: ['PENDING', 'INPROGRESS', 'RESOLVED', 'REJECTED'], default: 'PENDING' }
});

export default mongoose.model<IComplaint>('Complaint', ComplaintSchema);
