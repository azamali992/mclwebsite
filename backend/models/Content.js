import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      required: true,
      enum: ['hero', 'about', 'products', 'services', 'careers', 'infrastructure', 'footer', 'navbar', 'contact', 'stats', 'divisions'],
    },
    key: {
      type: String,
      required: true,
    },
    title: String,
    description: String,
    text: String,
    image: {
      url: String,
      filename: String,
    },
    link: String,
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    metadata: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

contentSchema.index({ section: 1, key: 1 }, { unique: true });

export default mongoose.model('Content', contentSchema);
