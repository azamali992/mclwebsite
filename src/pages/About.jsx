import { useRef } from 'react';
import { FaFlask, FaIndustry, FaTruck, FaHospital, FaAward, FaBuilding, FaShieldAlt, FaChartBar, FaRocket, FaBurn, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import AboutSection1 from '../components/AboutSection1';
import AboutSection2 from '../components/AboutSection2';
import AboutSection3 from '../components/AboutSection3';
import useInView from '../hooks/useInView';
import heroBg from '../assets/hero02.JPG';

function AboutHero() {
  return (
    <section className="relative w-full bg-slate-900 py-28 px-4 sm:px-8 lg:px-12 overflow-hidden">
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-900/85 to-slate-900" />
      <div className="relative max-w-[1400px] mx-auto text-center">
        <p className="text-mclRed font-bold uppercase tracking-widest text-sm mb-3">Who We Are</p>
        <h1 className="text-white font-extrabold text-4xl lg:text-5xl leading-tight mb-4">Four Decades of Trust in Industrial & Medical Gases</h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">From a regional supplier in Multan to one of Pakistan's leading names in gas manufacturing and healthcare engineering.</p>
      </div>
    </section>
  );
}

const pageContent = {
  mission: {
    title: 'Our Mission',
    body: 'To ensure the continuous, safe, and efficient supply of high-purity medical and industrial gases across Pakistan. We are committed to engineering robust turnkey pipeline systems that safeguard human life in healthcare and drive productivity in manufacturing.',
  },
  vision: {
    title: 'Our Vision',
    body: 'To remain Pakistan\'s most trusted partner in gas infrastructure. We continuously expand our production capacity, modernize our distribution fleet, and engineer innovations to set the absolute national benchmark for industrial safety and purity.',
  },
  values: [
    { title: 'Safety First', desc: 'Strict adherence to Explosive Department of Pakistan (EDP) cylinder protocols and non-destructive structural testing before every filling cycle.' },
    { title: 'Unbroken Supply', desc: 'Maintaining a 24/7/365 operational grid driven by a company-owned logistics fleet and regional strategic storage units.' },
    { title: 'Certified Purity', desc: 'Zero-compromise chemical tracking compliant with ISO 9001 and Good Manufacturing Practices (GMP) ensuring 99.9% product purity.' },
  ],
};

const milestoneColors = [
  'from-red-500 to-red-700',
  'from-blue-500 to-blue-700',
  'from-emerald-500 to-emerald-700',
  'from-amber-500 to-amber-700',
  'from-purple-500 to-purple-700',
  'from-cyan-500 to-cyan-700',
  'from-rose-500 to-rose-700',
  'from-indigo-500 to-indigo-700',
];

const milestones = [
  { year: '1980', icon: FaBuilding, title: 'Establishment', desc: 'Multan Chemicals Limited is founded, beginning operations as a regional supplier of industrial gases in Multan.' },
  { year: '1985', icon: FaFlask, title: 'Expansion into Medical Gases', desc: 'MCL enters the medical gas market, becoming one of Pakistan\'s first companies to supply medical-grade oxygen to healthcare facilities.' },
  { year: '1992', icon: FaIndustry, title: 'First Major ASU', desc: 'Commissioning of our first Air Separation Unit, significantly increasing production capacity for oxygen, nitrogen, and argon.' },
  { year: '2000', icon: FaAward, title: 'ISO Certification', desc: 'Achieved ISO 9001 certification from SGS UK, marking our commitment to international quality management standards.' },
  { year: '2008', icon: FaTruck, title: 'Nationwide Distribution', desc: 'Expanded distribution network to 20+ company-owned filling stations and 30 authorized distributors across Pakistan.' },
  { year: '2015', icon: FaHospital, title: 'MGPS Division Launch', desc: 'Launched our Medical Gas Pipeline Systems (MGPS) division, providing end-to-end healthcare engineering solutions.' },
  { year: '2020', icon: FaIndustry, title: '125 TPD Plant in Faisalabad', desc: 'Commissioned Pakistan\'s largest liquid oxygen plant in Faisalabad with 125 TPD capacity, serving the entire nation.' },
  { year: '2024', icon: FaAward, title: 'Total Capacity 160+ TPD', desc: 'Reached a combined production capacity of over 160 tons per day across multiple plants, solidifying our position as the industry leader.' },
];

const comingSoonMilestones = [
  {
    year: 'Late 2026',
    icon: FaBurn,
    title: '900-Ton LPG Plant',
    desc: 'A new 900-ton LPG plant is coming online, expanding our fuel gas production capacity.',
    comingSoon: true,
  },
  {
    year: 'Dec 2027',
    icon: FaRocket,
    title: 'Capacity Expansion',
    desc: 'Production capacity set to grow by approximately 230 TPD, further strengthening nationwide supply.',
    comingSoon: true,
  },
];

function TimelineSection() {
  const [ref, inView] = useInView();
  const scrollRef = useRef(null);
  const items = [...milestones, ...comingSoonMilestones];

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
    }
  };

  return (
    <section ref={ref} className={`bg-gradient-to-b from-slate-900 to-slate-800 py-20 px-4 sm:px-8 lg:px-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-14">
          <p className="text-mclRed font-bold uppercase tracking-widest text-sm mb-2">Our Journey</p>
          <h2 className="text-white font-extrabold text-3xl lg:text-4xl leading-tight">Company History & Milestones</h2>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto text-sm">From a regional gas supplier to Pakistan's premier industrial and medical gas company — our story of growth, innovation, and what's ahead.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => scroll(-1)}
            aria-label="Scroll timeline left"
            className="hidden sm:flex w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center text-white transition-all duration-200 hover:scale-110 active:scale-90 focus:outline-none focus:ring-2 focus:ring-mclRed shrink-0"
          >
            <FaChevronLeft size={14} />
          </button>

          <div ref={scrollRef} className="overflow-x-auto pb-4 flex-1 no-scrollbar">
            <div className="relative flex gap-8 w-max px-2">
            <div className="absolute left-0 right-0 top-6 h-0.5 bg-white/10" />
            {items.map((mil, i) => {
              const MIcon = mil.icon;
              const comingSoon = !!mil.comingSoon;
              return (
                <div
                  key={i}
                  className={`relative flex flex-col items-center w-52 flex-shrink-0 transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  style={{ transitionDelay: inView ? `${i * 80}ms` : '0ms' }}
                >
                  <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                    comingSoon
                      ? 'bg-slate-800 border-2 border-dashed border-amber-400 animate-pulse'
                      : `bg-gradient-to-br ${milestoneColors[i % milestoneColors.length]}`
                  }`}>
                    <MIcon className={comingSoon ? 'text-amber-400' : 'text-white'} size={18} />
                  </div>

                  <div className={`mt-4 w-full rounded-xl p-4 text-center shadow-md ${
                    comingSoon
                      ? 'bg-slate-800/60 border-2 border-dashed border-amber-400/50'
                      : 'bg-slate-800/80 border border-white/10'
                  }`}>
                    {comingSoon ? (
                      <span className="inline-block bg-amber-400/15 text-amber-400 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full mb-1.5">Coming Soon</span>
                    ) : (
                      <p className="text-mclRed font-black text-lg">{mil.year}</p>
                    )}
                    {comingSoon && <p className="text-amber-400 font-black text-base mb-0.5">{mil.year}</p>}
                    <h3 className="text-white font-bold text-sm mt-0.5 leading-tight">{mil.title}</h3>
                    <p className="text-gray-400 text-xs mt-1.5 leading-relaxed">{mil.desc}</p>
                  </div>
                </div>
              );
            })}
            </div>
          </div>

          <button
            onClick={() => scroll(1)}
            aria-label="Scroll timeline right"
            className="hidden sm:flex w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center text-white transition-all duration-200 hover:scale-110 active:scale-90 focus:outline-none focus:ring-2 focus:ring-mclRed shrink-0"
          >
            <FaChevronRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}

function MissionVisionSection() {
  return (
    <section className="bg-white py-20 px-4 sm:px-8 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-mclRed font-bold uppercase tracking-widest text-sm mb-2">
            ABOUT MULTAN CHEMICALS LTD
          </p>
          <h2 className="text-slate-900 font-extrabold text-4xl lg:text-5xl leading-tight">
            Our Purpose & Future
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="border-t-4 border-mclRed p-8 bg-white shadow-xl rounded-xl">
            <FaShieldAlt className="text-mclRed mb-4" size={32} />
            <h3 className="text-2xl font-bold text-slate-900">{pageContent.mission.title}</h3>
            <p className="text-slate-600 leading-relaxed mt-4">
              {pageContent.mission.body}
            </p>
          </div>

          <div className="p-8 bg-slate-900 shadow-xl rounded-xl">
            <FaChartBar className="text-mclRed mb-4" size={32} />
            <h3 className="text-2xl font-bold text-white">{pageContent.vision.title}</h3>
            <p className="text-slate-300 leading-relaxed mt-4">
              {pageContent.vision.body}
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-16">
          <h3 className="text-2xl font-bold mb-8 text-center text-slate-900">
            Our Core Values
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {pageContent.values.map((value, i) => (
              <div key={i} className="rounded-xl p-6 border-2 border-slate-200 bg-white hover:border-mclRed hover:shadow-md transition-all">
                <h4 className="font-bold text-slate-900 text-lg mb-2">{value.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <div className="pt-24">
      <AboutHero />
      <AboutSection1 />
      <MissionVisionSection />
      <TimelineSection />
      <AboutSection2 />
      <AboutSection3 />
    </div>
  );
}
