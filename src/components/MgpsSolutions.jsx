import { FaCheck, FaAward, FaTools, FaHeadset, FaUserTie } from 'react-icons/fa';
import renderImg from '../assets/3drender.png';
import useContent from '../hooks/useContent';
import useInView from '../hooks/useInView';

function FeatureBox({ icon, title, desc }) {
  return (
    <div className="flex items-center space-x-4 pt-4 sm:pt-0 xl:px-4 first:pl-0 border-t-0 group">
      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-red-50 border border-red-100 group-hover:bg-mclRed group-hover:border-mclRed group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[11px] font-bold text-gray-900 tracking-wide leading-tight">{title}</span>
        <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest mt-0.5">{desc}</span>
      </div>
    </div>
  );
}

export default function MgpsSolutions() {
  const [leftRef, leftInView] = useInView();
  const [rightRef, rightInView] = useInView();
  const [statsRef, statsInView] = useInView();
  const { contentMap } = useContent('services');

  const heading = contentMap['mgps-heading']?.title || 'MGPS Solutions';
  const sectionTitle = contentMap['mgps-title']?.title || 'Complete Medical Gas Pipeline Solutions';
  const description = contentMap['mgps-description']?.title || 'We provide end-to-end Medical Gas Pipeline Systems (MGPS) designed to international standards (HTM 02-01, NFPA 99, ISO 7396-1) ensuring safety, efficiency and reliability.';

  const defaultCheckItems = [
    'Central Gas Supply Systems',
    'ICU, CCU & Operation Theatre Solutions',
    'Bed Head Units & Pendants',
    'Alarm & Monitoring Systems',
    'Medical Vacuum Systems',
    'Installation, Testing & Maintenance',
  ];

  const checkItems = defaultCheckItems.map((_, i) => {
    const c = contentMap[`mgps-check-${i + 1}`];
    return c?.title || defaultCheckItems[i];
  });

  const legendItems = [
    { color: 'bg-green-500', label: 'OXYGEN' },
    { color: 'bg-blue-600', label: 'NITROUS OXIDE' },
    { color: 'bg-yellow-400', label: 'MEDICAL AIR' },
    { color: 'bg-gray-800', label: 'MEDICAL VACUUM' },
  ];

  const featureIcons = [FaAward, FaTools, FaHeadset, FaUserTie];
  const defaultFeatures = [
    { title: 'International Standards', desc: 'HTM 02 / NFPA 99' },
    { title: 'Turnkey Projects', desc: 'End-to-End Solutions' },
    { title: '24/7 Support', desc: 'Maintenance & Service' },
    { title: 'Trained Engineers', desc: 'Expert Workforce' },
  ];

  const bottomFeatures = defaultFeatures.map((f, i) => {
    const c = contentMap[`mgps-feature-${i + 1}`];
    return {
      icon: featureIcons[i],
      title: c?.title || f.title,
      desc: c?.description || f.desc,
    };
  });

  return (
    <section className="py-20 bg-gray-50/30 max-w-full mx-auto px-4 sm:px-8 lg:px-12 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-16 items-start">
          <div
            ref={leftRef}
            className={`w-full lg:w-4/12 flex flex-col space-y-6 pt-10 relative z-30 transition-all duration-700 ${
              leftInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div>
              <h4 className="text-mclRed font-bold text-sm tracking-widest uppercase mb-2">{heading}</h4>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">{sectionTitle}</h2>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
            <ul className="space-y-3">
              {checkItems.map((item, index) => (
                <li key={index} className="flex items-start group">
                  <span className="mt-1 mr-3 text-mclRed text-sm transition-transform duration-300 group-hover:scale-110"><FaCheck /></span>
                  <span className="text-sm text-gray-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <button className="bg-mclRed hover:bg-red-800 text-white px-8 py-3.5 text-xs font-bold uppercase tracking-wider transition-all hover:shadow-lg hover:shadow-red-900/30 active:scale-95 inline-block shadow-md">
                Explore MGPS Solutions
              </button>
            </div>
          </div>

          <div
            ref={rightRef}
            className={`w-full lg:w-8/12 flex flex-col items-center transition-all duration-700 delay-200 ${
              rightInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="relative w-full flex justify-center lg:justify-end mb-8 mt-4 lg:mt-0 h-[400px] sm:h-[500px] lg:h-[650px]">
              <div className="relative w-full h-full flex justify-center lg:justify-end">
                <img src={renderImg} alt="3D Medical Gas Pipeline Layout" className="w-full h-full object-contain mix-blend-darken transform scale-125 xl:scale-150 lg:-translate-x-8 relative z-10 pointer-events-none hover:scale-135 xl:hover:scale-[1.6] transition-transform duration-700" />
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex flex-col space-y-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-100 z-30">
                {legendItems.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-6 h-1.5 rounded-full ${item.color}`}></div>
                    <span className="text-[10px] font-bold text-gray-800 uppercase tracking-wider">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              ref={statsRef}
              className={`w-full max-w-4xl bg-white border border-gray-100 rounded-xl shadow-lg p-5 sm:p-6 relative z-40 -mt-12 lg:-mt-24 xl:-mt-32 transition-all duration-700 delay-300 ${
                statsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 divide-y sm:divide-y-0 xl:divide-x divide-gray-100">
                {bottomFeatures.map((feature, index) => (
                  <FeatureBox key={index} {...feature} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
