import mongoose from 'mongoose';

// TODO(security, Medium, deferred Phase 6): this schema has no length caps
// or format constraints of its own — the route-level email regex and any
// body-size limit are the only gates on what reaches this collection. Fix:
// add `maxlength` to each field (e.g. name/subject ~200, message ~5000) and
// a `match` validator on email, matching the pattern already used in
// careerController's EMAIL_REGEX. Deferred because the real-world impact is
// low (helmet + the 20mb global body limit + formLimiter rate-limiting
// already bound the practical damage) and adding validators that are too
// strict risks rejecting legitimate submissions without a chance to tune
// them against real traffic first.
const contactSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  email:   { type: String, required: true },
  phone:   { type: String, default: '' },
  subject: { type: String, default: '' },
  message: { type: String, required: true },
  isRead:  { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Contact', contactSchema);
