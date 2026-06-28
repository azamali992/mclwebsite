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

// getAllCareers (careerController.js) and the chatbot's getLiveCareersContext
// (chatController.js) both filter by {isActive: true} on every request to
// two different public-facing surfaces.
careerSchema.index({ isActive: 1, createdAt: -1 });

export default mongoose.model('Career', careerSchema);
