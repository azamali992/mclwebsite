import { useState } from 'react';
import {
  FaShieldAlt, FaCogs, FaLightbulb, FaArrowRight, FaCheck,
  FaSlidersH, FaBolt, FaDoorOpen, FaRocket, FaExpandArrowsAlt, FaWrench,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useInView from '../hooks/useInView';
import otHero from '../assets/products/modular-ot-hero.jpeg';
import wallCeiling from '../assets/products/wall-ceiling-system.png';
import surgicalLighting from '../assets/products/surgical-lighting-system.jpeg';
import medicalPendants from '../assets/products/medical-pendants.jpeg';
import itPowerSupply from '../assets/products/it-power-supply-system.jpeg';
import operatingTable from '../assets/products/operating-table.jpeg';
import laminarAirFlow from '../assets/products/laminar-air-flow.jpeg';
import medicalCabinets from '../assets/products/medical-cabinets.png';
import xrayViewer from '../assets/products/xray-viewer.png';
import subStructure from '../assets/products/sub-structure.png';

function SectionWrap({ children, className = '' }) {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </section>
  );
}

const heroHighlights = [
  { icon: FaRocket, label: 'Rapid Installation' },
  { icon: FaShieldAlt, label: 'Infection Control' },
  { icon: FaExpandArrowsAlt, label: 'Modular Expansion' },
  { icon: FaWrench, label: 'Easy Maintenance' },
];

const whyModular = [
  {
    icon: FaShieldAlt,
    title: 'Sterility & Infection Control',
    bullets: ['Non-porous, seamless surfaces', 'Minimizes chemical disinfection needs', 'Sterile airflow & contamination control'],
  },
  {
    icon: FaCogs,
    title: 'Workflow Optimization',
    bullets: ['Concealed wiring & gas pipelines', 'Unobstructed surgical workspace', 'Ergonomic layout for staff movement'],
  },
  {
    icon: FaLightbulb,
    title: 'Aesthetic & Clinical Environment',
    bullets: ['Optimized Lux lighting levels', 'Advanced air quality & ventilation', 'Customizable, calming finishes'],
  },
];

const components = [
  { image: wallCeiling, title: 'Wall & Ceiling System', features: ['Steel or tempered glass panels', 'Anti-microbial coated surfaces', 'Rounded corners eliminate contamination points', 'Integrated air duct provisions'] },
  { image: surgicalLighting, title: 'Surgical Lighting System', features: ['Ceiling-mounted high-intensity LED lights', 'Illumination exceeding 1300 Lux', 'Shadow-free precision lighting', 'Adjustable positioning'] },
  { image: medicalPendants, title: 'Medical Pendants', features: ['Medical gas outlets & power points', 'Data and communication ports', 'Equipment shelves & accessory storage', 'Adjustable height and positioning'] },
  { icon: FaSlidersH, title: 'OT Control Panel', features: ['Medical gas supply monitoring', 'HVAC and lighting control', 'Equipment and system alarms'] },
  { image: itPowerSupply, title: 'IT Power Supply System', features: ['Medical-grade isolation transformer', 'Insulation monitoring device', 'Line fault detection system', 'Dedicated grounding system'] },
  { icon: FaBolt, title: 'Anti-Static Flooring', features: ['Prevents electrostatic discharge', 'Protects sensitive surgical equipment', 'Durable, seamless, easy-to-clean'] },
  { image: operatingTable, title: 'Operating Table', features: ['Adjustable for multi-specialty use', 'High stability, load-bearing design', 'Ergonomic surgical precision'] },
  { image: laminarAirFlow, title: 'Laminar Air Flow', features: ['Unidirectional, ultra-clean airflow', 'HEPA filtration technology', 'Reduces risk of surgical site infection'] },
  { icon: FaDoorOpen, title: 'Automatic Sliding Door', features: ['Touch-free automatic operation', 'Airtight sealing for infection control', 'Smooth, silent, reliable performance'] },
  { image: medicalCabinets, title: 'Medical Cabinets', features: ['Hygienic, easy-to-clean surfaces', 'Optimized instrument storage', 'Corrosion-resistant construction'] },
  { image: xrayViewer, title: 'X-Ray Viewer', features: ['High-brightness, uniform illumination', 'Slim, space-efficient design', 'Energy-efficient operation'] },
  { image: subStructure, title: 'Sub Structure', features: ['High-strength structural framework', 'Supports all OT services & utilities', 'Facilitates future modifications'] },
];

function ComponentCard({ image, icon: Icon, title, features, index }) {
  const [expanded, setExpanded] = useState(false);
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      onClick={() => setExpanded(!expanded)}
      style={{ transitionDelay: inView ? `${(index % 6) * 60}ms` : '0ms' }}
      className={`bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer group ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      {image ? (
        <div className="aspect-[4/3] overflow-hidden">
          <img src={image} alt={title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
        </div>
      ) : (
        <div className="aspect-[4/3] bg-gradient-to-br from-slate-800 to-mclRed flex items-center justify-center">
          <Icon className="text-white" size={40} />
        </div>
      )}
      <div className="p-5">
        <h3 className="text-gray-900 font-bold text-base mb-2">{title}</h3>
        <div className={`grid transition-all duration-300 ease-in-out ${expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`} style={{ display: 'grid' }}>
          <div className="overflow-hidden">
            <ul className="space-y-1.5 pt-1 pb-2">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                  <FaCheck className="text-mclRed mt-0.5 flex-shrink-0" size={10} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <span className="text-xs font-semibold text-mclRed uppercase tracking-wide">{expanded ? 'Show less' : 'Key features'}</span>
      </div>
    </div>
  );
}

export default function ModularOT() {
  return (
    <div className="pt-24">
      <section className="w-full relative bg-slate-900 py-24 px-4 sm:px-8 lg:px-12 overflow-hidden">
        <img src={otHero} alt="Modular Operation Theatre" className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-900" />
        <div className="relative max-w-[1400px] mx-auto text-center">
          <p className="text-mclRed font-bold uppercase tracking-widest text-sm mb-3">Modular Operation Theatre</p>
          <h1 className="text-white font-extrabold text-4xl lg:text-5xl leading-tight mb-4">
            Pre-Fabricated. Sterile By Design.
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-10">
            A high-performance, steel-structured surgical environment with seamless sterile wall systems and advanced infection control engineering — without compromising structural strength or flexibility.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {heroHighlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2 text-white">
                <h.icon className="text-mclRed" size={18} />
                <span className="text-sm font-semibold">{h.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionWrap className="py-20 bg-white px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-mclRed font-bold uppercase tracking-widest text-sm mb-2">Why Modular OT?</p>
            <h2 className="text-gray-900 font-extrabold text-3xl lg:text-4xl leading-tight">Built For The Surgical Environment</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyModular.map((w, i) => (
              <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-7 hover:shadow-lg transition-all">
                <div className="w-14 h-14 rounded-xl bg-mclRed/10 text-mclRed flex items-center justify-center mb-5">
                  <w.icon size={24} />
                </div>
                <h3 className="text-gray-900 font-bold text-lg mb-3">{w.title}</h3>
                <ul className="space-y-2">
                  {w.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                      <FaCheck className="text-mclRed mt-1 flex-shrink-0" size={11} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </SectionWrap>

      <SectionWrap className="py-20 bg-gray-50 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-mclRed font-bold uppercase tracking-widest text-sm mb-2">Components</p>
            <h2 className="text-gray-900 font-extrabold text-3xl lg:text-4xl leading-tight">Everything Inside The Modular OT</h2>
            <p className="text-gray-500 text-sm mt-3 max-w-2xl mx-auto">Click a card to see its key features.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {components.map((comp, i) => (
              <ComponentCard key={comp.title} index={i} {...comp} />
            ))}
          </div>
        </div>
      </SectionWrap>

      <SectionWrap className="py-16 bg-gradient-to-r from-mclRed to-red-700 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          <div>
            <p className="text-white/80 font-bold uppercase tracking-widest text-xs mb-2">Explore More</p>
            <h2 className="text-white font-extrabold text-2xl lg:text-3xl">Looking for MGPS or clinical equipment too?</h2>
          </div>
          <div className="flex flex-wrap gap-4 justify-center flex-shrink-0">
            <Link to="/mgps-solutions" className="bg-white text-mclRed font-bold text-sm uppercase px-6 py-3 inline-flex items-center gap-2 rounded transition-all hover:shadow-lg active:scale-95">
              MGPS Solutions <FaArrowRight size={12} />
            </Link>
            <Link to="/clinical-systems" className="border-2 border-white text-white font-bold text-sm uppercase px-6 py-3 inline-flex items-center gap-2 rounded transition-all hover:bg-white hover:text-mclRed active:scale-95">
              Clinical Systems <FaArrowRight size={12} />
            </Link>
          </div>
        </div>
      </SectionWrap>
    </div>
  );
}
