import { useState } from 'react';
import {
  FaCheckCircle, FaArrowRight, FaExclamationTriangle, FaFlask, FaTools,
  FaShieldAlt, FaIndustry, FaClipboardCheck, FaBalanceScale, FaBan,
  FaRecycle, FaBuilding, FaTruck, FaHardHat, FaAward,
} from 'react-icons/fa';
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

const testingSteps = [
  {
    icon: FaClipboardCheck,
    title: 'Visual Inspection',
    desc: 'Each cylinder undergoes thorough visual inspection for dents, corrosion, neck damage, and compromised valve integrity before any filling process.',
  },
  {
    icon: FaFlask,
    title: 'Hydrostatic Pressure Test',
    desc: 'Cylinders are filled with water and pressurized to 1.5 times the working pressure. This ensures the cylinder wall can safely withstand operational stresses.',
  },
  {
    icon: FaTools,
    title: 'Valve & Thread Inspection',
    desc: 'Valve assemblies are checked for leaks, thread wear, and proper operation. Faulty valves are replaced with certified components.',
  },
  {
    icon: FaRecycle,
    title: 'Internal Cleaning & Drying',
    desc: 'Cylinder interiors are cleaned to remove moisture, rust, and contaminants. They are then dried to prevent internal corrosion and gas contamination.',
  },
  {
    icon: FaShieldAlt,
    title: 'Leak Detection Test',
    desc: 'After filling, each cylinder is tested for micro-leaks using electronic leak detectors and pressure decay methods.',
  },
  {
    icon: FaIndustry,
    title: 'Purity Analysis',
    desc: 'Gas samples from each batch are analyzed using gas chromatography to verify purity meets specified standards (99.5%+ for medical oxygen).',
  },
];

export default function Certifications() {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      q: 'How often are cylinders tested?',
      a: 'As per Pakistan Explosives Department regulations, high-pressure gas cylinders must undergo hydrostatic testing every 5 years. Medical cylinders and cylinders showing signs of wear may require more frequent testing.',
    },
    {
      q: 'Who performs the testing?',
      a: 'All testing is conducted by MCL\'s certified technicians at our SGS UK & EDP-approved testing facilities. Test results are documented and maintained for regulatory compliance.',
    },
    {
      q: 'What happens if a cylinder fails the test?',
      a: 'Cylinders that fail any safety test are immediately removed from service, permanently defaced with a "CC" (Condemned Cylinder) stamp, and quarantined for disposal.',
    },
  ];

  // Re-describes the page's own real FAQ accordion below as FAQPage JSON-LD —
  // no question/answer here was invented, every pair is taken verbatim from
  // the `faqs` array already rendered in the visible accordion below.
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="pt-24">
      <Seo
        title="Certifications, Quality & Safety"
        description="Multan Chemicals Limited is Halal certified and holds ISO 45001:2018, FSSC 22000 and ISO 14001:2015 certifications from Bureau Veritas, with medical oxygen purity exceeding European Pharmacopeia 1999 standards — backed by rigorous cylinder testing certified by SGS UK and the Explosives Department of Pakistan."
        path="/certifications"
        jsonLd={faqJsonLd}
      />

      {/* ---------------------------------------------------------------- *
          Hero
       * ---------------------------------------------------------------- */}
      <section className="bg-slate-900 py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="text-accent font-bold uppercase tracking-widest text-sm mb-3">Certifications, Quality &amp; Safety</p>
          <h1 className="text-white font-extrabold text-4xl lg:text-5xl leading-tight mb-4">
            Certified. Tested. Trusted.
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Multan Chemicals Limited operates under internationally recognized management systems — independently audited and certified by accredited bodies — with every cylinder and process governed by rigorous quality control and safety protocols.
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------------- *
          PART 1 — Certifications (comes first)
       * ---------------------------------------------------------------- */}
      <SectionWrap className="py-20 bg-white px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12 text-center">
            <p className="text-accent font-bold uppercase tracking-widest text-sm mb-3">Our Certifications</p>
            <h2 className="text-gray-900 font-extrabold text-3xl lg:text-4xl leading-tight">
              Independently audited. Formally certified.
            </h2>
          </div>
          <div className="space-y-12">
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
                    <h3 className="text-gray-900 font-extrabold text-2xl">{cert.standard}</h3>
                  </div>
                  <p className="text-accent font-semibold text-sm uppercase tracking-wide mb-3">{cert.issuer}</p>
                  <p className="text-gray-600 leading-relaxed">{cert.desc}</p>
                </div>
              </div>
            ))}
          </div>
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

      {/* ---------------------------------------------------------------- *
          PART 2 — Quality Assurance & Safety
       * ---------------------------------------------------------------- */}
      <div className="bg-slate-900 py-16 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="text-accent font-bold uppercase tracking-widest text-sm mb-3">Quality Assurance &amp; Safety</p>
          <h2 className="text-white font-extrabold text-3xl lg:text-4xl leading-tight max-w-3xl mx-auto">
            Behind every certificate: a testing regime that never bends.
          </h2>
        </div>
      </div>

      <SectionWrap className="py-20 bg-white px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-accent font-bold uppercase tracking-widest text-sm mb-2">Cylinder Testing Procedure</p>
            <h2 className="text-gray-900 font-extrabold text-3xl lg:text-4xl leading-tight">Every Cylinder, Every Time</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm">
              Before any cylinder is filled, it passes through a rigorous multi-stage testing process to ensure safety and compliance with all applicable standards.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testingSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-accent/30 transition-all group">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-all">
                    <Icon className="text-accent group-hover:text-white transition-all" size={24} />
                  </div>
                  <h3 className="text-gray-900 font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </SectionWrap>

      <SectionWrap className="py-20 bg-gray-50 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-accent font-bold uppercase tracking-widest text-sm mb-2">Cylinder Ownership Policy</p>
            <h2 className="text-gray-900 font-extrabold text-3xl lg:text-4xl leading-tight">Customer Property vs. Company Cylinders</h2>
            <p className="text-gray-500 mt-4 max-w-3xl mx-auto text-sm">
              Understanding the distinction between Customer Property (CP) cylinders and MCL-owned cylinders is essential for safe and compliant operations.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-white border border-blue-200 rounded-xl p-8 shadow-md">
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                <FaBuilding className="text-blue-600" size={24} />
              </div>
              <h3 className="text-gray-900 font-bold text-xl mb-3">Customer Property (CP) Cylinders</h3>
              <ul className="space-y-3">
                {[
                  'Cylinders owned by the customer and bearing the customer\'s unique identification markings.',
                  'Customer is responsible for periodic hydrostatic testing as per EDP regulations.',
                  'MCL fills CP cylinders only after verifying the cylinder is within its valid test period.',
                  'CP cylinders must meet all applicable safety standards before MCL can process them.',
                  'Any cylinder found with expired testing or visible damage will be returned unfilled.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <FaCheckCircle className="text-blue-500 mt-0.5 flex-shrink-0" size={14} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-accent/20 rounded-xl p-8 shadow-md">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <FaTruck className="text-accent" size={24} />
              </div>
              <h3 className="text-gray-900 font-bold text-xl mb-3">MCL Company-Owned Cylinders</h3>
              <ul className="space-y-3">
                {[
                  'Cylinders remain the property of Multan Chemicals Limited at all times.',
                  'All testing, maintenance, and certification costs are borne by MCL.',
                  'Each cylinder is tracked via serial number with full test history in our system.',
                  'Testing is conducted proactively on a rotating schedule — never past the due date.',
                  'Customers use MCL cylinders on an exchange basis: empty for full, with no ownership transfer.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <FaCheckCircle className="text-accent mt-0.5 flex-shrink-0" size={14} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </SectionWrap>

      <SectionWrap className="py-20 bg-white px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 lg:p-12">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <FaExclamationTriangle className="text-red-600" size={32} />
              </div>
              <div>
                <h2 className="text-gray-900 font-extrabold text-2xl lg:text-3xl mb-2">Condemned Cylinder (CC) Policy</h2>
                <p className="text-gray-600 text-sm">Mandatory safety protocol for non-compliant cylinders</p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-red-100">
                  <FaBan className="text-red-600 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Immediate Condemnation</h4>
                    <p className="text-gray-600 text-xs mt-1">Any cylinder that fails hydrostatic testing, visual inspection, or shows signs of structural compromise is immediately stamped with "CC" (Condemned Cylinder) by engraving on the shoulder.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-red-100">
                  <FaHardHat className="text-red-600 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Removal from Service</h4>
                    <p className="text-gray-600 text-xs mt-1">CC cylinders are permanently removed from the gas supply chain. They are quarantined in a segregated area and scheduled for destructive disposal to prevent any possibility of re-entry into circulation.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-red-100">
                  <FaBalanceScale className="text-red-600 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Legal Compliance</h4>
                    <p className="text-gray-600 text-xs mt-1">This policy is enforced in compliance with the Explosives Department of Pakistan (EDP) regulations. MCL strictly follows all statutory requirements regarding condemned cylinders.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-red-100">
                  <FaExclamationTriangle className="text-red-600 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Do Not Bring CC Cylinders for Refilling</h4>
                    <p className="text-gray-600 text-xs mt-1">Any CC cylinder presented for refilling will be confiscated and reported to the relevant authorities. Customers are advised to retire CC cylinders immediately and procure certified replacements.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 bg-white rounded-lg p-4 border border-red-100">
              <p className="text-red-800 font-bold text-sm flex items-center gap-2">
                <FaExclamationTriangle size={16} />
                WARNING: Operation of condemned cylinders is extremely dangerous and can result in catastrophic failure, serious injury, or loss of life.
              </p>
            </div>
          </div>
        </div>
      </SectionWrap>

      <SectionWrap className="py-20 bg-gray-50 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-accent font-bold uppercase tracking-widest text-sm mb-2">Frequently Asked Questions</p>
            <h2 className="text-gray-900 font-extrabold text-3xl lg:text-4xl leading-tight">Safety &amp; Testing FAQs</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <span className="font-bold text-gray-900 text-sm">{faq.q}</span>
                  <FaArrowRight className={`text-accent transition-transform flex-shrink-0 ml-4 ${expandedFaq === i ? 'rotate-90' : ''}`} size={12} />
                </button>
                {expandedFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </SectionWrap>

      {/* ---------------------------------------------------------------- *
          Closing CTA
       * ---------------------------------------------------------------- */}
      <SectionWrap className="py-16 bg-gradient-to-r from-accent to-red-700 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-white font-extrabold text-3xl lg:text-4xl mb-4">Committed to Safety Excellence</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8 text-sm">
            Our quality management system is certified by SGS UK, and we maintain full compliance with the Explosives Department of Pakistan (EDP) regulations for the production, storage, and distribution of industrial and medical gases. Need certificates, MSDS or quality dossiers for your audit?
          </p>
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            {[
              { icon: FaAward, label: 'SGS UK Certified' },
              { icon: FaShieldAlt, label: 'EDP Licensed' },
              { icon: FaCheckCircle, label: 'ISO 9001:2015' },
              { icon: FaClipboardCheck, label: 'HTM 02-01 Compliant' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-2 text-white">
                  <Icon size={20} />
                  <span className="text-sm font-bold">{item.label}</span>
                </div>
              );
            })}
          </div>
          <Link
            to="/contact"
            className="bg-white text-accent font-bold text-sm uppercase px-6 py-3 inline-flex items-center gap-2 rounded transition-all hover:shadow-lg active:scale-95"
          >
            Request Documentation <FaArrowRight size={12} />
          </Link>
        </div>
      </SectionWrap>
    </div>
  );
}
