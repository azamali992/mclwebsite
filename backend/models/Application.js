import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  jobId:      { type: mongoose.Schema.Types.ObjectId, ref: 'Career', required: true },
  fullname:   { type: String, required: true },
  email:      { type: String, required: true },
  phone:      { type: String, default: '' },
  experience: { type: String, default: '' },
  message:    { type: String, default: '' },
  resume: {
    url: String,
    filename: String,
  },
  status: {
    type: String,
    enum: ['new', 'reviewed', 'rejected', 'hired'],
    default: 'new',
  },
}, { timestamps: true });

export default mongoose.model('Application', applicationSchema);
