import mongoose from 'mongoose';

const statSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    value: {
      type: String,
      required: true,
    },
    label: String,
    subtitle: String,
    group: {
      type: String,
      enum: ['company', 'infrastructure', 'mgps', 'company_info'],
      default: 'company',
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// getAllStats (statController.js) filters/sorts by {group, order} on every
// public, unauthenticated request — index the leading filter field.
statSchema.index({ group: 1, order: 1 });

export default mongoose.model('Stat', statSchema);
