import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';
import Content from '../models/Content.js';

dotenv.config();

const initializeDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Create default admin user
    console.log('Creating admin user...');
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('⚠️ Admin user already exists');
    } else {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      const admin = new Admin({
        email: adminEmail,
        password: hashedPassword,
        name: 'Administrator',
        role: 'super_admin',
        isActive: true,
      });
      await admin.save();
      console.log('✅ Admin user created successfully');
      console.log(`   Email: ${adminEmail}`);
      console.log(`   Password: ${adminPassword}`);
    }

    // Create sample content
    console.log('Creating sample content...');
    const sampleContent = [
      {
        section: 'hero',
        key: 'main_title',
        title: 'Main Title',
        description: 'Welcome to MCL',
        text: 'MCL - Your Business Partner for Solutions',
        isActive: true,
      },
      {
        section: 'hero',
        key: 'subtitle',
        title: 'Subtitle',
        description: 'Hero Subtitle',
        text: 'Innovative solutions for your business needs',
        isActive: true,
      },
      {
        section: 'about',
        key: 'company_overview',
        title: 'About Us',
        description: 'Company Overview',
        text: 'MCL is a leading provider of business solutions...',
        isActive: true,
      },
    ];

    for (const content of sampleContent) {
      const existing = await Content.findOne({
        section: content.section,
        key: content.key,
      });
      if (!existing) {
        const newContent = new Content(content);
        await newContent.save();
        console.log(`✅ Created content: ${content.section}/${content.key}`);
      }
    }

    console.log('\n✅ Database initialization completed!');
    console.log('\n📝 Next Steps:');
    console.log(`1. Go to http://localhost:5173/admin`);
    console.log(`2. Login with email: ${adminEmail}`);
    console.log(`3. Login with password: ${adminPassword}`);
    console.log('4. Start managing your content!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
};

initializeDatabase();
