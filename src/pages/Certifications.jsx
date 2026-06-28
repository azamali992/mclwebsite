import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SectionWrap from '../components/SectionWrap';
import certificate1 from '../assets/certificate1.png';
import certificate2 from '../assets/certificate2.png';
import certificate3 from '../assets/certificate3.png';
import certificate4 from '../assets/certificate4.png';
import Seo from '../components/Seo';

const certificates = [
  {
    image: certificate1,
    standard: 'Halal Certification',
    issuer: 'ACTS Halal Certification & Training Services',
    desc: 'Certifies that the medical, industrial and specialty gases produced at our Industrial Estate, Multan facility comply with national and international Halal standards, covering production, filling and supply.',
  },
  {
    image: certificate2,
    standard: 'ISO 45001:2018',
    issuer: 'Bureau Veritas Certification',
    desc: 'Occupational Health & Safety Management System certification covering the production, distribution and supply of medical, industrial and specialty gases — confirming our commitment to a safe working environment for every employee.',
  },
  {
    image: certificate3,
    standard: 'FSSC 22000',
    issuer: 'Bureau Veritas Certification',
    desc: 'Food Safety System Certification covering the manufacture, filling, compression, adsorption, oxygenation and decarbonation of liquid nitrogen and mixture gases used in food production — ensuring our food-grade gases meet global safety standards.',
  },
  {
    image: certificate4,
    standard: 'ISO 14001:2015',
    issuer: 'Bureau Veritas Certification',
    desc: 'Environmental Management System certification covering the production, distribution and supply of medical, industrial and specialty gases — reflecting our commitment to minimizing environmental impact across all operations.',
  },
];

const commitments = [
  {
    num: '01',
    text: 'Continuously improving our processes, embracing innovation and investing in state-of-the-art technologies to exceed customer expectations.',
  },
  {
    num: '02',
    text: 'Uncompromising commitment to the integrity, purity and reliability of our gases.',
  },
  {
    num: '03',
    text: 'Proactive monitoring, strict controls and comprehensive training — to consistently deliver superior products and services and foster long-lasting partnerships built on trust.',
  },
];

const standards = [
  { title: 'GMP', sub: 'Good Manufacturing Practice' },
  { title: 'European Pharmacopeia 1999', sub: 'Medical Gas Purity Standards' },
  { title: 'HTM 02-01', sub: 'Medical Gas Pipeline Systems' },
  { title: 'HTM 2022', sub: 'Medical Gas Pipeline Systems (Legacy)' },
  { title: 'NFPA 99', sub: 'Health Care Facilities Code' },
];

const puritySpec = [
  { label: 'Oxygen purity', euro: '99.5% (min)', mcl: '99.7% (min)' },
  { label: 'Moisture', euro: '< 67 ppm', mcl: '< 0.1 ppm' },
  { label: 'Carbon dioxide', euro: '< 300 ppm', mcl: '< 0.85 ppm' },
  { label: 'Carbon monoxide', euro: '< 5 ppm', mcl: '< 1.0 ppm' },
  { label: 'Odor', euro: 'Odorless', mcl: 'Odorless' },
];

export default function Certifications() {
  return (
    <div className="pt-24">
      <Seo
        title="Certifications & Compliance"
        description="Multan Chemicals Limited is Halal certified and holds ISO 45001:2018, FSSC 22000 and ISO 14001:2015 certifications from Bureau Veritas, with medical oxygen purity exceeding European Pharmacopeia 1999 standards."
        path="/certifications"
      />
      <section className="bg-slate-900 py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="text-accent font-bold uppercase tracking-widest text-sm mb-3">Certifications & Compliance</p>
          <h1 className="text-white font-extrabold text-4xl lg:text-5xl leading-tight mb-4">
            Quality. Safety. Responsibility.
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Multan Chemicals Limited operates under internationally recognized management systems, independently audited and certified by accredited bodies.
          </p>
        </div>
      </section>

      <SectionWrap className="py-20 bg-white px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto space-y-12">
          {certificates.map((cert, i) => (
            <div
              key={cert.standard}
              style={{ transitionDelay: `${i * 80}ms` }}
              className="flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-white border border-gray-200 rounded-2xl p-6 md:p-10 hover:shadow-xl transition-shadow duration-500"
            >
              <div className="w-full md:w-72 flex-shrink-0">
                <img
                  src={cert.image}
                  alt={`${cert.standard} certificate`}
                  className="w-full h-auto rounded-lg border border-gray-200 shadow-md"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <FaCheckCircle className="text-accent" size={18} />
                  <h2 className="text-gray-900 font-extrabold text-2xl">{cert.standard}</h2>
                </div>
                <p className="text-accent font-semibold text-sm uppercase tracking-wide mb-3">{cert.issuer}</p>
                <p className="text-gray-600 leading-relaxed">{cert.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrap>

      <SectionWrap className="py-20 bg-gray-50 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-accent font-bold uppercase tracking-widest text-sm mb-3">Quality Policy</p>
            <h2 className="text-gray-900 font-extrabold text-3xl lg:text-4xl leading-tight">
              Three commitments — written, signed, audited.
            </h2>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 overflow-hidden">
            {commitments.map((c) => (
              <div key={c.num} className="flex items-start gap-5 p-6">
                <span className="text-accent font-extrabold text-3xl leading-none flex-shrink-0">{c.num}</span>
                <p className="text-gray-700 text-sm leading-relaxed pt-1">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrap>

      <SectionWrap className="py-20 bg-slate-900 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-accent font-bold uppercase tracking-widest text-sm mb-3">Standards We Follow</p>
          <h2 className="text-white font-extrabold text-3xl lg:text-4xl leading-tight mb-10">
            From cylinder fill to hospital ceiling — globally benchmarked.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 rounded-xl overflow-hidden">
            {standards.map((s) => (
              <div key={s.title} className="bg-slate-900 p-6 hover:bg-slate-800 transition-colors">
                <h3 className="text-white font-bold text-xl mb-1">{s.title}</h3>
                <p className="text-gray-400 text-xs uppercase tracking-wide">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrap>

      <SectionWrap className="py-20 bg-white px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-accent font-bold uppercase tracking-widest text-sm mb-3">Medical Oxygen — Purity Specification</p>
          <h2 className="text-gray-900 font-extrabold text-3xl lg:text-4xl leading-tight mb-10">
            MCL standard versus European Pharmacopeia 1999.
          </h2>
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 bg-gray-50 px-6 py-3 text-xs font-bold uppercase tracking-wide text-gray-500">
              <span>Specification</span>
              <span>European Pharmacopeia 1999</span>
              <span className="text-accent">MCL Standard</span>
            </div>
            {puritySpec.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-3 px-6 py-4 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'} border-t border-gray-100`}
              >
                <span className="text-gray-900 font-medium">{row.label}</span>
                <span className="text-gray-500">{row.euro}</span>
                <span className="text-gray-900 font-bold">{row.mcl}</span>
              </div>
            ))}
          </div>
        </div>
      </SectionWrap>

      <SectionWrap className="py-16 bg-gradient-to-r from-accent to-red-700 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          <div>
            <p className="text-white/80 font-bold uppercase tracking-widest text-xs mb-2">Documentation</p>
            <h2 className="text-white font-extrabold text-2xl lg:text-3xl">
              Need certificates, MSDS or quality dossiers for your audit?
            </h2>
          </div>
          <Link
            to="/contact"
            className="bg-white text-accent font-bold text-sm uppercase px-6 py-3 inline-flex items-center gap-2 rounded transition-all hover:shadow-lg active:scale-95 flex-shrink-0"
          >
            Request Documentation <FaArrowRight size={12} />
          </Link>
        </div>
      </SectionWrap>
    </div>
  );
}
