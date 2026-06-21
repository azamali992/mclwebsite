import { useState, useEffect } from 'react';
import {
  FaCheck, FaArrowRight, FaBoxOpen, FaWrench, FaHeartbeat, FaMicrochip,
  FaLungs, FaVial, FaFlask, FaLock, FaStethoscope, FaCircle,
  FaLightbulb, FaUsers, FaAward, FaFileAlt, FaPhone,
  FaTint, FaWind, FaRadiation, FaBed, FaPlug,
  FaSyringe, FaDoorOpen, FaBoxes, FaDesktop, FaToggleOn, FaPills,
  FaFire, FaSnowflake, FaLeaf, FaBurn
} from 'react-icons/fa';
import useInView from '../hooks/useInView';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import useContent from '../hooks/useContent';
import ProductChatbot from '../components/ProductChatbot';
import heroBg from '../assets/infra01.JPG';
import {
  slugify, industrialGases, medicalGases, specialtyGases, lpgGases, categoryGroups,
} from '../data/products';

function SectionWrap({ children, className = '', id }) {
  const [ref, inView] = useInView();
  return (
    <section id={id} ref={ref} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </section>
  );
}

function ProductCard({ icon: Icon, title, description, features, index = 0 }) {
  const [expanded, setExpanded] = useState(false);
  const [ref, inView] = useInView();

  return (
    <div
      id={slugify(title)}
      ref={ref}
      onClick={() => setExpanded(!expanded)}
      aria-expanded={expanded}
      style={{ transitionDelay: inView ? `${(index % 6) * 60}ms` : '0ms' }}
      className={`relative bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-red-900/10 transition-all duration-500 cursor-pointer group hover:-translate-y-1.5 scroll-mt-28 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="relative bg-gradient-to-br from-slate-800 via-slate-800 to-mclRed p-6 pb-9 text-white overflow-hidden">
        <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-white/5" />
        <div className="absolute -right-2 top-8 w-16 h-16 rounded-full bg-white/5" />
        <h3 className="relative text-lg font-bold mb-1 pr-12 leading-snug">{title}</h3>
        <p className="relative text-sm text-white/75 leading-relaxed">{description}</p>
      </div>

      <div className="relative flex justify-end px-6">
        <div className="absolute -top-7 right-6 w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-mclRed group-hover:bg-mclRed group-hover:text-white group-hover:-rotate-6 transition-all duration-300">
          <Icon size={24} />
        </div>
      </div>

      <div className={`grid transition-all duration-300 ease-in-out ${expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`} style={{ display: 'grid' }}>
        <div className="overflow-hidden">
          {features && (
            <div className="px-6 pt-2 pb-4">
              <h4 className="font-bold text-gray-900 mb-3 uppercase text-xs tracking-wide">Key Features</h4>
              <ul className="space-y-2">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <FaCheck className="text-mclRed mt-1 flex-shrink-0" size={12} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{expanded ? 'Show less' : 'Key features'}</span>
        <span className="w-7 h-7 rounded-full bg-gray-50 group-hover:bg-red-50 flex items-center justify-center transition-colors">
          <FaArrowRight className={`text-mclRed transition-transform duration-300 ${expanded ? 'rotate-90' : ''}`} size={11} />
        </span>
      </div>
    </div>
  );
}

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
  'Oxygen (O₂)': FaFire,
  'Nitrogen (N₂)': FaWind,
  'Argon (Ar)': FaFlask,
  'Acetylene (C₂H₂)': FaFire,
  'Ammonia (NH₃)': FaLeaf,
  'Carbon Dioxide (CO₂)': FaSnowflake,
  'Medical Oxygen (O₂)': FaLungs,
  'Nitrous Oxide (N₂O)': FaWind,
  'Medical Carbon Dioxide (CO₂)': FaFlask,
  'Medical Air': FaTint,
  'Medical Nitrogen (N₂)': FaSnowflake,
  'Calibration Gas Mixtures': FaFlask,
  'Electronic Grade Gases': FaMicrochip,
  'Zero Gases': FaFlask,
  'LPG (Liquefied Petroleum Gas)': FaBurn,
  'Mixture Gases': FaLeaf,
};

const defaultIcon = FaBoxOpen;

const learnMoreLinks = {
  mgps: { path: '/mgps-solutions', label: 'See Full MGPS Details' },
  terminals: { path: '/mgps-solutions', label: 'See Full MGPS Details' },
  delivery: { path: '/mgps-solutions', label: 'See Full MGPS Details' },
  modular: { path: '/modular-ot', label: 'See Modular OT Details' },
  diagnostic: { path: '/clinical-systems', label: 'See Clinical Systems' },
  critical: { path: '/clinical-systems', label: 'See Clinical Systems' },
  therapeutic: { path: '/clinical-systems', label: 'See Clinical Systems' },
};

export default function Products() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [apiProducts, setApiProducts] = useState([]);
  const [apiLoaded, setApiLoaded] = useState(false);
  const { contentMap } = useContent('products');

  useEffect(() => {
    fetchProducts()
      .then(data => { setApiProducts(Array.isArray(data) ? data : []); setApiLoaded(true); })
      .catch(() => { setApiProducts([]); setApiLoaded(true); });
  }, []);

  useEffect(() => {
    if (!categoryParam) return;
    const timeout = setTimeout(() => {
      document.getElementById(categoryParam)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
    return () => clearTimeout(timeout);
  }, [categoryParam]);

  const gasDefaults = {
    industrial: industrialGases,
    medical: medicalGases,
    specialty: specialtyGases,
    lpg: lpgGases,
  };

  const getProductsForCategory = (categoryId) => {
    const fromGasDefaults = gasDefaults[categoryId];
    if (fromGasDefaults) return fromGasDefaults;

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

  const pageTitle = contentMap['page-hero-title']?.title || 'Industrial, Medical & Specialty Gases';
  const pageDesc = contentMap['page-hero-description']?.title || 'Multan Chemicals Limited is Pakistan\'s premier supplier of high-purity industrial gases, medical-grade gases, specialty gas mixtures, and comprehensive healthcare engineering solutions including Medical Gas Pipeline Systems and Modular Operation Theatres.';

  return (
    <div className="pt-24">
      <section className="relative w-full bg-slate-900 py-24 px-4 sm:px-8 lg:px-12 overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-900" />
        <div className="relative max-w-[1400px] mx-auto text-center">
          <p className="text-mclRed font-bold uppercase tracking-widest text-sm mb-3">Our Products & Solutions</p>
          <h1 className="text-white font-extrabold text-4xl lg:text-5xl leading-tight mb-4">{pageTitle}</h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">{pageDesc}</p>
        </div>
      </section>

      <SectionWrap className="py-16 bg-gray-50 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-center text-3xl font-bold text-gray-900 mb-3">Product Categories</h2>
          <p className="text-center text-gray-500 text-sm mb-10">Jump straight to a category below.</p>
          <div className="space-y-8">
            {categoryGroups.map((group) => (
              <div key={group.label}>
                <p className="text-base font-bold uppercase tracking-widest text-gray-400 mb-3">{group.label}</p>
                <div className="flex flex-wrap gap-3">
                  {group.items.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => document.getElementById(cat.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                        className="px-5 py-2.5 rounded-full font-semibold text-sm transition-all flex items-center gap-2 focus:ring-2 focus:ring-mclRed focus:outline-none bg-white text-gray-700 border border-gray-200 hover:border-mclRed hover:text-mclRed"
                      >
                        <Icon size={15} />
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrap>

      {categoryGroups.map((group) => (
        <SectionWrap key={group.label} id={group.id} className="py-20 px-4 sm:px-8 lg:px-12 bg-white scroll-mt-28">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-14">
              <p className="text-mclRed font-bold uppercase tracking-widest text-sm mb-2">{group.label}</p>
              <h2 className="text-gray-900 font-extrabold text-3xl lg:text-4xl leading-tight">
                {group.id === 'gases' ? 'Industrial, Medical & Specialty Gases' : 'Healthcare Engineering & Equipment'}
              </h2>
            </div>
            <div className="space-y-16">
              {group.items.map((cat) => {
                const learnMore = learnMoreLinks[cat.id];
                return (
                  <div key={cat.id} id={cat.id} className="scroll-mt-28">
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-red-50 text-mclRed flex items-center justify-center flex-shrink-0">
                          <cat.icon size={18} />
                        </div>
                        <h3 className="text-gray-900 font-bold text-xl">{cat.label}</h3>
                      </div>
                      {learnMore && (
                        <button onClick={() => navigate(learnMore.path)} className="text-mclRed font-semibold text-sm inline-flex items-center gap-1.5 hover:gap-2.5 transition-all flex-shrink-0">
                          {learnMore.label} <FaArrowRight size={11} />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getProductsForCategory(cat.id).map((product, i) => (
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

      <SectionWrap className="py-20 bg-gradient-to-r from-mclRed to-red-700 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-white text-3xl font-bold mb-12 text-center">Why Choose MCL Products?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FaAward, title: 'International Standards', desc: 'HTM, NFPA, ISO compliant systems' },
              { icon: FaLock, title: 'Safety First', desc: 'Maximum protection for patients and staff' },
              { icon: FaUsers, title: 'Expert Support', desc: '24/7 technical support and maintenance' },
              { icon: FaFileAlt, title: 'Quality Assured', desc: 'Certified materials and rigorous testing' }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="text-center text-white">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-white/80 text-sm">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </SectionWrap>

      <SectionWrap className="py-16 bg-white px-4 sm:px-8 lg:px-12 border-t-4 border-mclRed">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Need a Custom Solution?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact our team for customized gas supply solutions, healthcare equipment, and system consultations tailored to your facility needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('/contact')} className="bg-mclRed hover:bg-red-800 text-white px-8 py-3.5 font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-all focus:ring-2 focus:ring-red-500 focus:outline-none rounded">
              <FaPhone /> Contact Us
            </button>
            <button onClick={() => navigate('/careers')} className="border-2 border-mclRed text-mclRed hover:bg-mclRed hover:text-white px-8 py-3.5 font-bold uppercase tracking-wider transition-all focus:ring-2 focus:ring-mclRed focus:outline-none rounded">
              Join Our Team
            </button>
          </div>
        </div>
      </SectionWrap>

      <SectionWrap className="py-10 bg-gray-50 px-4 sm:px-8 lg:px-12 text-center">
        <p className="text-gray-600 text-sm">
          <FaCheck className="inline text-mclRed mb-0.5 mr-2" size={14} />
          HTM 02-01 &middot; NFPA 99 &middot; ISO 7396-1 &middot; ISO 9001 certified —{' '}
          <Link to="/about#certifications" className="text-mclRed font-semibold hover:underline">see all certifications</Link>
        </p>
      </SectionWrap>

      <ProductChatbot />
    </div>
  );
}
