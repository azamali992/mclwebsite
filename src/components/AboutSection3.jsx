import { useRef } from 'react';
import {
  FaHospital, FaIndustry, FaOilCan, FaLeaf, FaFlask, FaUtensils,
  FaTshirt, FaBolt, FaCar, FaWrench, FaMicroscope,
  FaChevronLeft, FaChevronRight, FaCheckCircle,
} from 'react-icons/fa';

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
  'PAEC', 'Engro', 'Fatima', 'Nishat Chunian',
  'Bestway Cement', 'Shifa International', 'PKLI', 'Allied',
];

const certifications = [
  { color: 'blue', standard: 'ISO 9001:2015', desc: 'Quality Management' },
  { color: 'green', standard: 'ISO 14001:2015', desc: 'Environmental Management' },
  { color: 'red', standard: 'ISO 45001:2018', desc: 'Occupational Health & Safety' },
  { color: 'yellow', standard: 'GMP', desc: 'Good Manufacturing Practice' },
  { color: 'blue', standard: 'HTM 02-01', desc: 'Medical Gas Pipeline Systems' },
  { color: 'black', standard: 'NFPA 99', desc: 'Health Care Facilities Code' },
];

const badgeColorMap = {
  blue: 'border-blue-500 text-blue-600',
  green: 'border-green-500 text-green-600',
  red: 'border-red-500 text-red-600',
  yellow: 'border-yellow-500 text-yellow-600',
  black: 'border-gray-900 text-gray-900',
};

export default function AboutSection3() {
  const carouselRef = useRef(null);

  const scroll = (dir) => {
    if (carouselRef.current) {
      const amount = 300;
      carouselRef.current.scrollBy({ left: dir * amount, behavior: 'smooth' });
    }
  };

  return (
    <section id="clients" className="bg-white py-20 px-4 sm:px-8 lg:px-12 scroll-mt-28">
      <div className="max-w-[1400px] mx-auto flex flex-col space-y-20">
        {/* Tier 1: Industries We Serve */}
        <div>
          <h3 className="text-red-600 font-bold uppercase tracking-widest text-sm mb-2">
            Industries We Serve
          </h3>
          <h2 className="text-gray-900 font-extrabold text-3xl md:text-4xl mb-10">
            Empowering Industries. Enriching Lives.
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className="w-[calc(50%-8px)] sm:w-[calc(25%-12px)] md:w-[calc(16.666%-16px)] lg:w-[calc(9.09%-16px)] bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow p-4 flex flex-col items-center justify-center text-center aspect-square"
                >
                  <Icon className="text-gray-400" size={28} />
                  <span className="text-[10px] md:text-xs font-semibold text-gray-900 mt-3 leading-tight">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <button className="border border-red-200 text-red-600 hover:bg-red-50 font-bold text-xs uppercase px-8 py-3 transition-all inline-flex items-center gap-2 active:scale-95">
              View All Industries &rarr;
            </button>
          </div>
        </div>

        {/* Tier 2: Trusted by Leading Organizations */}
        <div>
          <h3 className="text-center text-red-600 font-bold uppercase tracking-widest text-sm mb-8">
            Trusted by Leading Organizations
          </h3>
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => scroll(-1)}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:scale-105 active:scale-95 shrink-0 transition-all"
            >
              <FaChevronLeft size={14} />
            </button>

            <div
              ref={carouselRef}
              className="flex flex-1 items-center gap-4 overflow-x-auto no-scrollbar scroll-smooth"
            >
              {clients.map((name) => (
                <div
                  key={name}
                  className="bg-white border border-gray-100 rounded-lg h-20 min-w-[140px] px-4 flex items-center justify-center grayscale hover:grayscale-0 transition-all flex-1 hover:shadow-md hover:border-gray-200 cursor-pointer"
                >
                  <span className="text-sm font-bold text-gray-500 tracking-wide uppercase">
                    {name}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => scroll(1)}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:scale-105 active:scale-95 shrink-0 transition-all"
            >
              <FaChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Tier 3: Certifications & Compliance */}
        <div>
          <h3 className="text-red-600 font-bold uppercase tracking-widest text-sm mb-2">
            Certifications & Compliance
          </h3>
          <h2 className="text-gray-900 font-extrabold text-3xl md:text-4xl mb-10">
            Quality. Safety. Responsibility.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {certifications.map((cert) => (
              <div
                key={cert.standard}
                className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${badgeColorMap[cert.color]}`}
                >
                  <FaCheckCircle size={28} />
                </div>
                <p className="font-bold text-gray-900 text-sm mt-4 mb-1">{cert.standard}</p>
                <p className="text-xs text-gray-500 font-medium">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
