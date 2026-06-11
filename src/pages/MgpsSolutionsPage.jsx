import { useState } from 'react';
import {
  FaCheck, FaArrowRight, FaDownload,
  FaRegBuilding, FaShieldAlt, FaFileAlt, FaStar, FaGem, FaClock,
  FaProjectDiagram, FaAward, FaHospital, FaHeadset,
  FaFlask, FaTint, FaWind, FaWater, FaCogs,
  FaBed, FaPlug, FaCompressArrowsAlt, FaThermometerHalf, FaBell, FaRecycle,
  FaMapMarkerAlt, FaUsers
} from 'react-icons/fa';
import useInView from '../hooks/useInView';
import renderImg from '../assets/3drender.png';
import heroBg from '../assets/hero01.JPG';
import pagedemo1 from '../assets/pagedemo1.jpeg';
import pagedemo2 from '../assets/pagedemo2.jpeg';
import pagedemo3 from '../assets/pagedemo3.jpeg';
import stationImg from '../assets/stationimg.JPG';

// ─── Section wrapper with scroll animation ───
function SectionWrap({ children, className = '' }) {
  const [ref, inView] = useInView();
  return (
    <section
      ref={ref}
      className={`transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </section>
  );
}

// ─── Data ───

const heroStats = [
  { icon: FaFileAlt, title: 'HTM 02-01', subtitle: 'Compliant' },
  { icon: FaShieldAlt, title: 'NFPA 99', subtitle: 'Compliant' },
  { icon: FaStar, title: 'ISO 7396-1', subtitle: 'Compliant' },
  { icon: FaGem, title: 'High Quality', subtitle: 'Materials' },
  { icon: FaRegBuilding, title: 'Expert Design', subtitle: '& Installation' },
  { icon: FaClock, title: '24/7 Service', subtitle: '& Maintenance' },
];

const overviewStats = [
  { icon: FaProjectDiagram, value: '100+', label: 'MGPS Projects Completed' },
  { icon: FaAward, value: '25+', label: 'Years of Experience' },
  { icon: FaHospital, value: '50,000+', label: 'Bed Capacity Connected' },
  { icon: FaShieldAlt, value: '100%', label: 'Quality & Safety Assurance' },
  { icon: FaHeadset, value: '24/7', label: 'After Sales Support' },
];

const componentsData = [
  { category: 'Gas Sources', image: null, title: 'Oxygen Generation Plant', desc: 'PSA based on-site oxygen generation systems' },
  { category: 'Storage Systems', image: null, title: 'Bulk Storage Tanks', desc: 'Cryogenic liquid oxygen / nitrogen storage' },
  { category: 'Distribution', image: null, title: 'Cylinder Manifold System', desc: 'High pressure cylinder manifolds with auto changeover' },
  { category: 'Gas Sources', image: null, title: 'Medical Air System', desc: 'Instrument quality compressed medical air' },
  { category: 'Gas Sources', image: null, title: 'Vacuum Pump System', desc: 'Central medical vacuum suction systems' },
];

const compGradients = [
  'from-green-400 to-green-600',
  'from-blue-400 to-blue-600',
  'from-purple-400 to-purple-600',
  'from-cyan-400 to-cyan-600',
  'from-orange-400 to-orange-600',
];
const compIcons = [FaFlask, FaTint, FaCogs, FaWind, FaWater];

const equipmentData = [
  { image: null, title: 'Bed Head Units', desc: 'Modular patient terminals with gas outlets' },
  { image: null, title: 'Medical Gas Outlets', desc: 'Quick connect colour coded outlets' },
  { image: null, title: 'Zone Valves', desc: 'Emergency shut-off zone valve boxes' },
  { image: null, title: 'Pressure Regulators', desc: 'Line pressure regulators & alarms' },
  { image: null, title: 'Alarm Panels', desc: 'Master & area alarm monitoring panels' },
  { image: null, title: 'AGSS', desc: 'Anaesthetic gas scavenging systems' },
];

const equipGradients = [
  'from-teal-400 to-teal-600',
  'from-indigo-400 to-indigo-600',
  'from-rose-400 to-rose-600',
  'from-amber-400 to-amber-600',
  'from-lime-400 to-lime-600',
  'from-sky-400 to-sky-600',
];
const equipIcons = [FaBed, FaPlug, FaCompressArrowsAlt, FaThermometerHalf, FaBell, FaRecycle];

const complianceItems = [
  'HTM 02-01 – Medical Gas Pipeline Systems',
  'NFPA 99 – Health Care Facilities Code',
  'ISO 7396-1 – Medical Gas Pipeline Systems',
  'ISO 9001:2015 – Quality Management',
  'ISO 13485 – Medical Devices QMS',
];

const projectsData = [
  { name: 'Shifa International', location: 'Islamabad', beds: '450 Beds', img: pagedemo1 },
  { name: 'PKLI', location: 'Lahore', beds: '500 Beds', img: pagedemo2 },
  { name: 'Allied Hospital', location: 'Faisalabad', beds: '800 Beds', img: pagedemo3 },
  { name: 'Indus Hospital', location: 'Karachi', beds: '600 Beds', img: stationImg },
  { name: 'Private Hospital', location: 'Peshawar', beds: '350 Beds', img: heroBg },
];

const tabCategories = ['Gas Sources', 'Storage Systems', 'Distribution', 'Monitoring', 'All'];

const overviewChecklist = [
  'Centralized supply of medical gases',
  'ICU, CCU & Operation Theatre solutions',
  'Bed head units & pendants',
  'Alarm & monitoring systems',
];

function PlaceholderImg({ gradient, icon: Icon, className = '' }) {
  return (
    <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient} ${className}`}>
      <Icon className="text-white/40" size={48} />
    </div>
  );
}

// ─── Section 1: Hero ───
function HeroSection() {
  return (
    <section className="w-full relative bg-slate-900 min-h-[600px] lg:min-h-[700px] overflow-hidden">
      {/* Background image covering right 60% */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={heroBg}
          alt="Hospital ICU"
          className="absolute right-0 top-0 w-full lg:w-[60%] h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 h-full min-h-[600px] lg:min-h-[700px] flex flex-col justify-center">
        <div className="max-w-2xl">
          <p className="text-mclRed font-bold uppercase tracking-widest text-sm mb-4">
            MGPS SOLUTIONS
          </p>
          <h1 className="text-white font-extrabold text-4xl lg:text-5xl leading-tight mb-6">
            Complete Medical Gas Pipeline Solutions
          </h1>
          <p className="text-gray-300 text-base leading-relaxed mb-8 max-w-xl">
            We design, supply, install, test and commission complete Medical Gas
            Pipeline Systems in accordance with HTM 02-01, NFPA 99, ISO 7396-1 and
            other international standards.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-mclRed hover:bg-red-800 text-white px-8 py-3.5 text-xs font-bold uppercase tracking-wider transition-all hover:shadow-lg hover:shadow-red-900/30 active:scale-95 inline-flex items-center gap-2 shadow-md">
              EXPLORE SOLUTIONS <FaArrowRight />
            </button>
            <button className="border border-white/30 hover:bg-white/10 text-white px-8 py-3.5 text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2">
              <FaDownload /> DOWNLOAD BROCHURE
            </button>
          </div>
        </div>
      </div>

      {/* Floating Stats Bar */}
      <div className="relative z-20 -mt-12 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="bg-white rounded-lg shadow-xl flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {heroStats.map((stat, i) => (
            <div key={i} className="flex-1 flex items-center justify-center gap-3 p-5">
              <stat.icon className="text-mclRed flex-shrink-0" size={20} />
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

// ─── Section 2: MGPS Overview ───
function OverviewSection() {
  const [leftRef, leftInView] = useInView();
  const [rightRef, rightInView] = useInView();
  const [statsRef, statsInView] = useInView();

  return (
    <section className="py-20 bg-white max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
      {/* Top 2-column split */}
      <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 items-center">
        {/* Left */}
        <div
          ref={leftRef}
          className={`w-full lg:w-1/2 transition-all duration-700 ${
            leftInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
        >
          <p className="text-mclRed font-bold uppercase tracking-widest text-sm mb-2">
            MGPS OVERVIEW
          </p>
          <h2 className="text-gray-900 font-extrabold text-3xl lg:text-4xl leading-tight mb-6">
            Safe. Reliable. Life-Supporting.
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            Our engineering team delivers end-to-end medical gas pipeline solutions
            with uncompromising safety. From design and supply through installation,
            testing and commissioning, every system we build meets the highest
            international standards for patient safety and operational reliability.
          </p>
          <ul className="space-y-3 mb-8">
            {overviewChecklist.map((item, i) => (
              <li key={i} className="flex items-start group">
                <FaCheck className="text-mclRed mt-1 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" size={14} />
                <span className="text-gray-700 text-sm font-medium">{item}</span>
              </li>
            ))}
          </ul>
          <button className="bg-mclRed hover:bg-red-800 text-white px-8 py-3.5 text-xs font-bold uppercase tracking-wider transition-all hover:shadow-lg hover:shadow-red-900/30 active:scale-95 inline-flex items-center gap-2 shadow-md">
            REQUEST A CONSULTATION <FaArrowRight />
          </button>
        </div>

        {/* Right image */}
        <div
          ref={rightRef}
          className={`w-full lg:w-1/2 transition-all duration-700 delay-200 ${
            rightInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}
        >
          <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
            <img
              src={renderImg}
              alt="3D Hospital Layout"
              className="w-full h-full object-contain bg-gray-50 p-4"
            />
          </div>
        </div>
      </div>

      {/* Bottom stats row */}
      <div
        ref={statsRef}
        className={`mt-16 pt-8 border-t border-gray-100 transition-all duration-700 delay-300 ${
          statsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {overviewStats.map((stat, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border border-mclRed/20 bg-red-50 flex items-center justify-center">
                <stat.icon className="text-mclRed" size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900 leading-none">{stat.value}</span>
                <span className="text-xs text-gray-500 mt-1">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 3: MGPS System Components ───
function ComponentsSection() {
  const [activeTab, setActiveTab] = useState('Gas Sources');

  const filtered = activeTab === 'All'
    ? componentsData
    : componentsData.filter((c) => c.category === activeTab);

  return (
    <section className="py-16 bg-white max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
      <p className="text-mclRed font-bold uppercase tracking-widest text-sm text-center mb-8">
        MGPS SYSTEM COMPONENTS
      </p>

      {/* Tabs */}
      <div className="flex justify-center gap-4 overflow-x-auto text-sm font-semibold pb-4">
        {tabCategories.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap pb-2 border-b-2 transition-colors ${
              activeTab === tab
                ? 'text-mclRed border-mclRed'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-8">
        {filtered.map((comp, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="aspect-square overflow-hidden">
              <PlaceholderImg
                gradient={compGradients[i % compGradients.length]}
                icon={compIcons[i % compIcons.length]}
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-sm text-gray-900 mb-1">{comp.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{comp.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <button className="border border-mclRed/30 text-mclRed hover:bg-red-50 font-bold text-xs uppercase px-8 py-3 inline-flex items-center gap-2 transition-all">
          VIEW ALL COMPONENTS <FaArrowRight />
        </button>
      </div>
    </section>
  );
}

// ─── Section 4: MGPS Equipment ───
function EquipmentSection() {
  return (
    <section className="bg-gray-50 py-20 max-w-full mx-auto px-4 sm:px-8 lg:px-12">
      <div className="max-w-[1400px] mx-auto text-center mb-10">
        <p className="text-mclRed font-bold uppercase tracking-widest text-sm mb-2">
          MGPS EQUIPMENT
        </p>
        <h2 className="text-gray-900 font-extrabold text-3xl lg:text-4xl leading-tight">
          High Quality Equipment For Maximum Safety
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-[1400px] mx-auto mt-10">
        {equipmentData.map((item, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 group hover:shadow-md transition-shadow">
            <div className="aspect-square rounded-md overflow-hidden mb-3">
              <PlaceholderImg
                gradient={equipGradients[i % equipGradients.length]}
                icon={equipIcons[i % equipIcons.length]}
              />
            </div>
            <h3 className="font-bold text-xs text-gray-900 text-center mb-1">{item.title}</h3>
            <p className="text-[10px] text-gray-500 text-center leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <button className="border border-mclRed/30 text-mclRed hover:bg-red-50 font-bold text-xs uppercase px-8 py-3 inline-flex items-center gap-2 transition-all">
          VIEW ALL EQUIPMENTS <FaArrowRight />
        </button>
      </div>
    </section>
  );
}

// ─── Section 5: Compliance & Layout Diagram ───
function ComplianceDiagramSection() {
  return (
    <section className="py-20 bg-white max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        {/* Left 40% */}
        <div className="w-full lg:w-[40%]">
          <p className="text-mclRed font-bold uppercase tracking-widest text-sm mb-2">
            COMPLIANCE & STANDARDS
          </p>
          <h2 className="text-gray-900 font-extrabold text-3xl lg:text-4xl leading-tight mb-6">
            Built To International Standards
          </h2>
          <ul className="space-y-3 mb-8">
            {complianceItems.map((item, i) => (
              <li key={i} className="flex items-start group">
                <FaCheck className="text-mclRed mt-1 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" size={14} />
                <span className="text-gray-700 text-sm font-medium">{item}</span>
              </li>
            ))}
          </ul>
          <button className="bg-mclRed hover:bg-red-800 text-white px-8 py-3.5 text-xs font-bold uppercase tracking-wider transition-all hover:shadow-lg hover:shadow-red-900/30 active:scale-95 inline-flex items-center gap-2 shadow-md">
            OUR CERTIFICATIONS <FaArrowRight />
          </button>
        </div>

        {/* Right 60% */}
        <div className="w-full lg:w-[60%]">
          <p className="text-mclRed font-bold uppercase tracking-widest text-sm mb-4">
            SYSTEM LAYOUT DIAGRAM
          </p>
          <div className="w-full border border-gray-200 rounded-lg overflow-hidden bg-gray-50 p-6">
            <div className="w-full aspect-video relative rounded-md overflow-hidden">
              <img
                src={renderImg}
                alt="MGPS System Layout Diagram"
                className="w-full h-full object-contain"
              />
            </div>
            {/* Color legend */}
            <div className="flex flex-wrap gap-6 mt-4 justify-center">
              <div className="flex items-center gap-2">
                <span className="w-4 h-1.5 rounded-full bg-green-500" />
                <span className="text-[10px] font-bold text-gray-600 uppercase">Oxygen</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-1.5 rounded-full bg-blue-600" />
                <span className="text-[10px] font-bold text-gray-600 uppercase">Nitrous Oxide</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-1.5 rounded-full bg-yellow-400" />
                <span className="text-[10px] font-bold text-gray-600 uppercase">Medical Air</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-1.5 rounded-full bg-gray-800" />
                <span className="text-[10px] font-bold text-gray-600 uppercase">Vacuum</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 6: Our MGPS Projects ───
function ProjectsSection() {
  return (
    <section className="bg-[#0B1A28] py-20 max-w-full mx-auto px-4 sm:px-8 lg:px-12">
      <div className="max-w-[1400px] mx-auto text-center mb-10">
        <p className="text-mclRed font-bold uppercase tracking-widest text-sm mb-2">
          OUR MGPS PROJECTS
        </p>
        <h2 className="text-white font-extrabold text-3xl lg:text-4xl leading-tight">
          Delivering Excellence Across Pakistan
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-[1400px] mx-auto mt-10">
        {projectsData.map((project, i) => (
          <div
            key={i}
            className="aspect-[3/4] relative rounded-lg overflow-hidden group cursor-pointer"
          >
            <img
              src={project.img}
              alt={project.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1A28] via-[#0B1A28]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4">
              <h3 className="text-white font-bold text-sm leading-tight">{project.name}</h3>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="flex items-center gap-1 text-gray-400 text-xs">
                  <FaMapMarkerAlt size={10} />
                  {project.location}
                </span>
                <span className="flex items-center gap-1 text-gray-400 text-xs">
                  <FaUsers size={10} />
                  {project.beds}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <button className="border border-white/30 text-white hover:bg-white/10 font-bold text-xs uppercase px-8 py-3 inline-flex items-center gap-2 transition-all">
          VIEW ALL PROJECTS <FaArrowRight />
        </button>
      </div>
    </section>
  );
}

// ─── Main Page ───
export default function MgpsSolutionsPage() {
  return (
    <div className="pt-24">
      <HeroSection />
      <OverviewSection />
      <ComponentsSection />
      <EquipmentSection />
      <ComplianceDiagramSection />
      <ProjectsSection />
    </div>
  );
}
