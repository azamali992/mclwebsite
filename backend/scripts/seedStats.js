import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

import Stat from '../models/Stat.js';
import { STATS_LIST } from '../../src/data/stats.js';

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    let count = 0;
    for (const item of STATS_LIST) {
      const existing = await Stat.findOne({ key: item.key });
      if (!existing) {
        await Stat.create({ ...item, isActive: true });
        count++;
      }
    }
    console.log(`Stats: ${count} new items seeded (${STATS_LIST.length - count} already existed and were left untouched)`);

    process.exit(0);
  } catch (error) {
    console.error('Stats seeding error:', error);
    process.exit(1);
  }
}

seed();
