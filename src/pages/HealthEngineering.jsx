import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaCheck, FaArrowRight, FaBoxOpen, FaWrench, FaHeartbeat, FaMicrochip,
  FaLungs, FaVial, FaFlask, FaLock, FaStethoscope, FaCircle,
  FaLightbulb, FaFileAlt, FaPhone,
  FaTint, FaWind, FaRadiation, FaBed, FaPlug,
  FaSyringe, FaDoorOpen, FaBoxes, FaDesktop, FaToggleOn, FaPills, FaHospital,
} from 'react-icons/fa';
import SectionWrap from '../components/SectionWrap';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import heroBg from '../assets/infra01.JPG';
import mgpsEquipment from '../assets/products/medical-gas-manifolds.jpeg';
import modularOtPhoto from '../assets/products/modular-ot-hero.jpeg';
import clinicalPhoto from '../assets/products/anesthesia-workstation.png';
import { categoryGroups } from '../data/products';
import Seo from '../components/Seo';

const healthGroup = categoryGroups.find((g) => g.id === 'healthcare-engineering');
const categoryLabel = (id) => healthGroup.items.find((c) => c.id === id);

const defaultProducts = {
  mgps: [
    { icon: FaFlask, title: 'Medical Gas Manifolds', description: 'Advanced manifold systems for gas distribution', features: ['NFPA, ISO, and HTM compliant design', 'Automatic changeover capability', 'Tested for safety and reliability'] },
    { icon: FaWind, title: 'Medical Air Compressor Plants', description: 'Integrated compressed air systems', features: ['Factory-assembled and pre-tested', 'Suitable for high-demand environments', 'Efficient centralized hospital supply'] },
    { icon: FaVial, title: 'Oxygen Generation Plants', description: 'On-site oxygen generation systems', features: ['Reduces cylinder delivery dependency', 'Continuous availability during peak demand', 'PSA technology based systems'] },
    { icon: FaLock, title: 'Alarm & Safety Monitoring', description: 'Master and area alarm systems', features: ['Real-time visual and audible alerts', 'Centralized monitoring capability', 'Up to 6 different gas monitoring'] },
  ],
  terminals: [
    { icon: FaCircle, title: 'Medical Gas Outlets', description: 'Safe point-of-use access to medical gases', features: ['Standardized, color-coded connections', 'Quick connect/disconnect capability', 'Leak-free and secure design'] },
    { icon: FaBed, title: 'Bed Head Units (BHUs)', description: 'Integrated patient-care systems', features: ['Combined gas outlets and power sockets', 'Communication and data ports', 'Patient bedside installation'] },
    { icon: FaWrench, title: 'Zone Valve Boxes', description: 'Flexible gas supply control', features: ['Easy isolation during maintenance', 'Emergency shut-off capability', 'Zone-specific control'] },
  ],
  delivery: [
    { icon: FaToggleOn, title: 'Vacuum Regulators', description: 'Pressure control for suction systems', features: ['Safe suction pressure levels', 'Clinical precision'] },
    { icon: FaSyringe, title: 'Entonox Delivery Kits', description: 'Oxygen-nitrous oxide delivery', features: ['Pain management applications', 'Obstetric procedures'] },
    { icon: FaLungs, title: 'Oxygen Concentrators', description: 'Ambient air oxygen extraction', features: ['Medical-grade purity output', 'Continuous supply capability'] },
  ],
  modular: [
    { icon: FaBoxOpen, title: 'Wall & Ceiling System', description: 'Modular structural framework', features: ['Anti-microbial protective coating', 'Integrated air duct provisions'] },
    { icon: FaLightbulb, title: 'Surgical Lighting System', description: 'High-intensity LED surgical lights', features: ['Exceeds 1300 Lux illumination', 'Shadow-free lighting'] },
    { icon: FaToggleOn, title: 'OT Control Panel', description: 'Centralized operation theatre control', features: ['Medical gas & HVAC monitoring', 'Equipment and system alarms'] },
    { icon: FaWind, title: 'Laminar Air Flow', description: 'Ultra-clean air filtration system', features: ['HEPA filtration technology', 'Reduced infection risk'] },
  ],
  diagnostic: [
    { icon: FaMicrochip, title: 'Ultrasound (USG) Systems', description: 'High-performance diagnostic imaging', features: ['High-resolution real-time imaging', 'Advanced Doppler capabilities', 'Portable and cart-based configs', 'User-friendly clinical interface', 'Reliable high-demand operation'] },
    { icon: FaRadiation, title: 'X-Ray Systems', description: 'Digital radiography solutions', features: ['High-resolution digital output', 'Reduced radiation exposure', 'Rapid image acquisition', 'PACS-ready integration', 'Continuous clinical usage design'] },
    { icon: FaCircle, title: 'C-Arm Systems', description: 'Real-time fluoroscopic imaging', features: ['Dynamic intraoperative imaging', 'High-quality fluoroscopy', 'Compact mobile design', 'Surgical team positioning', 'Modern surgical workflow compatible'] },
  ],
  critical: [
    { icon: FaStethoscope, title: 'Anesthesia Workstation', description: 'Integrated anesthesia delivery system', features: ['Integrated heated breathing circuit', 'Advanced ventilation modes', 'Precise gas delivery and monitoring', 'Multi-patient category support', 'High-reliability surgical system'] },
    { icon: FaHeartbeat, title: 'Multi-Parameter Patient Monitor', description: 'Continuous critical care monitoring', features: ['12.1" and 15" display options', 'Multi-parameter ICU/NICU monitoring', '12-lead ECG acquisition', 'ST segment and arrhythmia mapping', 'Scalable clinical requirements'] },
    { icon: FaLungs, title: 'ICU Medical Ventilator', description: 'Microprocessor-controlled life support', features: ['Invasive and non-invasive modes', 'Neonatal to adult patient support', 'Microprocessor precision control', 'Advanced respiratory monitoring', 'Transport-critical applications'] },
    { icon: FaFileAlt, title: '12-Channel ECG System', description: 'Comprehensive cardiac diagnosis', features: ['8" high-resolution touch interface', '12-channel simultaneous recording', 'Glasgow interpretation algorithm', 'ST segment ischemia detection', '10-hour battery backup'] },
  ],
  therapeutic: [
    { icon: FaPills, title: 'Medical UV Phototherapy Cabin', description: 'Dermatological UV treatment system', features: ['High-intensity UV treatment booth', 'UVA and Narrowband UVB support', 'Vitiligo, psoriasis, eczema treatment', 'Uniform radiation distribution', 'Safety-controlled exposure system'] },
  ],
};

const productIconMap = {
  'Medical Gas Cylinders & Bulk Storage': FaTint,
  'Medical Gas Manifolds': FaFlask,
  'Medical Air Compressor Plants': FaWind,
  'Anesthetic Gas Scavenging (AGSS)': FaLungs,
  'Oxygen Generation Plants': FaVial,
  'Alarm & Safety Monitoring': FaLock,
  'Medical Gas Outlets': FaCircle,
  'Bed Head Units (BHUs)': FaBed,
  'Zone Valve Boxes': FaWrench,
  'Vacuum Regulators': FaToggleOn,
  'Air Venturi Systems': FaWind,
  'Air Flow Meters': FaDesktop,
  'Entonox Delivery Kits': FaSyringe,
  'Suction Machines': FaHeartbeat,
  'Oxygen Concentrators': FaLungs,
  'Wall & Ceiling System': FaBoxOpen,
  'Surgical Lighting System': FaLightbulb,
  'Medical Pendants': FaPlug,
  'OT Control Panel': FaToggleOn,
  'Medical Grade Power System': FaLock,
  'Anti-Static Flooring': FaRadiation,
  'Operating Table': FaBed,
  'Laminar Air Flow': FaWind,
  'Automatic Sliding Door': FaDoorOpen,
  'Medical Cabinets': FaBoxes,
  'X-Ray Viewer': FaDesktop,
  'Sub Structure': FaWrench,
  'Ultrasound (USG) Systems': FaMicrochip,
  'X-Ray Systems': FaRadiation,
  'C-Arm Systems': FaCircle,
  'Anesthesia Workstation': FaStethoscope,
  'Multi-Parameter Patient Monitor': FaHeartbeat,
  'ICU Medical Ventilator': FaLungs,
  '12-Channel ECG System': FaFileAlt,
  'Medical UV Phototherapy Cabin': FaPills,
};

const defaultIcon = FaBoxOpen;

const hubs = [
  { key: 'mgps-hub', label: 'MGPS Solutions', image: mgpsEquipment, path: '/mgps-solutions', categoryIds: ['mgps', 'terminals', 'delivery'], ctaLabel: 'See Full MGPS Details', icon: FaTint },
  { key: 'modular-hub', label: 'Modular OT', image: modularOtPhoto, path: '/modular-ot', categoryIds: ['modular'], ctaLabel: 'See Modular OT Details', icon: FaHospital },
  { key: 'clinical-hub', label: 'Clinical Systems', image: clinicalPhoto, path: '/clinical-systems', categoryIds: ['diagnostic', 'critical', 'therapeutic'], ctaLabel: 'See Clinical Systems', icon: FaHeartbeat },
];

export default function HealthEngineering() {
  const navigate = useNavigate();
  const [apiProducts, setApiProducts] = useState([]);
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    fetchProducts()
      .then(data => { setApiProducts(Array.isArray(data) ? data : []); setApiLoaded(true); })
      .catch(() => { setApiProducts([]); setApiLoaded(true); });
  }, []);

  const getProductsForCategory = (categoryId) => {
    const defaults = defaultProducts[categoryId] || [];
    if (!apiLoaded) return defaults;

    const apiCats = apiProducts.filter(p => p.category === categoryId);
    if (apiCats.length === 0) return defaults;

    return apiCats.map(p => ({
      icon: productIconMap[p.name] || defaultIcon,
      title: p.name,
      description: p.description || '',
      features: p.features || [],
    }));
  };

  return (
    <div className="pt-24">
      <Seo
        title="Healthcare Engineering & Equipment"
        description="End-to-end medical gas pipeline systems (MGPS), modular operation theatres, and clinical & diagnostic equipment, designed, supplied, installed and supported by Multan Chemicals Limited across Pakistan."
        path="/health-engineering"
      />
      <section className="relative w-full bg-slate-900 py-24 px-4 sm:px-8 lg:px-12 overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-900" />
        <div className="relative max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-accent font-bold uppercase tracking-widest text-sm mb-3">Health Engineering</p>
            <h1 className="text-white font-extrabold text-4xl lg:text-5xl leading-tight mb-4">Healthcare Engineering & Equipment</h1>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              End-to-end medical gas pipeline systems, modular operation theatres, and clinical & diagnostic equipment — designed, supplied, installed and supported by MCL.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6">
            {hubs.map((hub) => (
              <Link
                key={hub.key}
                to={hub.path}
                className="group relative h-64 lg:h-96 rounded-2xl overflow-hidden shadow-xl focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <img src={hub.image} alt={hub.label} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-slate-900/10" />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-5 lg:p-6 text-center">
                  <hub.icon className="text-accent mb-3" size={28} />
                  <h3 className="text-white font-bold text-base lg:text-xl leading-tight">{hub.label}</h3>
                  <span className="text-white/70 text-[10px] lg:text-xs uppercase tracking-widest mt-2 flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Page <FaArrowRight size={9} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="space-y-16 py-20">
        {hubs.map((hub) => (
          <SectionWrap key={hub.key} className="px-4 sm:px-8 lg:px-12">
            <div className="max-w-[1400px] mx-auto">
              <div className="flex items-center justify-between gap-3 mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-50 text-accent flex items-center justify-center flex-shrink-0">
                    <hub.icon size={18} />
                  </div>
                  <h2 className="text-gray-900 font-bold text-2xl">{hub.label}</h2>
                </div>
                <button onClick={() => navigate(hub.path)} className="text-accent font-semibold text-sm inline-flex items-center gap-1.5 hover:gap-2.5 transition-all flex-shrink-0">
                  {hub.ctaLabel} <FaArrowRight size={11} />
                </button>
              </div>
              <div className="space-y-10">
                {hub.categoryIds.map((catId) => {
                  const cat = categoryLabel(catId);
                  return (
                    <div key={catId}>
                      <h3 className="text-gray-700 font-semibold text-sm uppercase tracking-wide mb-4">{cat.label}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getProductsForCategory(catId).map((product, i) => (
                          <ProductCard key={i} index={i} {...product} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </SectionWrap>
        ))}
      </div>

      <SectionWrap className="py-16 bg-white px-4 sm:px-8 lg:px-12 border-t-4 border-accent">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Need a Custom Solution?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact our team for healthcare engineering consultations and equipment tailored to your facility needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('/contact')} className="bg-accent hover:bg-red-800 text-white px-8 py-3.5 font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-all focus:ring-2 focus:ring-red-500 focus:outline-none rounded">
              <FaPhone /> Contact Us
            </button>
            <button onClick={() => navigate('/careers')} className="border-2 border-accent text-accent hover:bg-accent hover:text-white px-8 py-3.5 font-bold uppercase tracking-wider transition-all focus:ring-2 focus:ring-accent focus:outline-none rounded">
              Join Our Team
            </button>
          </div>
        </div>
      </SectionWrap>

      <SectionWrap className="py-10 bg-gray-50 px-4 sm:px-8 lg:px-12 text-center">
        <p className="text-gray-600 text-sm">
          <FaCheck className="inline text-accent mb-0.5 mr-2" size={14} />
          HTM 02-01 &middot; NFPA 99 &middot; ISO 7396-1 &middot; ISO 9001 certified —{' '}
          <Link to="/about#certifications" className="text-accent font-semibold hover:underline">see all certifications</Link>
        </p>
      </SectionWrap>
    </div>
  );
}
