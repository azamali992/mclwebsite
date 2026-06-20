import mongoose from 'mongoose';

const careerSchema = new mongoose.Schema(
  {
    position: {
      type: String,
      required: true,
    },
    description: String,
    department: String,
    location: String,
    requirements: [String],
    responsibilities: [String],
    salary: String,
    type: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
      default: 'Full-time',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Career', careerSchema);
