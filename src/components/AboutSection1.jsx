import { Link } from 'react-router-dom';
import { FaAward, FaFlask, FaShieldAlt, FaCogs } from 'react-icons/fa';
import useContent from '../hooks/useContent';
import useStats from '../hooks/useStats';
import useInView from '../hooks/useInView';
import plantImage from '../assets/hero02.JPG';
import { resolveStat } from '../data/stats';

const featureIcons = [FaAward, FaFlask, FaShieldAlt, FaCogs];

export default function AboutSection1() {
  const [leftRef, leftInView] = useInView();
  const [rightRef, rightInView] = useInView();
  const [featRef, featInView] = useInView();
  const { contentMap } = useContent('about');
  const { statsMap } = useStats();
  const foundedYear = resolveStat(statsMap, 'founded_year').value;

  const title = contentMap['section1-title']?.title?.replace(/<br\s*\/?>/gi, ' ') || 'A leader in quality, driven by innovation.';
  const description = contentMap['section1-description']?.title || `Established in ${foundedYear}, Multan Chemicals Limited has grown to become Pakistan's most trusted name in industrial and medical gases.`;

  const features = [1, 2, 3, 4].map((i) => {
    const c = contentMap[`feature-${i}`];
    return {
      icon: featureIcons[i - 1],
      title: c?.title || ['ISO Certified', 'Advanced Technology', 'Safety First', 'Nationwide Network'][i - 1],
      subtitle: c?.description || ['Quality management systems', 'Modern plants & equipment', 'Highest safety standards', 'Reach across Pakistan'][i - 1],
    };
  });

  return (
    <section id="overview" className="bg-surface px-6 py-24 sm:px-8 lg:px-12 scroll-mt-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div
            ref={leftRef}
            className={`transition-[opacity,transform] duration-500 ease-out ${leftInView ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'}`}
          >
            <p className="eyebrow mb-4">About MCL</p>
            <h2 className="text-3xl font-semibold leading-[1.08] tracking-tight text-ink md:text-[2.75rem]">
              {title}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted">{description}</p>
            <Link to="/about" className="btn btn-ghost mt-8">Read more about us</Link>
          </div>

          <div
            ref={rightRef}
            className={`relative transition-[opacity,transform] duration-500 ease-out ${rightInView ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'}`}
          >
            <div className="overflow-hidden rounded-lg shadow-[var(--shadow-lg)]">
              <img src={plantImage} alt="MCL industrial plant at dusk" loading="lazy" className="w-full object-cover" />
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-lg border border-line bg-canvas px-6 py-4 shadow-[var(--shadow-md)] sm:block">
              <p className="font-mono text-3xl font-medium leading-none text-accent">{foundedYear}</p>
              <p className="mt-1.5 text-xs font-medium uppercase tracking-wide text-muted">Established</p>
            </div>
          </div>
        </div>

        <div
          ref={featRef}
          className={`mt-16 grid grid-cols-1 gap-x-8 gap-y-6 border-t border-line pt-10 transition-[opacity,transform] duration-500 ease-out sm:grid-cols-2 lg:grid-cols-4 ${featInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
        >
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-start gap-3">
                <Icon className="mt-0.5 flex-shrink-0 text-accent" size={20} />
                <div>
                  <p className="text-sm font-semibold text-ink">{item.title}</p>
                  <p className="mt-0.5 text-[13px] text-muted">{item.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
