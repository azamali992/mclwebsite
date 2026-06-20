import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';

dotenv.config();

const run = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in backend/.env');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await Admin.findOneAndUpdate(
    { email },
    { email, password: hashedPassword, name: 'Administrator', role: 'super_admin', isActive: true },
    { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
  );

  console.log(`Admin password set for ${admin.email}`);
  process.exit(0);
};

run().catch((error) => {
  console.error('Failed to reset admin password:', error.message);
  process.exit(1);
});
