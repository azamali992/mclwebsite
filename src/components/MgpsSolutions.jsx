import { Link } from 'react-router-dom';
import { FaCheck, FaAward, FaTools, FaHeadset, FaUserTie } from 'react-icons/fa';
import renderImg from '../assets/3drender.png';
import useContent from '../hooks/useContent';
import useInView from '../hooks/useInView';

function FeatureBox({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-accent-soft text-accent">
        {icon}
      </span>
      <div>
        <p className="text-sm font-semibold text-ink">{title}</p>
        <p className="mt-0.5 text-[13px] text-muted">{desc}</p>
      </div>
    </div>
  );
}

export default function MgpsSolutions() {
  const [leftRef, leftInView] = useInView();
  const [rightRef, rightInView] = useInView();
  const { contentMap } = useContent('services');

  const sectionTitle = contentMap['mgps-title']?.title || 'Complete medical gas pipeline solutions';
  const description = contentMap['mgps-description']?.title || 'End-to-end Medical Gas Pipeline Systems designed to HTM 02-01, NFPA 99 and ISO 7396-1, ensuring safety, efficiency and reliability.';

  const defaultCheckItems = [
    'Central Gas Supply Systems',
    'ICU, CCU & Operation Theatre Solutions',
    'Bed Head Units & Pendants',
    'Alarm & Monitoring Systems',
    'Medical Vacuum Systems',
    'Installation, Testing & Maintenance',
  ];
  const checkItems = defaultCheckItems.map((_, i) => contentMap[`mgps-check-${i + 1}`]?.title || defaultCheckItems[i]);

  const legendItems = [
    { color: '#16a34a', label: 'Oxygen' },
    { color: '#2563eb', label: 'Nitrous oxide' },
    { color: '#eab308', label: 'Medical air' },
    { color: '#1f2937', label: 'Medical vacuum' },
  ];

  const featureIcons = [<FaAward key="a" size={15} />, <FaTools key="b" size={15} />, <FaHeadset key="c" size={15} />, <FaUserTie key="d" size={15} />];
  const defaultFeatures = [
    { title: 'International Standards', desc: 'HTM 02 / NFPA 99' },
    { title: 'Turnkey Projects', desc: 'End-to-end delivery' },
    { title: '24/7 Support', desc: 'Maintenance & service' },
    { title: 'Trained Engineers', desc: 'Expert workforce' },
  ];
  const bottomFeatures = defaultFeatures.map((f, i) => {
    const c = contentMap[`mgps-feature-${i + 1}`];
    return { icon: featureIcons[i], title: c?.title || f.title, desc: c?.description || f.desc };
  });

  return (
    <section className="overflow-hidden bg-canvas px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col items-start gap-12 lg:flex-row lg:gap-16">
          {/* Left */}
          <div
            ref={leftRef}
            className={`w-full transition-[opacity,transform] duration-500 ease-[var(--ease-out)] lg:w-5/12 ${leftInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          >
            <h2 className="text-3xl font-semibold leading-[1.1] tracking-tight text-ink md:text-[2.5rem]">{sectionTitle}</h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted">{description}</p>
            <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {checkItems.map((item, index) => (
                <li key={index} className="flex items-start gap-2.5 text-sm text-ink-soft">
                  <FaCheck className="mt-1 flex-shrink-0 text-accent" size={12} />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/mgps-solutions" className="btn btn-primary mt-8">Explore MGPS solutions</Link>
          </div>

          {/* Right */}
          <div
            ref={rightRef}
            className={`flex w-full flex-col items-center transition-[opacity,transform] duration-500 ease-[var(--ease-out)] lg:w-7/12 ${rightInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          >
            <div className="relative flex h-[360px] w-full items-center justify-center sm:h-[460px] lg:h-[560px]">
              <img src={renderImg} alt="3D medical gas pipeline layout" className="pointer-events-none h-full w-full scale-110 object-contain mix-blend-darken xl:scale-125 dark:mix-blend-normal" />
              <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 flex-col gap-3 rounded-lg border border-line bg-canvas/90 p-4 shadow-[var(--shadow-md)] backdrop-blur-sm md:flex">
                {legendItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="h-1.5 w-6 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs font-medium text-ink-soft">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-2 grid w-full grid-cols-1 gap-6 rounded-lg border border-line bg-surface p-6 sm:grid-cols-2 xl:grid-cols-4">
              {bottomFeatures.map((feature, index) => (
                <FeatureBox key={index} {...feature} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
