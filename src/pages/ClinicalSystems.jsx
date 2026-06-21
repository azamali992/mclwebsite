import { useState } from 'react';
import { FaCheck, FaArrowRight, FaXRay, FaHeartbeat, FaSun } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useInView from '../hooks/useInView';
import clinicalHero from '../assets/products/anesthesia-workstation.png';
import ultrasoundTrolley from '../assets/products/ultrasound-trolley.png';
import xrayFixed from '../assets/products/xray-fixed.png';
import cArm from '../assets/products/c-arm.png';
import anesthesiaWorkstation from '../assets/products/anesthesia-workstation.png';
import patientMonitor from '../assets/products/patient-monitor.png';
import icuVentilator from '../assets/products/icu-ventilator.png';
import ecgSystem from '../assets/products/ecg-system.png';
import uvPhototherapy from '../assets/products/uv-phototherapy-cabin.png';

function SectionWrap({ children, className = '' }) {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </section>
  );
}

const groups = [
  {
    label: 'Diagnostic Imaging',
    icon: FaXRay,
    items: [
      { image: ultrasoundTrolley, title: 'Ultrasound (USG) Systems', features: ['Portable & trolley-mounted configurations', 'High-resolution real-time imaging with Doppler', 'Abdominal, cardiology & obstetric applications', 'User-friendly for fast clinical workflow'] },
      { image: xrayFixed, title: 'X-Ray Systems', features: ['Fixed & mobile/portable configurations', 'High-resolution digital imaging output', 'PACS-ready integration', 'Reduced radiation exposure'] },
      { image: cArm, title: 'C-Arm Systems', features: ['Real-time fluoroscopic imaging', 'Used in orthopedic & cardiovascular procedures', 'Compact, mobile design', 'High-quality imaging with reduced dose'] },
    ],
  },
  {
    label: 'Critical Care & Life Support',
    icon: FaHeartbeat,
    items: [
      { image: anesthesiaWorkstation, title: 'Anesthesia Workstation', features: ['Integrated heated breathing circuit', 'Advanced ventilation modes', 'Supports neonatal, pediatric & adult patients', 'Precise gas delivery & monitoring'] },
      { image: patientMonitor, title: 'Multi-Parameter Patient Monitor', features: ['12.1"/15" touchscreen display options', 'ICU, CCU & NICU monitoring', '12-lead ECG with arrhythmia mapping', 'Scalable to clinical requirements'] },
      { image: icuVentilator, title: 'ICU Medical Ventilator', features: ['Invasive, non-invasive & high-flow modes', 'Neonatal to adult patient support', 'Microprocessor-controlled precision', 'Advanced respiratory monitoring & alarms'] },
      { image: ecgSystem, title: '12-Channel ECG System', features: ['8" high-resolution touchscreen', '12-channel simultaneous recording', 'Glasgow interpretation algorithm', 'Up to 10-hour battery backup'] },
    ],
  },
  {
    label: 'Specialized Therapeutic',
    icon: FaSun,
    items: [
      { image: uvPhototherapy, title: 'Medical UV Phototherapy Cabin', features: ['UVA, Narrowband UVB & combined wavelengths', 'Treats vitiligo, psoriasis & eczema', 'Uniform radiation distribution', 'Safety-controlled exposure system'] },
    ],
  },
];

function EquipmentCard({ image, title, features, index }) {
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
      <div className="aspect-[4/3] overflow-hidden bg-gray-50">
        <img src={image} alt={title} className="object-contain w-full h-full p-4 group-hover:scale-105 transition-transform duration-500" />
      </div>
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

export default function ClinicalSystems() {
  return (
    <div className="pt-24">
      <section className="w-full relative bg-slate-900 py-24 px-4 sm:px-8 lg:px-12 overflow-hidden">
        <img src={clinicalHero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-900" />
        <div className="relative max-w-[1400px] mx-auto text-center">
          <p className="text-mclRed font-bold uppercase tracking-widest text-sm mb-3">Clinical & Diagnostic Systems</p>
          <h1 className="text-white font-extrabold text-4xl lg:text-5xl leading-tight mb-4">
            Integrated Clinical & Diagnostic Equipment
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            From diagnostic imaging to critical care and specialized therapy — equipment supplied, installed and supported for reliable clinical performance.
          </p>
        </div>
      </section>

      {groups.map((group, gi) => (
        <SectionWrap key={group.label} className={`py-20 px-4 sm:px-8 lg:px-12 ${gi % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}>
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-mclRed flex items-center justify-center flex-shrink-0">
                <group.icon size={20} />
              </div>
              <h2 className="text-gray-900 font-extrabold text-2xl lg:text-3xl">{group.label}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.items.map((item, i) => (
                <EquipmentCard key={item.title} index={i} {...item} />
              ))}
            </div>
          </div>
        </SectionWrap>
      ))}

      <SectionWrap className="py-16 bg-gradient-to-r from-mclRed to-red-700 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          <div>
            <p className="text-white/80 font-bold uppercase tracking-widest text-xs mb-2">Explore More</p>
            <h2 className="text-white font-extrabold text-2xl lg:text-3xl">Looking for MGPS or Modular OT solutions too?</h2>
          </div>
          <div className="flex flex-wrap gap-4 justify-center flex-shrink-0">
            <Link to="/mgps-solutions" className="bg-white text-mclRed font-bold text-sm uppercase px-6 py-3 inline-flex items-center gap-2 rounded transition-all hover:shadow-lg active:scale-95">
              MGPS Solutions <FaArrowRight size={12} />
            </Link>
            <Link to="/modular-ot" className="border-2 border-white text-white font-bold text-sm uppercase px-6 py-3 inline-flex items-center gap-2 rounded transition-all hover:bg-white hover:text-mclRed active:scale-95">
              Modular OT <FaArrowRight size={12} />
            </Link>
          </div>
        </div>
      </SectionWrap>
    </div>
  );
}
