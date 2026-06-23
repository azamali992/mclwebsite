import {
  FaHospital, FaIndustry, FaOilCan, FaLeaf, FaFlask, FaUtensils,
  FaTshirt, FaBolt, FaCar, FaWrench, FaMicroscope,
} from 'react-icons/fa';
import useContent from '../hooks/useContent';
import useInView from '../hooks/useInView';
import Certifications from './Certifications';
import ClientsMarquee from './ClientsMarquee';

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

export default function AboutSection3() {
  const { contentMap } = useContent('about');
  const [industriesRef, industriesInView] = useInView();
  const [clientsRef, clientsInView] = useInView();

  const industriesHeading = contentMap['section3-heading']?.title || 'Industries We Serve';
  const industriesTitle = contentMap['section3-title']?.title || 'Empowering Industries. Enriching Lives.';
  const clientsHeading = contentMap['clients-heading']?.title || 'Trusted by Leading Organizations';

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
          <ClientsMarquee />
        </div>
      </div>
      <Certifications className="px-0 pt-20" />
    </section>
  );
}
