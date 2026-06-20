import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

import Admin from '../models/Admin.js';
import Content from '../models/Content.js';
import Product from '../models/Product.js';
import Career from '../models/Career.js';

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // 1. Create admin if not exists
    const existingAdmin = await Admin.findOne({ email: 'admin@mcl.com' });
    if (!existingAdmin) {
      const hashed = await bcrypt.hash('admin123', 10);
      await Admin.create({
        email: 'admin@mcl.com',
        password: hashed,
        name: 'Administrator',
        role: 'super_admin',
        isActive: true,
      });
      console.log('Admin created: admin@mcl.com / admin123');
    } else {
      console.log('Admin already exists');
    }

    // 2. Seed Content
    const contentSeed = [

      // ---- Hero ----
      { section: 'hero', key: 'slide-1-title', title: 'Leading the Way in Industrial Chemical Manufacturing', description: 'Hero slide 1 title', order: 1, isActive: true },
      { section: 'hero', key: 'slide-1-subtitle', title: 'Providing high-quality chemical solutions, advanced healthcare engineering, and sustainable industrial infrastructure globally.', description: 'Hero slide 1 subtitle', order: 2, isActive: true },
      { section: 'hero', key: 'slide-1-image', title: 'hero01.JPG', description: 'Hero slide 1 background image', order: 3, isActive: true },
      { section: 'hero', key: 'slide-2-title', title: 'Innovating Healthcare Engineering Solutions', description: 'Hero slide 2 title', order: 4, isActive: true },
      { section: 'hero', key: 'slide-2-subtitle', title: 'Equipping medical environments with state-of-the-art infrastructure and high-purity specialized chemicals.', description: 'Hero slide 2 subtitle', order: 5, isActive: true },
      { section: 'hero', key: 'slide-2-image', title: 'hero02.JPG', description: 'Hero slide 2 background image', order: 6, isActive: true },

      // ---- Stats ----
      { section: 'stats', key: 'stat-1', title: '40+', description: 'YEARS OF', text: 'EXCELLENCE', order: 1, isActive: true },
      { section: 'stats', key: 'stat-2', title: '125 TPD', description: 'OXYGEN PLANT', text: 'CAPACITY', order: 2, isActive: true },
      { section: 'stats', key: 'stat-3', title: '87000+', description: 'CYLINDERS', text: 'CAPACITY', order: 3, isActive: true },
      { section: 'stats', key: 'stat-4', title: '65+', description: 'TRUCKS IN', text: 'OUR FLEET', order: 4, isActive: true },
      { section: 'stats', key: 'stat-5', title: '35+', description: 'FILLING STATIONS', text: 'NATIONWIDE', order: 5, isActive: true },
      { section: 'stats', key: 'stat-6', title: '1000+', description: 'SATISFIED', text: 'CLIENTS', order: 6, isActive: true },

      // ---- Business Divisions ----
      { section: 'divisions', key: 'div-1', title: 'Industrial Gases', description: 'Complete range of industrial gases for diverse applications across industries.', order: 1, isActive: true },
      { section: 'divisions', key: 'div-2', title: 'Medical Gases', description: 'High purity medical gases ensuring safety, reliability & patient care.', order: 2, isActive: true },
      { section: 'divisions', key: 'div-3', title: 'MGPS Solutions', description: 'Design, supply, installation & maintenance of Medical Gas Pipeline Systems.', order: 3, isActive: true },
      { section: 'divisions', key: 'div-4', title: 'Biomedical Engineering', description: 'Modular OT, hospital infrastructure & biomedical engineering solutions.', order: 4, isActive: true },
      { section: 'divisions', key: 'div-5', title: 'Specialty Gases', description: 'Special & calibration gases for research, laboratories & precision applications.', order: 5, isActive: true },
      { section: 'divisions', key: 'div-6', title: 'LPG Division', description: 'Safe, efficient & reliable LPG supply for domestic & commercial needs.', order: 6, isActive: true },

      // ---- About Section 1 ----
      { section: 'about', key: 'section1-heading', title: 'About MCL', order: 1, isActive: true },
      { section: 'about', key: 'section1-title', title: 'Leader in Quality.<br />Driven by Innovation.', order: 2, isActive: true },
      { section: 'about', key: 'section1-description', title: 'Established in 1980, Multan Chemicals Limited (MCL) has grown to become Pakistan\'s most trusted name in industrial and medical gases. With state-of-the-art production facilities, a modern fleet and a strong distribution network, we deliver reliability, safety and excellence to every industry and every life we touch.', order: 3, isActive: true },
      { section: 'about', key: 'section1-image', title: 'About section image', description: 'hero02.JPG', order: 4, isActive: true },
      { section: 'about', key: 'feature-1', title: 'ISO Certified', description: 'Quality Management Systems', order: 5, isActive: true },
      { section: 'about', key: 'feature-2', title: 'Advanced Technology', description: 'Modern Plants & Equipment', order: 6, isActive: true },
      { section: 'about', key: 'feature-3', title: 'Safety First', description: 'Highest Safety Standards', order: 7, isActive: true },
      { section: 'about', key: 'feature-4', title: 'Nationwide Network', description: 'Extensive Reach Across Pakistan', order: 8, isActive: true },

      // ---- About Section 2 ----
      { section: 'about', key: 'section2-heading', title: 'Nationwide Network', order: 9, isActive: true },
      { section: 'about', key: 'section2-title', title: 'Reaching Every Corner of Pakistan', order: 10, isActive: true },
      { section: 'about', key: 'network-feature-1', title: '20+ Company Owned', description: 'Filling Stations', order: 11, isActive: true },
      { section: 'about', key: 'network-feature-2', title: '30+ Distributors', description: 'Across Pakistan', order: 12, isActive: true },
      { section: 'about', key: 'network-feature-3', title: 'Strategic Warehouses', description: 'For Timely Delivery', order: 13, isActive: true },
      { section: 'about', key: 'network-feature-4', title: 'Modern Fleet', description: 'For Safe & Reliable Supply', order: 14, isActive: true },

      // ---- About Section 3 ----
      { section: 'about', key: 'section3-heading', title: 'Industries We Serve', order: 15, isActive: true },
      { section: 'about', key: 'section3-title', title: 'Empowering Industries. Enriching Lives.', order: 16, isActive: true },
      { section: 'about', key: 'clients-heading', title: 'Trusted by Leading Organizations', order: 17, isActive: true },
      { section: 'about', key: 'certifications-heading', title: 'Certifications & Compliance', order: 18, isActive: true },
      { section: 'about', key: 'certifications-title', title: 'Quality. Safety. Responsibility.', order: 19, isActive: true },

      // ---- MGPS Solutions ----
      { section: 'services', key: 'mgps-heading', title: 'MGPS Solutions', order: 1, isActive: true },
      { section: 'services', key: 'mgps-title', title: 'Complete Medical Gas Pipeline Solutions', order: 2, isActive: true },
      { section: 'services', key: 'mgps-description', title: 'We provide end-to-end Medical Gas Pipeline Systems (MGPS) designed to international standards (HTM 02-01, NFPA 99, ISO 7396-1) ensuring safety, efficiency and reliability.', order: 3, isActive: true },
      { section: 'services', key: 'mgps-check-1', title: 'Central Gas Supply Systems', order: 4, isActive: true },
      { section: 'services', key: 'mgps-check-2', title: 'ICU, CCU & Operation Theatre Solutions', order: 5, isActive: true },
      { section: 'services', key: 'mgps-check-3', title: 'Bed Head Units & Pendants', order: 6, isActive: true },
      { section: 'services', key: 'mgps-check-4', title: 'Alarm & Monitoring Systems', order: 7, isActive: true },
      { section: 'services', key: 'mgps-check-5', title: 'Medical Vacuum Systems', order: 8, isActive: true },
      { section: 'services', key: 'mgps-check-6', title: 'Installation, Testing & Maintenance', order: 9, isActive: true },
      { section: 'services', key: 'mgps-feature-1', title: 'International Standards', description: 'HTM 02 / NFPA 99', order: 10, isActive: true },
      { section: 'services', key: 'mgps-feature-2', title: 'Turnkey Projects', description: 'End-to-End Solutions', order: 11, isActive: true },
      { section: 'services', key: 'mgps-feature-3', title: '24/7 Support', description: 'Maintenance & Service', order: 12, isActive: true },
      { section: 'services', key: 'mgps-feature-4', title: 'Trained Engineers', description: 'Expert Workforce', order: 13, isActive: true },

      // ---- Infrastructure ----
      { section: 'infrastructure', key: 'hero-heading', title: 'OUR INFRASTRUCTURE', order: 1, isActive: true },
      { section: 'infrastructure', key: 'hero-title', title: 'Nationwide Filling Stations For Uninterrupted Supply', order: 2, isActive: true },
      { section: 'infrastructure', key: 'hero-description', title: 'MCL operates 35+ company owned filling stations across Pakistan to ensure availability, safety and reliable distribution of medical and industrial gases.', order: 3, isActive: true },

      { section: 'infrastructure', key: 'stat-1', title: '35+', description: 'Filling Stations', text: 'Nationwide', order: 4, isActive: true },
      { section: 'infrastructure', key: 'stat-2', title: '100%', description: 'Nationwide', text: 'Coverage', order: 5, isActive: true },
      { section: 'infrastructure', key: 'stat-3', title: 'Safety First', description: 'Strict Safety', text: 'Protocols', order: 6, isActive: true },
      { section: 'infrastructure', key: 'stat-4', title: '24/7', description: 'Reliable Supply', text: 'Network', order: 7, isActive: true },
      { section: 'infrastructure', key: 'stat-5', title: 'Expert Team', description: 'Trained & Certified', text: 'Professionals', order: 8, isActive: true },

      { section: 'infrastructure', key: 'stations-heading', title: 'OUR FILLING STATIONS ACROSS PAKISTAN', order: 9, isActive: true },
      { section: 'infrastructure', key: 'plants-heading', title: 'OUR PRODUCTION PLANTS', order: 10, isActive: true },
      { section: 'infrastructure', key: 'plants-title', title: 'Built for Capacity. Engineered for Excellence.', order: 11, isActive: true },
      { section: 'infrastructure', key: 'plants-description', title: 'State-of-the-art production facilities with advanced technology ensure consistent quality, high purity and uninterrupted supply.', order: 12, isActive: true },

      { section: 'infrastructure', key: 'oxygen-heading', title: 'OXYGEN FILLING STATIONS', order: 13, isActive: true },
      { section: 'infrastructure', key: 'oxygen-title', title: 'Safe. Precise. Reliable.', order: 14, isActive: true },
      { section: 'infrastructure', key: 'oxygen-description', title: 'Our oxygen filling stations are equipped with advanced filling manifolds, precision controls and safety systems to deliver high purity oxygen for medical and industrial applications.', order: 15, isActive: true },
      { section: 'infrastructure', key: 'oxygen-check-1', title: 'High pressure cylinder filling up to 200 Bar', order: 16, isActive: true },
      { section: 'infrastructure', key: 'oxygen-check-2', title: 'Automatic filling manifolds', order: 17, isActive: true },
      { section: 'infrastructure', key: 'oxygen-check-3', title: 'Online purity & pressure monitoring', order: 18, isActive: true },
      { section: 'infrastructure', key: 'oxygen-check-4', title: 'Strict safety & quality control', order: 19, isActive: true },
      { section: 'infrastructure', key: 'oxygen-check-5', title: 'Trained and certified operators', order: 20, isActive: true },

      { section: 'infrastructure', key: 'logistics-heading', title: 'LOGISTICS & DISTRIBUTION', order: 21, isActive: true },
      { section: 'infrastructure', key: 'logistics-title', title: 'Strong Fleet. On-Time Delivery.', order: 22, isActive: true },
      { section: 'infrastructure', key: 'logistics-description', title: 'Our modern fleet of tankers and cylinder delivery vehicles ensures safe and timely delivery of gases to every corner of Pakistan.', order: 23, isActive: true },
      { section: 'infrastructure', key: 'logistics-stat-1', title: '65+', description: 'Delivery Trucks', order: 24, isActive: true },
      { section: 'infrastructure', key: 'logistics-stat-2', title: '20+', description: 'Tanker Trucks', order: 25, isActive: true },
      { section: 'infrastructure', key: 'logistics-stat-3', title: '100+', description: 'Dedicated Staff', order: 26, isActive: true },
      { section: 'infrastructure', key: 'logistics-stat-4', title: 'Real-time', description: 'Tracking System', order: 27, isActive: true },

      { section: 'infrastructure', key: 'quality-heading', title: 'QUALITY ASSURANCE', order: 28, isActive: true },
      { section: 'infrastructure', key: 'quality-title', title: 'Quality You Can Trust.', order: 29, isActive: true },
      { section: 'infrastructure', key: 'quality-description', title: 'We follow international standards and strict quality control at every step to ensure safety and reliability.', order: 30, isActive: true },

      // ---- Footer ----
      { section: 'footer', key: 'company-description', title: 'Powering industry and healthcare with advanced gas technologies, engineering excellence and unwavering commitment to safety and quality.', order: 1, isActive: true },
      { section: 'footer', key: 'address', title: 'Multan A-C, Industrial Estate Multan - Pakistan', order: 2, isActive: true },
      { section: 'footer', key: 'phone', title: '061-6510200-6', order: 3, isActive: true },
      { section: 'footer', key: 'email', title: 'info@mcl-gases.com', order: 4, isActive: true },
      { section: 'footer', key: 'website', title: 'www.mcl-gases.com', order: 5, isActive: true },
      { section: 'footer', key: 'newsletter-text', title: 'Stay updated with our latest news and updates.', order: 6, isActive: true },
      { section: 'footer', key: 'copyright', title: '© 2024 Multan Chemicals Limited. All Rights Reserved.', order: 7, isActive: true },

      // ---- Contact ----
      { section: 'contact', key: 'address', title: 'Multan A-C, Industrial Estate, Multan - Pakistan', order: 1, isActive: true },
      { section: 'contact', key: 'phone', title: '061-6510200-6', order: 2, isActive: true },
      { section: 'contact', key: 'email', title: 'info@mcl-gases.com', order: 3, isActive: true },
      { section: 'contact', key: 'hours', title: 'Mon – Sat: 8:00 AM – 6:00 PM', order: 4, isActive: true },

      // ---- Navbar ----
      { section: 'navbar', key: 'company-name', title: 'Multan', description: 'Chemicals Limited', order: 1, isActive: true },

      // ---- Products Page ----
      { section: 'products', key: 'page-hero-title', title: 'Advanced Healthcare Equipment & Systems', order: 1, isActive: true },
      { section: 'products', key: 'page-hero-description', title: 'Multan Chemicals Limited provides comprehensive healthcare solutions including Medical Gas Pipeline Systems, Modular Operation Theatres, diagnostic imaging, critical care systems, and specialized therapeutic equipment.', order: 2, isActive: true },

      // ---- Careers Page ----
      { section: 'careers', key: 'hero-title', title: 'Join Our Growing Team', order: 1, isActive: true },
      { section: 'careers', key: 'hero-description', title: 'Discover exciting career opportunities and be part of Pakistan\'s leading chemical and gas solutions company. Grow with us and make an impact.', order: 2, isActive: true },

      // ---- MGPS Page ----
      { section: 'services', key: 'mgps-hero-heading', title: 'MGPS SOLUTIONS', order: 14, isActive: true },
      { section: 'services', key: 'mgps-hero-title', title: 'Complete Medical Gas Pipeline Solutions', order: 15, isActive: true },
      { section: 'services', key: 'mgps-hero-desc', title: 'We design, supply, install, test and commission complete Medical Gas Pipeline Systems in accordance with HTM 02-01, NFPA 99, ISO 7396-1 and other international standards.', order: 16, isActive: true },
      { section: 'services', key: 'mgps-overview-heading', title: 'MGPS OVERVIEW', order: 17, isActive: true },
      { section: 'services', key: 'mgps-overview-title', title: 'Safe. Reliable. Life-Supporting.', order: 18, isActive: true },
      { section: 'services', key: 'mgps-overview-desc', title: 'Our engineering team delivers end-to-end medical gas pipeline solutions with uncompromising safety. From design and supply through installation, testing and commissioning, every system we build meets the highest international standards for patient safety and operational reliability.', order: 19, isActive: true },
      { section: 'services', key: 'mgps-compliance-heading', title: 'COMPLIANCE & STANDARDS', order: 20, isActive: true },
      { section: 'services', key: 'mgps-compliance-title', title: 'Built To International Standards', order: 21, isActive: true },
      { section: 'services', key: 'mgps-projects-heading', title: 'OUR MGPS PROJECTS', order: 22, isActive: true },
      { section: 'services', key: 'mgps-projects-title', title: 'Delivering Excellence Across Pakistan', order: 23, isActive: true },
    ];

    let contentCount = 0;
    for (const item of contentSeed) {
      const existing = await Content.findOne({ section: item.section, key: item.key });
      if (!existing) {
        await Content.create(item);
        contentCount++;
      }
    }
    console.log(`Content: ${contentCount} new items seeded`);

    // 3. Seed Products
    const productSeed = [
      { name: 'Medical Gas Cylinders & Bulk Storage', description: 'High-pressure and bulk liquid storage systems', category: 'mgps', features: ['Multiple sizes for different hospital needs', 'Compressed and liquefied gas forms available', 'High-grade certified materials', 'Safe and efficient storage solutions', 'Compatible with all medical gases'], order: 1 },
      { name: 'Medical Gas Manifolds', description: 'Advanced manifold systems for gas distribution', category: 'mgps', features: ['NFPA, ISO, and HTM compliant design', 'Equipped with regulators and valves', 'Automatic changeover capability', 'Multiple gas compatibility', 'Tested for safety and reliability'], order: 2 },
      { name: 'Medical Air Compressor Plants', description: 'Integrated compressed air systems', category: 'mgps', features: ['Factory-assembled and pre-tested', 'Pre-piped and pre-wired configuration', 'Multiple compressor combinations', 'Suitable for high-demand environments', 'Efficient centralized hospital supply'], order: 3 },
      { name: 'Anesthetic Gas Scavenging (AGSS)', description: 'Safe waste anesthetic gas removal', category: 'mgps', features: ['Protects healthcare professionals', 'Engineered safety standards', 'Efficient gas capture and removal', 'Operating room compliant', 'Reduces environmental impact'], order: 4 },
      { name: 'Oxygen Generation Plants', description: 'On-site oxygen generation systems', category: 'mgps', features: ['Independent oxygen supply generation', 'Reduces cylinder delivery dependency', 'Continuous availability during peak demand', 'Cost-effective long-term solution', 'PSA technology based systems'], order: 5 },
      { name: 'Alarm & Safety Monitoring', description: 'Master and area alarm systems', category: 'mgps', features: ['Real-time visual and audible alerts', 'Centralized monitoring capability', 'Area-specific pressure monitoring', 'Up to 6 different gas monitoring', 'Immediate corrective action alerts'], order: 6 },

      { name: 'Medical Gas Outlets', description: 'Safe point-of-use access to medical gases', category: 'terminals', features: ['Standardized connections', 'Quick connect/disconnect capability', 'Leak-free and secure design', 'Color-coded for safety', 'Multiple gas outlet options'], order: 7 },
      { name: 'Bed Head Units (BHUs)', description: 'Integrated patient-care systems', category: 'terminals', features: ['Combined gas outlets and power sockets', 'Communication and data ports', 'Optimized workflow design', 'Patient bedside installation', 'Improved accessibility for staff'], order: 8 },
      { name: 'Zone Valve Boxes', description: 'Flexible gas supply control', category: 'terminals', features: ['Surface-mounted or flush-mounted', 'Easy isolation during maintenance', 'Emergency shut-off capability', 'Zone-specific control', 'Durable and reliable construction'], order: 9 },

      { name: 'Vacuum Regulators', description: 'Pressure control for suction systems', category: 'delivery', features: ['Safe suction pressure levels', 'Stable vacuum control', 'Clinical precision', 'Medical procedure compliance'], order: 10 },
      { name: 'Air Venturi Systems', description: 'Controlled airflow generation', category: 'delivery', features: ['Respiratory therapy support', 'No external power needed', 'Precise air regulation', 'Medical applications'], order: 11 },
      { name: 'Air Flow Meters', description: 'Medical gas flow measurement', category: 'delivery', features: ['Accurate flow rate measurement', 'Precise dosage control', 'Safe patient administration', 'Clinical monitoring'], order: 12 },
      { name: 'Entonox Delivery Kits', description: 'Oxygen-nitrous oxide delivery', category: 'delivery', features: ['Pain management applications', 'Emergency use capability', 'Obstetric procedures', 'Specialized system design'], order: 13 },
      { name: 'Suction Machines', description: 'Fluid and secretion removal', category: 'delivery', features: ['Portable and fixed configurations', 'Surgical procedure support', 'Emergency care capability', 'Airway management'], order: 14 },
      { name: 'Oxygen Concentrators', description: 'Ambient air oxygen extraction', category: 'delivery', features: ['Medical-grade purity output', 'Cost-effective operation', 'Continuous supply capability', 'Low-resource settings'], order: 15 },

      { name: 'Wall & Ceiling System', description: 'Modular structural framework', category: 'modular', features: ['Steel or tempered glass panels', 'Anti-microbial protective coating', 'Rounded corners for hygiene', 'Epoxy-sealed joints', 'Integrated air duct provisions'], order: 16 },
      { name: 'Surgical Lighting System', description: 'High-intensity LED surgical lights', category: 'modular', features: ['Exceeds 1300 Lux illumination', 'Shadow-free lighting', 'Adjustable positioning', 'Precision surgical procedures', 'Energy-efficient operation'], order: 17 },
      { name: 'Medical Pendants', description: 'Flexible ceiling-mounted systems', category: 'modular', features: ['Medical gas outlets', 'Electrical power supply', 'Data and communication ports', 'Equipment shelves and storage', 'Adjustable height positioning'], order: 18 },
      { name: 'OT Control Panel', description: 'Centralized operation theatre control', category: 'modular', features: ['Medical gas monitoring', 'HVAC and ventilation control', 'Lighting system management', 'Equipment and system alarms', 'Environmental monitoring'], order: 19 },
      { name: 'Medical Grade Power System', description: 'IT power supply for critical environments', category: 'modular', features: ['Medical-grade isolation transformer', 'Automatic switching system', 'Insulation monitoring device', 'Line fault detection', 'Complete circuit protection'], order: 20 },
      { name: 'Anti-Static Flooring', description: 'ESD protection for surgical safety', category: 'modular', features: ['Electrostatic discharge prevention', 'Sensitive equipment protection', 'Enhanced safety standards', 'Seamless and easy-to-clean', 'Durable surgical-grade material'], order: 21 },
      { name: 'Operating Table', description: 'Multi-specialty surgical platform', category: 'modular', features: ['Adjustable positioning', 'High stability and load-bearing', 'Ergonomic surgical design', 'Multi-specialty compatibility', 'Modular system integration'], order: 22 },
      { name: 'Laminar Air Flow', description: 'Ultra-clean air filtration system', category: 'modular', features: ['Unidirectional airflow pattern', 'HEPA filtration technology', 'Airborne contamination control', 'Reduced infection risk', 'International compliance standards'], order: 23 },
      { name: 'Automatic Sliding Door', description: 'Touch-free access system', category: 'modular', features: ['Hands-free operation', 'Airtight sealing', 'Silent and reliable performance', 'High-traffic durability', 'Infection control maintenance'], order: 24 },
      { name: 'Medical Cabinets', description: 'Hygienic surgical supply storage', category: 'modular', features: ['Easy-to-clean surfaces', 'Optimized instrument storage', 'Corrosion-resistant construction', 'Seamless integration', 'Improved operational efficiency'], order: 25 },
      { name: 'X-Ray Viewer', description: 'Radiographic image visualization', category: 'modular', features: ['High-brightness illumination', 'Uniform light distribution', 'Slim space-efficient design', 'Energy-efficient operation', 'Surgical environment suitable'], order: 26 },
      { name: 'Sub Structure', description: 'Modular OT foundation system', category: 'modular', features: ['High-strength structural framework', 'Utility integration support', 'Long-term durability', 'Future modification capability', 'Precise component alignment'], order: 27 },

      { name: 'Ultrasound (USG) Systems', description: 'High-performance diagnostic imaging', category: 'diagnostic', features: ['High-resolution real-time imaging', 'Advanced Doppler capabilities', 'Portable and cart-based configs', 'User-friendly clinical interface', 'Reliable high-demand operation'], order: 28 },
      { name: 'X-Ray Systems', description: 'Digital radiography solutions', category: 'diagnostic', features: ['High-resolution digital output', 'Reduced radiation exposure', 'Rapid image acquisition', 'PACS-ready integration', 'Continuous clinical usage design'], order: 29 },
      { name: 'C-Arm Systems', description: 'Real-time fluoroscopic imaging', category: 'diagnostic', features: ['Dynamic intraoperative imaging', 'High-quality fluoroscopy', 'Compact mobile design', 'Surgical team positioning', 'Modern surgical workflow compatible'], order: 30 },

      { name: 'Anesthesia Workstation', description: 'Integrated anesthesia delivery system', category: 'critical', features: ['Integrated heated breathing circuit', 'Advanced ventilation modes', 'Precise gas delivery and monitoring', 'Multi-patient category support', 'High-reliability surgical system'], order: 31 },
      { name: 'Multi-Parameter Patient Monitor', description: 'Continuous critical care monitoring', category: 'critical', features: ['12.1" and 15" display options', 'Multi-parameter ICU/NICU monitoring', '12-lead ECG acquisition', 'ST segment and arrhythmia mapping', 'Scalable clinical requirements'], order: 32 },
      { name: 'ICU Medical Ventilator', description: 'Microprocessor-controlled life support', category: 'critical', features: ['Invasive and non-invasive modes', 'Neonatal to adult patient support', 'Microprocessor precision control', 'Advanced respiratory monitoring', 'Transport-critical applications'], order: 33 },
      { name: '12-Channel ECG System', description: 'Comprehensive cardiac diagnosis', category: 'critical', features: ['8" high-resolution touch interface', '12-channel simultaneous recording', 'Glasgow interpretation algorithm', 'ST segment ischemia detection', '10-hour battery backup'], order: 34 },

      { name: 'Medical UV Phototherapy Cabin', description: 'Dermatological UV treatment system', category: 'therapeutic', features: ['High-intensity UV treatment booth', 'UVA and Narrowband UVB support', 'Vitiligo, psoriasis, eczema treatment', 'Uniform radiation distribution', 'Safety-controlled exposure system'], order: 35 },
    ];

    let productCount = 0;
    for (const item of productSeed) {
      const existing = await Product.findOne({ name: item.name, category: item.category });
      if (!existing) {
        await Product.create(item);
        productCount++;
      }
    }
    console.log(`Products: ${productCount} new items seeded`);

    // 4. Seed Careers
    const careerSeed = [
      {
        position: 'Senior Gas Engineer',
        department: 'Operations',
        location: 'Multan, Pakistan',
        type: 'Full-time',
        description: 'Looking for an experienced gas engineer to lead our operations team. Must have expertise in industrial gas systems and safety protocols.',
        responsibilities: ['Manage daily operations of gas production facilities', 'Oversee safety compliance and quality standards', 'Lead a team of 8-10 technicians', 'Implement process improvements and efficiency initiatives'],
        requirements: ['5+ years experience in gas/chemical industry', 'Strong leadership skills', 'Knowledge of ISO and safety standards', 'Engineering degree or equivalent certification'],
      },
      {
        position: 'Medical Gas Specialist',
        department: 'Healthcare Solutions',
        location: 'Karachi, Pakistan',
        type: 'Full-time',
        description: 'Join our healthcare solutions team to support medical gas pipeline installations and maintenance across hospitals.',
        responsibilities: ['Design and install medical gas pipeline systems', 'Conduct regular maintenance and safety inspections', 'Train hospital staff on gas system operations', 'Troubleshoot and resolve technical issues'],
        requirements: ['3+ years in medical gas or healthcare technology', 'Knowledge of hospital standards and regulations', 'Technical certification required', 'Excellent customer service skills'],
      },
      {
        position: 'Sales Executive',
        department: 'Sales & Business Development',
        location: 'Islamabad, Pakistan',
        type: 'Full-time',
        description: 'Drive sales growth for our industrial and medical gas products across Pakistan. Build and maintain client relationships.',
        responsibilities: ['Identify and pursue new business opportunities', 'Manage relationships with key accounts', 'Prepare and present sales proposals', 'Achieve monthly and quarterly sales targets'],
        requirements: ['2+ years of B2B sales experience', 'Strong communication and negotiation skills', 'Knowledge of industrial/medical gases preferred', 'Valid driving license'],
      },
      {
        position: 'Quality Assurance Officer',
        department: 'Quality & Compliance',
        location: 'Multan, Pakistan',
        type: 'Full-time',
        description: 'Ensure our products and services meet the highest quality and safety standards.',
        responsibilities: ['Conduct quality inspections and audits', 'Document and investigate non-conformances', 'Maintain quality management system', 'Coordinate with regulatory bodies'],
        requirements: ['2+ years in quality assurance', 'Knowledge of ISO standards', 'Attention to detail', 'Certification in QA preferred'],
      },
    ];

    let careerCount = 0;
    for (const item of careerSeed) {
      const existing = await Career.findOne({ position: item.position });
      if (!existing) {
        await Career.create(item);
        careerCount++;
      }
    }
    console.log(`Careers: ${careerCount} new items seeded`);

    console.log('\n✅ Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seed();
