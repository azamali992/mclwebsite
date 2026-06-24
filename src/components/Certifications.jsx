import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useContent from '../hooks/useContent';
import useInView from '../hooks/useInView';

const certifications = [
  { standard: 'ISO 9001:2015', desc: 'Quality Management' },
  { standard: 'ISO 14001:2015', desc: 'Environmental Management' },
  { standard: 'ISO 45001:2018', desc: 'Occupational Health & Safety' },
  { standard: 'GMP', desc: 'Good Manufacturing Practice' },
  { standard: 'HTM 02-01', desc: 'Medical Gas Pipeline Systems' },
  { standard: 'NFPA 99', desc: 'Health Care Facilities Code' },
];

export default function Certifications({ className = 'bg-canvas py-24 px-6 sm:px-8 lg:px-12' }) {
  const { contentMap } = useContent('about');
  const [ref, inView] = useInView();

  const certsTitle = contentMap['certifications-title']?.title || 'Quality, safety and responsibility, certified.';

  return (
    <section id="certifications" ref={ref} className={`scroll-mt-28 ${className}`}>
      <div className={`mx-auto max-w-[1400px] transition-[opacity,transform] duration-500 ease-out ${inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <h2 className="mb-10 max-w-2xl text-3xl font-semibold tracking-tight text-ink md:text-[2.5rem]">{certsTitle}</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {certifications.map((cert, i) => (
            <div
              key={cert.standard}
              style={{ transitionDelay: inView ? `${i * 50}ms` : '0ms' }}
              className={`flex flex-col items-start rounded-md border border-line bg-canvas p-5 transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:border-line-strong hover:shadow-[var(--shadow-md)] ${
                inView ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
              }`}
            >
              <FaCheckCircle size={22} className="text-accent" />
              <p className="mt-4 font-mono text-sm font-medium text-ink">{cert.standard}</p>
              <p className="mt-1 text-xs text-muted">{cert.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Link to="/certifications" className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
            View our certificates
            <FaArrowRight size={12} className="transition-transform duration-200 ease-out hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
