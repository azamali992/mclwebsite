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
    <section id="clients" className="bg-canvas px-6 py-24 sm:px-8 lg:px-12 scroll-mt-28">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-24">
        <div
          ref={industriesRef}
          className={`transition-[opacity,transform] duration-500 ease-out ${industriesInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
        >
          <p className="eyebrow mb-4">{industriesHeading}</p>
          <h2 className="mb-10 max-w-2xl text-3xl font-semibold tracking-tight text-ink md:text-[2.5rem]">{industriesTitle}</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11">
            {industries.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  style={{ transitionDelay: industriesInView ? `${i * 35}ms` : '0ms' }}
                  className={`group flex aspect-square flex-col items-center justify-center rounded-md border border-line bg-canvas p-3 text-center transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:border-line-strong hover:shadow-[var(--shadow-md)] ${
                    industriesInView ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                  }`}
                >
                  <Icon className="text-muted transition-colors duration-200 group-hover:text-accent" size={26} />
                  <span className="mt-3 text-[11px] font-medium leading-tight text-ink">{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div
          ref={clientsRef}
          className={`transition-[opacity,transform] duration-500 ease-out ${clientsInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
        >
          <h3 className="mb-8 text-center text-sm font-medium text-muted">{clientsHeading}</h3>
          <ClientsMarquee />
        </div>
      </div>
      <Certifications className="px-0 pt-24" />
    </section>
  );
}
