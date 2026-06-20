import { Link } from 'react-router-dom';
import { FaIndustry, FaMedkit, FaNetworkWired, FaHeartbeat, FaAtom, FaFire, FaArrowRight } from 'react-icons/fa';
import useContent from '../hooks/useContent';
import useInView from '../hooks/useInView';
import infra01 from '../assets/infra01.JPG';
import infra02 from '../assets/infra02.JPG';
import infra03 from '../assets/infra03.JPG';
import infra04 from '../assets/infra04.JPG';
import hero01 from '../assets/hero01.JPG';
import hero02 from '../assets/hero02.JPG';

function DivisionCard({ div, index }) {
  const [ref, inView] = useInView();

  return (
    <Link
      to={div.link}
      ref={ref}
      className={`flex flex-col bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-mclRed focus-visible:outline-none ${
        inView ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={div.img}
          alt={div.title}
          loading="lazy"
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
      </div>
      <div className="relative flex justify-center">
        <div className="absolute -top-8 bg-white p-1.5 rounded-full shadow-md z-10">
          <div className="w-14 h-14 rounded-full border-2 border-dashed border-mclRed flex items-center justify-center text-mclRed bg-white group-hover:bg-mclRed group-hover:text-white transition-all duration-300">
            {div.icon}
          </div>
        </div>
      </div>
      <div className="pt-10 pb-6 px-4 flex-1 flex flex-col items-center text-center">
        <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight group-hover:text-mclRed transition-colors">
          {div.title}
        </h3>
        <p className="text-xs text-gray-600 mb-6 flex-1 leading-relaxed">
          {div.desc}
        </p>
        <span aria-hidden="true" className="text-xs font-bold text-mclRed uppercase tracking-wider flex items-center gap-1 group-hover:gap-3 transition-all">
          Explore <FaArrowRight className="group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </Link>
  );
}

const defaultDivisions = [
  { id: 1, icon: <FaIndustry size={24} />, img: infra01, link: '/products?category=industrial' },
  { id: 2, icon: <FaMedkit size={24} />, img: hero01, link: '/products?category=medical' },
  { id: 3, icon: <FaNetworkWired size={24} />, img: infra02, link: '/products?category=mgps' },
  { id: 4, icon: <FaHeartbeat size={24} />, img: hero02, link: '/products?category=modular' },
  { id: 5, icon: <FaAtom size={24} />, img: infra03, link: '/products?category=specialty' },
  { id: 6, icon: <FaFire size={24} />, img: infra04, link: '/products?category=lpg' },
];

export default function BusinessDivisions() {
  const { contentMap } = useContent('divisions');

  const divisions = defaultDivisions.map((d, i) => {
    const c = contentMap[`div-${d.id}`];
    return {
      ...d,
      title: c?.title || ['Industrial Gases', 'Medical Gases', 'MGPS Solutions', 'Biomedical Engineering', 'Specialty Gases', 'LPG Division'][i],
      desc: c?.description || ['Complete range of industrial gases for diverse applications across industries.', 'High purity medical gases ensuring safety, reliability & patient care.', 'Design, supply, installation & maintenance of Medical Gas Pipeline Systems.', 'Modular OT, hospital infrastructure & biomedical engineering solutions.', 'Special & calibration gases for research, laboratories & precision applications.', 'Safe, efficient & reliable LPG supply for domestic & commercial needs.'][i],
    };
  });

  return (
    <section id="business-divisions" className="py-20 bg-gray-50 max-w-full mx-auto px-4 sm:px-8 lg:px-12 scroll-mt-28">
      <div className="text-center mb-16">
        <h4 className="text-mclRed font-bold text-sm tracking-widest uppercase mb-2">
          Our Business Divisions
        </h4>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          Innovative Solutions. Reliable Performance.
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {divisions.map((div, index) => (
          <DivisionCard key={div.id} div={div} index={index} />
        ))}
      </div>
    </section>
  );
}
