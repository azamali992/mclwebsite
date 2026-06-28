import dotenv from 'dotenv';
import connectDB from './config/db.js';
import app from './app.js';
import { warmUpIndex } from './utils/rag.js';

dotenv.config();

const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET', 'ADMIN_EMAIL', 'ADMIN_PASSWORD'];
const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);
if (missingEnvVars.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  warmUpIndex();
});
