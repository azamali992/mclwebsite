import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useContent from '../hooks/useContent';
import useInView from '../hooks/useInView';

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

export default function Certifications({ className = 'bg-white py-20 px-4 sm:px-8 lg:px-12' }) {
  const { contentMap } = useContent('about');
  const [ref, inView] = useInView();

  const certsHeading = contentMap['certifications-heading']?.title || 'Certifications & Compliance';
  const certsTitle = contentMap['certifications-title']?.title || 'Quality. Safety. Responsibility.';

  return (
    <section id="certifications" ref={ref} className={`scroll-mt-28 ${className}`}>
      <div className={`max-w-[1400px] mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <h3 className="text-red-600 font-bold uppercase tracking-widest text-sm mb-2">{certsHeading}</h3>
        <h2 className="text-gray-900 font-extrabold text-3xl md:text-4xl mb-10">{certsTitle}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {certifications.map((cert, i) => (
            <div
              key={cert.standard}
              style={{ transitionDelay: inView ? `${i * 60}ms` : '0ms' }}
              className={`bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-500 ${
                inView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${badgeColorMap[cert.color]}`}>
                <FaCheckCircle size={28} />
              </div>
              <p className="font-bold text-gray-900 text-sm mt-4 mb-1">{cert.standard}</p>
              <p className="text-xs text-gray-500 font-medium">{cert.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/certifications"
            className="inline-flex items-center gap-2 text-mclRed font-bold text-sm hover:gap-3 transition-all"
          >
            View Our Certificates <FaArrowRight size={12} />
          </Link>
        </div>
      </div>
    </section>
  );
}
