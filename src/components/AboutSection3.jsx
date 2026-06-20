import { useRef } from 'react';
import {
  FaHospital, FaIndustry, FaOilCan, FaLeaf, FaFlask, FaUtensils,
  FaTshirt, FaBolt, FaCar, FaWrench, FaMicroscope,
  FaChevronLeft, FaChevronRight,
} from 'react-icons/fa';
import useContent from '../hooks/useContent';
import useInView from '../hooks/useInView';
import Certifications from './Certifications';

const industries = [
  { name: 'Healthcare', icon: FaHospital },
  { name: 'Steel & Metal', icon: FaIndustry },
  { name: 'Oil & Gas', icon: FaOilCan },
  { name: 'Fertilizer', icon: FaLeaf },
  { name: 'Chemical', icon: FaFlask },
  { name: 'Food & Beverage', icon: FaUtensils },
  { name: 'Textile', icon: FaTshirt },
  { name: 'Power Generation', icon: FaBolt },
  { name: 'Automotive', icon: FaCar },
  { name: 'Welding & Fabrication', icon: FaWrench },
  { name: 'Laboratories & Research', icon: FaMicroscope },
];

const clients = [
  'Engro Fertilizer', 'Bestway Cement', 'Pakistan Petroleum',
  'MOL Pakistan', 'Shakarganj Mills', 'Allied Hospital Faisalabad',
];

export default function AboutSection3() {
  const carouselRef = useRef(null);
  const { contentMap } = useContent('about');
  const [industriesRef, industriesInView] = useInView();
  const [clientsRef, clientsInView] = useInView();

  const industriesHeading = contentMap['section3-heading']?.title || 'Industries We Serve';
  const industriesTitle = contentMap['section3-title']?.title || 'Empowering Industries. Enriching Lives.';
  const clientsHeading = contentMap['clients-heading']?.title || 'Trusted by Leading Organizations';

  const scroll = (dir) => {
    if (carouselRef.current) {
      const amount = 300;
      carouselRef.current.scrollBy({ left: dir * amount, behavior: 'smooth' });
    }
  };

  return (
    <section id="clients" className="bg-white py-20 px-4 sm:px-8 lg:px-12 scroll-mt-28">
      <div className="max-w-[1400px] mx-auto flex flex-col space-y-20">
        <div
          ref={industriesRef}
          className={`transition-all duration-700 ${industriesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h3 className="text-red-600 font-bold uppercase tracking-widest text-sm mb-2">{industriesHeading}</h3>
          <h2 className="text-gray-900 font-extrabold text-3xl md:text-4xl mb-10">{industriesTitle}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  style={{ transitionDelay: industriesInView ? `${i * 40}ms` : '0ms' }}
                  className={`w-[calc(50%-8px)] sm:w-[calc(25%-12px)] md:w-[calc(16.666%-16px)] lg:w-[calc(9.09%-16px)] bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-mclRed hover:-translate-y-1 transition-all duration-500 p-4 flex flex-col items-center justify-center text-center aspect-square group ${
                    industriesInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                  }`}
                >
                  <Icon className="text-gray-400 group-hover:text-mclRed transition-colors" size={28} />
                  <span className="text-[10px] md:text-xs font-semibold text-gray-900 mt-3 leading-tight">{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div
          ref={clientsRef}
          className={`transition-all duration-700 ${clientsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h3 className="text-center text-red-600 font-bold uppercase tracking-widest text-sm mb-8">{clientsHeading}</h3>
          <div className="flex items-center justify-between gap-4">
            <button onClick={() => scroll(-1)} aria-label="Scroll left" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:scale-105 active:scale-95 shrink-0 transition-all">
              <FaChevronLeft size={14} />
            </button>
            <div ref={carouselRef} className="flex flex-1 items-center gap-4 overflow-x-auto no-scrollbar scroll-smooth">
              {clients.map((name) => (
                <div key={name} className="bg-white border border-gray-100 rounded-lg h-20 min-w-[140px] px-4 flex items-center justify-center grayscale hover:grayscale-0 transition-all flex-1 hover:shadow-md hover:border-gray-200 hover:-translate-y-0.5 cursor-pointer">
                  <span className="text-sm font-bold text-gray-500 tracking-wide uppercase">{name}</span>
                </div>
              ))}
            </div>
            <button onClick={() => scroll(1)} aria-label="Scroll right" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:scale-105 active:scale-95 shrink-0 transition-all">
              <FaChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
      <Certifications className="px-0 pt-20" />
    </section>
  );
}
