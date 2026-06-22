import {
  FaFire, FaWind, FaFlask, FaLeaf, FaSnowflake, FaLungs, FaTint,
  FaMicrochip, FaBurn, FaHeartbeat, FaCircle, FaHospital, FaPills,
} from 'react-icons/fa';
import cylinderYardImg from '../assets/infra02.JPG';
import medicalGasImg from '../assets/products/mgps-ward-hero.jpeg';
import specialtyGasImg from '../assets/daplant.jpeg';
import lpgImg from '../assets/trucks1.JPG';

export const slugify = (str) =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const industrialGases = [
  { icon: FaFire, image: cylinderYardImg, title: 'Oxygen (O₂)', description: 'High-purity oxygen for industrial combustion, cutting, welding, and chemical processes', features: ['99.5% minimum purity', 'Supplied in compressed gas cylinders and bulk liquid', 'Used in steelmaking, glass manufacturing, and wastewater treatment', 'Enhances combustion efficiency in furnaces', 'Critical for chemical oxidation processes'] },
  { icon: FaWind, image: cylinderYardImg, title: 'Nitrogen (N₂)', description: 'Inert gas for blanketing, purging, and inerting applications', features: ['99.9% minimum purity', 'Available as compressed gas and bulk liquid nitrogen', 'Used for inert atmosphere in chemical processing', 'Food packaging and preservation applications', 'Blanketing for flammable liquid storage'] },
  { icon: FaFlask, image: cylinderYardImg, title: 'Argon (Ar)', description: 'Premium shielding gas for welding and metal fabrication', features: ['99.99% high-purity argon', 'Primary shielding gas for TIG and MIG welding', 'Used in metal production and fabrication', 'Blanketing gas for reactive metal processing', 'Specialty applications in electronics manufacturing'] },
  { icon: FaFire, image: cylinderYardImg, title: 'Acetylene (C₂H₂)', description: 'High-temperature fuel gas for cutting and welding (via sister concern TM Gases)', features: ['Extremely high flame temperature (3,300°C)', 'Efficient oxy-acetylene cutting and welding', 'Supplied in specialized dissolved gas cylinders', 'Quick preheat for metalworking operations', 'Widely used in construction and repair'] },
  { icon: FaLeaf, image: cylinderYardImg, title: 'Ammonia (NH₃)', description: 'Industrial-grade anhydrous ammonia for refrigeration and chemical processes', features: ['99.5% minimum purity', 'Used in industrial refrigeration systems', 'Feedstock for fertilizer and chemical production', 'Water treatment applications', 'Supplied in bulk and cylinder quantities'] },
  { icon: FaSnowflake, image: cylinderYardImg, title: 'Carbon Dioxide (CO₂)', description: 'High-purity CO₂ for food, beverage, and industrial use', features: ['99.9% food-grade CO₂', 'Used in carbonated beverage production', 'pH control in water treatment', 'Shielding gas for MIG welding', 'Fire suppression systems'] },
];

export const medicalGases = [
  { icon: FaLungs, image: medicalGasImg, title: 'Medical Oxygen (O₂)', description: 'USP-grade oxygen for respiratory therapy and life support', features: ['USP/BP grade — 99.5% minimum purity', 'Critical for respiratory therapy and ICU support', 'Supplied in medical-grade cylinders of various sizes', 'Central pipeline supply for hospital networks', 'Emergency backup for healthcare facilities'] },
  { icon: FaWind, image: medicalGasImg, title: 'Nitrous Oxide (N₂O)', description: 'Medical-grade anaesthetic and analgesic gas', features: ['Pharmaceutical grade purity', 'Used as anaesthetic agent in operating theatres', 'Analgesic for pain management in dentistry and obstetrics', 'Combined with oxygen for Entonox delivery', 'Supplied in blue medical cylinders'] },
  { icon: FaFlask, image: medicalGasImg, title: 'Medical Carbon Dioxide (CO₂)', description: 'High-purity CO₂ for insufflation and respiratory applications', features: ['Medical-grade purity certification', 'Used for laparoscopic insufflation in surgery', 'Respiratory stimulant in specific clinical settings', 'Supplied in medical cylinders with safety valves', 'Color-coded cylinders per international standards'] },
  { icon: FaTint, image: medicalGasImg, title: 'Medical Air', description: 'Breathing-quality compressed air for healthcare environments', features: ['Purified, oil-free medical air', 'Used for respiratory therapy and incubators', 'Supplied via central pipeline or cylinder', 'Compliant with pharmacopoeia standards', 'Available 24/7 to healthcare facilities'] },
  { icon: FaSnowflake, image: medicalGasImg, title: 'Medical Nitrogen (N₂)', description: 'High-purity nitrogen for surgical instruments and medical devices', features: ['High-purity medical-grade nitrogen', 'Powers pneumatic surgical instruments', 'Cryopreservation and freezer applications', 'MRI system cooling support', 'Supplied with medical gas outlet fittings'] },
];

export const specialtyGases = [
  { icon: FaFlask, image: specialtyGasImg, title: 'Calibration Gas Mixtures', description: 'Custom-formulated gas blends for instrument calibration', features: ['Precision-mixed to customer specifications', 'NIST-traceable certification available', 'Used for environmental monitoring equipment', 'Industrial safety instrument calibration', 'Laboratory analyzer verification'] },
  { icon: FaMicrochip, image: specialtyGasImg, title: 'Electronic Grade Gases', description: 'Ultra-high-purity gases for semiconductor and electronics manufacturing', features: ['99.999%+ purity levels', 'Custom cylinder preparation', 'Low particulate and moisture content', 'Cleanroom-ready packaging', 'Applications in deposition and etching'] },
  { icon: FaFlask, image: specialtyGasImg, title: 'Zero Gases', description: 'Hydrocarbon-free zero-grade air and nitrogen for analytical instruments', features: ['Total hydrocarbon content < 0.1 ppm', 'Used as carrier gas in GC analyzers', 'Zero-air for flame ionization detectors', 'Ultra-zero options for trace analysis', 'Supplied with full certificate of analysis'] },
  { icon: FaLeaf, image: specialtyGasImg, title: 'Mixture Gases', description: 'Custom gas blends for specialized industrial applications', features: ['Custom ratios mixed to order', 'Wide range of component gases available', 'Used in food packaging, welding, and research', 'Full certificate of analysis provided', 'Packaged in various cylinder sizes'] },
];

export const lpgGases = [
  { icon: FaBurn, image: lpgImg, title: 'LPG (Liquefied Petroleum Gas)', description: 'Clean-burning fuel gas for industrial and commercial applications', features: ['Consistent calorific value', 'Low sulfur content', 'Available in bulk and cylinder supply', 'Used for industrial heating applications', 'Cleaner alternative to traditional fuels'] },
];

export const categoryGroups = [
  {
    label: 'Gases',
    id: 'gases',
    items: [
      { id: 'industrial', label: 'Industrial Gases', icon: FaFire },
      { id: 'medical', label: 'Medical Gases', icon: FaHeartbeat },
      { id: 'specialty', label: 'Specialty Gases', icon: FaFlask },
      { id: 'lpg', label: 'LPG', icon: FaBurn },
    ],
  },
  {
    label: 'Healthcare Engineering & Equipment',
    id: 'healthcare-engineering',
    items: [
      { id: 'mgps', label: 'Medical Gas Pipelines', icon: FaTint },
      { id: 'terminals', label: 'Terminal Units', icon: FaCircle },
      { id: 'delivery', label: 'Gas Delivery', icon: FaWind },
      { id: 'modular', label: 'Modular OT', icon: FaHospital },
      { id: 'diagnostic', label: 'Diagnostic Systems', icon: FaMicrochip },
      { id: 'critical', label: 'Critical Care', icon: FaHeartbeat },
      { id: 'therapeutic', label: 'Therapeutic', icon: FaPills },
    ],
  },
];
