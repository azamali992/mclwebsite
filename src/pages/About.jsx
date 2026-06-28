import { Link } from 'react-router-dom';
import { FaIndustry, FaTruck, FaHospital, FaAward, FaBuilding, FaShieldAlt, FaChartBar, FaRocket, FaBurn, FaSolarPanel, FaArrowRight } from 'react-icons/fa';
import AboutSection1 from '../components/AboutSection1';
import AboutSection2 from '../components/AboutSection2';
import AboutSection3 from '../components/AboutSection3';
import useInView from '../hooks/useInView';
import heroBg from '../assets/hero02.JPG';
import { leadership } from '../data/team';
import useStats from '../hooks/useStats';
import { resolveStat } from '../data/stats';
import Seo from '../components/Seo';

function AboutHero() {
  return (
    <section className="relative w-full bg-slate-900 py-28 px-4 sm:px-8 lg:px-12 overflow-hidden">
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-900/85 to-slate-900" />
      <div className="relative max-w-[1400px] mx-auto text-center">
        <p className="text-accent font-bold uppercase tracking-widest text-sm mb-3">Who We Are</p>
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

const milestones = [
  { year: '1985', yearKey: 'founded_year', icon: FaBuilding, title: 'Establishment & Entry into Medical Gases', desc: 'Multan Chemicals Limited is founded in Multan, beginning operations as a regional industrial gas supplier and quickly becoming one of Pakistan\'s first companies to supply medical-grade oxygen to healthcare facilities.' },
  { year: '1992', icon: FaIndustry, title: 'First Major ASU', desc: 'Commissioning of our first Air Separation Unit, significantly increasing production capacity for oxygen, nitrogen, and argon.' },
  { year: '2000', icon: FaAward, title: 'ISO Certification', desc: 'Achieved ISO 9001 certification from SGS UK, marking our commitment to international quality management standards.' },
  { year: '2008', icon: FaTruck, title: 'Nationwide Distribution', desc: 'Expanded distribution network to 20+ company-owned filling stations and 30 authorized distributors across Pakistan.' },
  { year: '2015', icon: FaHospital, title: 'MGPS Division Launch', desc: 'Launched our Medical Gas Pipeline Systems (MGPS) division, providing end-to-end healthcare engineering solutions.' },
  { year: '2020', icon: FaIndustry, title: '125 TPD Plant in Faisalabad', desc: 'Commissioned Pakistan\'s largest liquid oxygen plant in Faisalabad with 125 TPD capacity, serving the entire nation.' },
  { year: '2024', icon: FaAward, title: 'Total Capacity 160+ TPD', desc: 'Reached a combined production capacity of over 160 tons per day across multiple plants, solidifying our position as the industry leader.' },
  { year: '2025', icon: FaSolarPanel, title: 'Flagship Plant Goes Solar', desc: 'Transitioned our flagship 125 TPD plant to clean energy with a dedicated 1.2 MW solar power plant, cutting carbon emissions while sustaining round-the-clock production.' },
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

function TimelineItem({ mil, last, inView, delay }) {
  const MIcon = mil.icon;
  const planned = !!mil.comingSoon;

  return (
    <li
      className={`grid grid-cols-[2.75rem_1fr] gap-x-5 transition-[opacity,transform] duration-500 ease-out ${inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
    >
      {/* rail + node */}
      <div className="flex flex-col items-center">
        <span
          className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full ${
            planned
              ? 'border border-dashed border-white/30 text-on-dark-soft'
              : 'bg-accent text-white shadow-[var(--shadow-accent)]'
          }`}
        >
          <MIcon size={17} />
        </span>
        {!last && <span className="mt-1 w-px flex-1 bg-white/12" />}
      </div>

      {/* content */}
      <div className={last ? 'pb-0' : 'pb-12'}>
        <div className="flex items-center gap-3">
          <span className={`font-mono text-xl font-medium leading-none ${planned ? 'text-on-dark-soft' : 'text-on-ink-accent'}`}>
            {mil.year}
          </span>
          {planned && (
            <span className="rounded-full border border-white/15 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-on-dark-soft">
              Planned
            </span>
          )}
        </div>
        <h3 className="mt-2 text-lg font-semibold tracking-tight text-white">{mil.title}</h3>
        <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-on-dark-soft">{mil.desc}</p>
      </div>
    </li>
  );
}

function TimelineSection() {
  const [ref, inView] = useInView();
  const { statsMap } = useStats();
  const resolvedMilestones = milestones.map((m) => (m.yearKey ? { ...m, year: resolveStat(statsMap, m.yearKey).value } : m));
  const items = [...resolvedMilestones, ...comingSoonMilestones];

  return (
    <section id="history" className="bg-ink-deep px-6 py-24 sm:px-8 lg:px-12 scroll-mt-28">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* sticky intro */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow mb-4" style={{ color: 'var(--on-ink-accent)' }}>Our journey</p>
          <h2 className="text-3xl font-semibold leading-[1.1] tracking-tight text-white md:text-[2.75rem]">
            Four decades of building Pakistan&rsquo;s gas infrastructure.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-on-dark-soft">
            From a regional supplier in Multan to the country&rsquo;s premier industrial and medical gas company, here is how MCL grew, and where it is headed next.
          </p>
        </div>

        {/* timeline */}
        <ol ref={ref} className="relative">
          {items.map((mil, i) => (
            <TimelineItem
              key={`${mil.year}-${i}`}
              mil={mil}
              last={i === items.length - 1}
              inView={inView}
              delay={Math.min(i, 6) * 70}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

function MissionVisionSection() {
  return (
    <section id="mission" className="bg-white py-20 px-4 sm:px-8 lg:px-12 scroll-mt-28">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-accent font-bold uppercase tracking-widest text-sm mb-2">
            ABOUT MULTAN CHEMICALS LTD
          </p>
          <h2 className="text-slate-900 font-extrabold text-4xl lg:text-5xl leading-tight">
            Our Purpose & Future
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="border-t-4 border-accent p-8 bg-white shadow-xl rounded-xl">
            <FaShieldAlt className="text-accent mb-4" size={32} />
            <h3 className="text-2xl font-bold text-slate-900">{pageContent.mission.title}</h3>
            <p className="text-slate-600 leading-relaxed mt-4">
              {pageContent.mission.body}
            </p>
          </div>

          <div className="p-8 bg-slate-900 shadow-xl rounded-xl">
            <FaChartBar className="text-accent mb-4" size={32} />
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
              <div key={i} className="rounded-xl p-6 border-2 border-slate-200 bg-white hover:border-accent hover:shadow-md transition-all">
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

function TeamPreviewSection() {
  const [ref, inView] = useInView();
  return (
    <section id="team" ref={ref} className={`bg-white py-20 px-4 sm:px-8 lg:px-12 scroll-mt-28 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-accent font-bold uppercase tracking-widest text-sm mb-2">Our Team</p>
          <h2 className="text-gray-900 font-extrabold text-3xl lg:text-4xl leading-tight">Meet Our Leadership</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-10">
          {leadership.map((person, i) => (
            <div
              key={person.name}
              style={{ transitionDelay: inView ? `${i * 60}ms` : '0ms' }}
              className={`flex flex-col items-center w-36 sm:w-44 transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-gray-100 shadow-md">
                <img src={person.image} alt={person.name} className="object-cover w-full h-full" />
              </div>
              <p className="text-gray-900 font-bold text-base text-center mt-3 leading-tight">{person.name}</p>
              <p className="text-accent text-sm font-semibold text-center mt-0.5">{person.title}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link to="/team" className="bg-accent hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 inline-flex items-center gap-2 transition-all hover:shadow-lg hover:shadow-red-900/30 active:scale-95 rounded">
            View All Team <FaArrowRight size={12} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <div className="pt-24">
      <Seo
        title="About Us"
        description="Four decades of trust in industrial and medical gases, grown from a regional supplier in Multan to one of Pakistan's leading gas manufacturers and healthcare engineering companies, with a 125 TPD oxygen plant and nationwide distribution."
        path="/about"
      />
      <AboutHero />
      <AboutSection1 />
      <MissionVisionSection />
      <TimelineSection />
      <TeamPreviewSection />
      <AboutSection2 />
      <AboutSection3 />
    </div>
  );
}
