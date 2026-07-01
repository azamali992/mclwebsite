import { useState } from 'react';
import {
  FaCheck, FaArrowRight, FaDownload,
  FaRegBuilding, FaShieldAlt, FaFileAlt, FaStar, FaGem, FaClock,
  FaProjectDiagram, FaAward, FaHospital, FaHeadset,
  FaTools, FaHeartbeat, FaLeaf, FaHeadphones
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useInView from '../hooks/useInView';
import useContent from '../hooks/useContent';
import useStats from '../hooks/useStats';
import { resolveStat } from '../data/stats';
import renderImg from '../assets/3drender.png';
import manifolds from '../assets/products/medical-gas-manifolds.jpeg';
import compressorPlant from '../assets/products/medical-air-compressor-plant.png';
import oxygenPlant from '../assets/products/oxygen-generation-plant.png';
import masterAlarm from '../assets/products/master-alarm-system.png';
import areaAlarm from '../assets/products/area-alarm-panel.png';
import zoneValve from '../assets/products/zone-valve-boxes.png';
import gasOutlets from '../assets/products/gas-outlets.png';
import bedHeadUnits from '../assets/products/bed-head-units-install.png';
import vacuumRegulator from '../assets/products/vacuum-regulator.png';
import airFlowMeter from '../assets/products/air-flow-meter.png';
import entonoxSuction from '../assets/products/entonox-suction.png';
import oxygenConcentrator from '../assets/products/oxygen-concentrator.png';
import Seo from '../components/Seo';
import StatValue from '../components/StatValue';
import HospitalPipeline3D from '../components/HospitalPipeline3D';

const heroStats = [
  { icon: FaFileAlt, title: 'HTM 02-01', subtitle: 'Compliant' },
  { icon: FaShieldAlt, title: 'NFPA 99', subtitle: 'Compliant' },
  { icon: FaStar, title: 'ISO 7396-1', subtitle: 'Compliant' },
  { icon: FaGem, title: 'High Quality', subtitle: 'Materials' },
  { icon: FaRegBuilding, title: 'Expert Design', subtitle: '& Installation' },
  { icon: FaClock, title: '24/7 Service', subtitle: '& Maintenance' },
];

const overviewStats = [
  { icon: FaProjectDiagram, statKey: 'mgps_projects_completed', label: 'MGPS Projects Completed' },
  { icon: FaAward, statKey: 'mgps_years_experience', label: 'Years of Experience' },
  { icon: FaHospital, statKey: 'mgps_bed_capacity', label: 'Bed Capacity Connected' },
  { icon: FaShieldAlt, value: '100%', label: 'Quality & Safety Assurance' },
  { icon: FaHeadset, value: '24/7', label: 'After Sales Support' },
];

const componentsData = [
  { category: 'Gas Sources', image: oxygenPlant, title: 'Oxygen Generation Plants', desc: 'On-site PSA oxygen generation, reducing dependency on cylinder deliveries' },
  { category: 'Gas Sources', image: compressorPlant, title: 'Medical Air Compressor Plants', desc: 'Factory-assembled, pre-piped and pre-tested centralized air systems' },
  { category: 'Distribution', image: manifolds, title: 'Medical Gas Manifolds', desc: 'NFPA, ISO & HTM compliant manifolds with automatic changeover' },
  { category: 'Storage Systems', image: zoneValve, title: 'Zone Valve Boxes', desc: 'Flexible isolation and control of gas supply to hospital zones' },
  { category: 'Monitoring', image: masterAlarm, title: 'Master Alarm System', desc: 'Real-time visual and audible alerts for gas pressure abnormalities' },
];

const equipmentData = [
  { image: bedHeadUnits, title: 'Bed Head Units', desc: 'Integrated bedside gas outlets, power and data ports' },
  { image: gasOutlets, title: 'Medical Gas Outlets', desc: 'Quick-connect, colour-coded point-of-use outlets' },
  { image: areaAlarm, title: 'Area Alarm Panels', desc: 'Zone-level monitoring for up to six gas types' },
  { image: vacuumRegulator, title: 'Vacuum Regulators', desc: 'Controlled, stable suction pressure for clinical use' },
  { image: airFlowMeter, title: 'Air Flow Meters', desc: 'Precise medical gas flow measurement and dosage' },
  { image: entonoxSuction, title: 'Entonox & Suction', desc: 'Entonox delivery kits and portable suction units' },
  { image: oxygenConcentrator, title: 'Oxygen Concentrators', desc: 'Ambient-air oxygen extraction for backup supply' },
];

const tabCategories = ['Gas Sources', 'Storage Systems', 'Distribution', 'Monitoring', 'All'];

const keyFeatures = [
  { icon: FaShieldAlt, title: 'Safety & Compliance', desc: 'Designed to HTM 02-01, HTM 2022 and NFPA 99 for maximum patient and clinician safety.' },
  { icon: FaTools, title: 'Custom Design & Turnkey Installation', desc: 'Full planning, engineering, installation, testing, commissioning and handover.' },
  { icon: FaGem, title: 'Quality Assurance', desc: 'Built with high-grade, certified materials for durability and minimal maintenance.' },
  { icon: FaHeadphones, title: 'Maintenance & Emergency Support', desc: '24/7 technical support and preventive maintenance for uninterrupted supply.' },
];

const benefits = [
  { icon: FaHeartbeat, title: 'Improved Patient Care', desc: 'Continuous, safe gas delivery directly to ICUs, theatres and wards.' },
  { icon: FaProjectDiagram, title: 'Operational Efficiency', desc: 'Centralized supply reduces cylinder logistics costs and improves workflow.' },
  { icon: FaLeaf, title: 'Environmental Sustainability', desc: 'Minimizes gas leakage and wastage through efficient distribution.' },
];

const overviewChecklist = [
  'Centralized supply of medical gases',
  'ICU, CCU & Operation Theatre solutions',
  'Bed head units & pendants',
  'Alarm & monitoring systems',
];

function HeroSection({ c }) {
  return (
    <section className="w-full relative bg-slate-900 min-h-[calc(100dvh-6rem)] overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <img src={renderImg} alt="3D medical gas pipeline layout" className="absolute right-0 top-0 w-full lg:w-[60%] h-full object-contain p-6" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent" />
      </div>
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 h-full min-h-[calc(100dvh-6rem)] flex flex-col justify-center">
        <div className="max-w-2xl">
          <p className="text-accent font-bold uppercase tracking-widest text-sm mb-4">
            {c['mgps-hero-heading']?.title || 'MGPS SOLUTIONS'}
          </p>
          <h1 className="text-white font-extrabold text-4xl lg:text-5xl leading-tight mb-6">
            {c['mgps-hero-title']?.title || 'Complete Medical Gas Pipeline Solutions'}
          </h1>
          <p className="text-gray-300 text-base leading-relaxed mb-8 max-w-xl">
            {c['mgps-hero-desc']?.title || 'We design, supply, install, test and commission complete Medical Gas Pipeline Systems in accordance with HTM 02-01, NFPA 99, ISO 7396-1 and other international standards.'}
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-accent hover:bg-red-800 text-white px-8 py-3.5 text-xs font-bold uppercase tracking-wider transition-all hover:shadow-lg hover:shadow-red-900/30 active:scale-95 inline-flex items-center gap-2 shadow-md">
              EXPLORE SOLUTIONS <FaArrowRight />
            </button>
            <button className="border border-white/30 hover:bg-white/10 text-white px-8 py-3.5 text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2">
              <FaDownload /> DOWNLOAD BROCHURE
            </button>
          </div>
        </div>
      </div>
      <div className="relative z-20 -mt-4 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="bg-white rounded-lg shadow-xl flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {heroStats.map((stat, i) => (
            <div key={i} className="flex-1 flex items-center justify-center gap-3 p-5">
              <stat.icon className="text-accent flex-shrink-0" size={20} />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-900 leading-tight">{stat.title}</span>
                <span className="text-[10px] text-gray-500 font-medium uppercase tracking-widest mt-0.5">{stat.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OverviewSection({ c }) {
  const [leftRef, leftInView] = useInView();
  const [rightRef, rightInView] = useInView();
  const [statsRef, statsInView] = useInView();
  const { statsMap } = useStats();

  return (
    <section className="py-20 bg-white max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
      <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 items-center">
        <div ref={leftRef} className={`w-full lg:w-1/2 transition-all duration-700 ${leftInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
          <p className="text-accent font-bold uppercase tracking-widest text-sm mb-2">
            {c['mgps-overview-heading']?.title || 'MGPS OVERVIEW'}
          </p>
          <h2 className="text-gray-900 font-extrabold text-3xl lg:text-4xl leading-tight mb-6">
            {c['mgps-overview-title']?.title || 'Safe. Reliable. Life-Supporting.'}
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {c['mgps-overview-desc']?.title || 'Our engineering team delivers end-to-end medical gas pipeline solutions with uncompromising safety. From design and supply through installation, testing and commissioning, every system we build meets the highest international standards for patient safety and operational reliability.'}
          </p>
          <ul className="space-y-3 mb-8">
            {overviewChecklist.map((item, i) => (
              <li key={i} className="flex items-start group">
                <FaCheck className="text-accent mt-1 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" size={14} />
                <span className="text-gray-700 text-sm font-medium">{item}</span>
              </li>
            ))}
          </ul>
          <button className="bg-accent hover:bg-red-800 text-white px-8 py-3.5 text-xs font-bold uppercase tracking-wider transition-all hover:shadow-lg hover:shadow-red-900/30 active:scale-95 inline-flex items-center gap-2 shadow-md">
            REQUEST A CONSULTATION <FaArrowRight />
          </button>
        </div>
        <div ref={rightRef} className={`w-full lg:w-1/2 transition-all duration-700 delay-200 ${rightInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
          <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
            <HospitalPipeline3D height="100%" />
          </div>
        </div>
      </div>
      <div ref={statsRef} className={`mt-16 pt-8 border-t border-gray-100 transition-all duration-700 delay-300 ${statsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {overviewStats.map((stat, i) => {
            const value = stat.statKey ? resolveStat(statsMap, stat.statKey).value : stat.value;
            return (
              <div key={i} className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full border border-accent/20 bg-red-50 flex items-center justify-center">
                  <stat.icon className="text-accent" size={18} />
                </div>
                <div className="flex flex-col">
                  <StatValue value={value} active={statsInView} className="text-2xl font-bold text-gray-900 leading-none" />
                  <span className="text-xs text-gray-500 mt-1">{stat.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ComponentsSection() {
  const [activeTab, setActiveTab] = useState('Gas Sources');
  const filtered = activeTab === 'All'
    ? componentsData
    : componentsData.filter((c) => c.category === activeTab);

  return (
    <section className="py-16 bg-white max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
      <p className="text-accent font-bold uppercase tracking-widest text-sm text-center mb-8">
        MGPS SYSTEM COMPONENTS
      </p>
      <div className="flex justify-center gap-4 overflow-x-auto text-sm font-semibold pb-4">
        {tabCategories.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap pb-2 border-b-2 transition-colors ${
              activeTab === tab ? 'text-accent border-accent' : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-8">
        {filtered.map((comp, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="aspect-square overflow-hidden">
              <img src={comp.image} alt={comp.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-sm text-gray-900 mb-1">{comp.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{comp.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <button className="border border-accent/30 text-accent hover:bg-red-50 font-bold text-xs uppercase px-8 py-3 inline-flex items-center gap-2 transition-all">
          VIEW ALL COMPONENTS <FaArrowRight />
        </button>
      </div>
    </section>
  );
}

function EquipmentSection() {
  return (
    <section className="bg-gray-50 py-20 max-w-full mx-auto px-4 sm:px-8 lg:px-12">
      <div className="max-w-[1400px] mx-auto text-center mb-10">
        <p className="text-accent font-bold uppercase tracking-widest text-sm mb-2">MGPS EQUIPMENT</p>
        <h2 className="text-gray-900 font-extrabold text-3xl lg:text-4xl leading-tight">High Quality Equipment For Maximum Safety</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto mt-10">
        {equipmentData.map((item, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 group hover:shadow-md transition-shadow">
            <div className="aspect-square rounded-md overflow-hidden mb-3">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <h3 className="font-bold text-xs text-gray-900 text-center mb-1">{item.title}</h3>
            <p className="text-[10px] text-gray-500 text-center leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <button className="border border-accent/30 text-accent hover:bg-red-50 font-bold text-xs uppercase px-8 py-3 inline-flex items-center gap-2 transition-all">
          VIEW ALL EQUIPMENTS <FaArrowRight />
        </button>
      </div>
    </section>
  );
}

function ComplianceDiagramSection({ c }) {
  return (
    <section className="py-20 bg-white max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        <div className="w-full lg:w-[40%]">
          <p className="text-accent font-bold uppercase tracking-widest text-sm mb-2">
            {c['mgps-compliance-heading']?.title || 'COMPLIANCE & STANDARDS'}
          </p>
          <h2 className="text-gray-900 font-extrabold text-3xl lg:text-4xl leading-tight mb-6">
            {c['mgps-compliance-title']?.title || 'Built To International Standards'}
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            Every system is designed, installed and tested to HTM 02-01, NFPA 99 and ISO 7396-1 — see our full certifications on the About page.
          </p>
          <Link to="/about#certifications" className="bg-accent hover:bg-red-800 text-white px-8 py-3.5 text-xs font-bold uppercase tracking-wider transition-all hover:shadow-lg hover:shadow-red-900/30 active:scale-95 inline-flex items-center gap-2 shadow-md">
            OUR CERTIFICATIONS <FaArrowRight />
          </Link>
        </div>
        <div className="w-full lg:w-[60%]">
          <p className="text-accent font-bold uppercase tracking-widest text-sm mb-4">SYSTEM LAYOUT DIAGRAM</p>
          <div className="w-full border border-gray-200 rounded-lg overflow-hidden bg-gray-50 p-6">
            <div className="w-full aspect-video relative rounded-md overflow-hidden">
              <img src={renderImg} alt="MGPS System Layout Diagram" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-wrap gap-6 mt-4 justify-center">
              {[
                { color: 'bg-green-500', label: 'Oxygen' },
                { color: 'bg-blue-600', label: 'Nitrous Oxide' },
                { color: 'bg-yellow-400', label: 'Medical Air' },
                { color: 'bg-gray-800', label: 'Vacuum' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className={`w-4 h-1.5 rounded-full ${item.color}`} />
                  <span className="text-[10px] font-bold text-gray-600 uppercase">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function KeyFeaturesBenefitsSection() {
  return (
    <section className="bg-[#0B1A28] py-20 max-w-full mx-auto px-4 sm:px-8 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-accent font-bold uppercase tracking-widest text-sm mb-2">Key Features</p>
          <h2 className="text-white font-extrabold text-3xl lg:text-4xl leading-tight">Engineered For Safety & Reliability</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {keyFeatures.map((f, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-accent/20 text-accent flex items-center justify-center mb-4">
                <f.icon size={20} />
              </div>
              <h3 className="text-white font-bold text-sm mb-2">{f.title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mb-12">
          <p className="text-accent font-bold uppercase tracking-widest text-sm mb-2">Benefits</p>
          <h2 className="text-white font-extrabold text-3xl lg:text-4xl leading-tight">Why Hospitals Choose MGPS</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-accent/20 text-accent flex items-center justify-center mb-4 mx-auto">
                <b.icon size={20} />
              </div>
              <h3 className="text-white font-bold text-sm mb-2">{b.title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-10 border-t border-white/10 flex flex-wrap justify-center gap-4">
          <Link to="/modular-ot" className="border border-white/30 text-white hover:bg-white/10 font-bold text-xs uppercase px-8 py-3 inline-flex items-center gap-2 transition-all">
            See Modular OT <FaArrowRight />
          </Link>
          <Link to="/clinical-systems" className="border border-white/30 text-white hover:bg-white/10 font-bold text-xs uppercase px-8 py-3 inline-flex items-center gap-2 transition-all">
            See Clinical Systems <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function MgpsSolutionsPage() {
  const { contentMap } = useContent('services');

  return (
    <div className="pt-24">
      <Seo
        title="Medical Gas Pipeline Systems (MGPS)"
        description="HTM 02-01, NFPA 99 and ISO 7396-1 compliant medical gas pipeline systems: oxygen generation plants, manifolds, zone valve boxes, alarm systems and bed head units, designed, installed and supported by Multan Chemicals Limited."
        path="/mgps-solutions"
      />
      <HeroSection c={contentMap} />
      <OverviewSection c={contentMap} />
      <ComponentsSection />
      <EquipmentSection />
      <ComplianceDiagramSection c={contentMap} />
      <KeyFeaturesBenefitsSection />
    </div>
  );
}
