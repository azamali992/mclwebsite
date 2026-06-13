
import { FaIndustry, FaMedkit, FaNetworkWired, FaHeartbeat, FaAtom, FaFire, FaArrowRight } from 'react-icons/fa';
import useInView from '../hooks/useInView';

function DivisionCard({ div, index }) {
  const [ref, inView] = useInView();

  return (
    <div 
      ref={ref}
      className={`flex flex-col bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-mclRed ${
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
        
        <button aria-label={`Explore ${div.title}`} className="text-xs font-bold text-mclRed uppercase tracking-wider flex items-center gap-1 group-hover:gap-3 transition-all focus:ring-2 focus:ring-mclRed focus:outline-none rounded px-2 py-1">
          Explore <FaArrowRight className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}

export default function BusinessDivisions() {
  const divisions = [
    {
      id: 1,
      title: "Industrial Gases",
      desc: "Complete range of industrial gases for diverse applications across industries.",
      icon: <FaIndustry size={24} />,
      img: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 2,
      title: "Medical Gases",
      desc: "High purity medical gases ensuring safety, reliability & patient care.",
      icon: <FaMedkit size={24} />,
      img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 3,
      title: "MGPS Solutions",
      desc: "Design, supply, installation & maintenance of Medical Gas Pipeline Systems.",
      icon: <FaNetworkWired size={24} />,
      img: "https://images.unsplash.com/photo-1584820927498-cafe2c1c7380?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 4,
      title: "Biomedical Engineering",
      desc: "Modular OT, hospital infrastructure & biomedical engineering solutions.",
      icon: <FaHeartbeat size={24} />,
      img: "https://images.unsplash.com/photo-1538108149393-ceeb66caf24a?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 5,
      title: "Specialty Gases",
      desc: "Special & calibration gases for research, laboratories & precision applications.",
      icon: <FaAtom size={24} />,
      img: "https://images.unsplash.com/photo-1614935151651-0bea6508ab6b?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 6,
      title: "LPG Division",
      desc: "Safe, efficient & reliable LPG supply for domestic & commercial needs.",
      icon: <FaFire size={24} />,
      img: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&q=80&w=800",
    }
  ];

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