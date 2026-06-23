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

  const heading = contentMap['section1-heading']?.title || 'About MCL';
  const title = contentMap['section1-title']?.title || 'Leader in Quality.<br />Driven by Innovation.';
  const description = contentMap['section1-description']?.title || `Established in ${foundedYear}, Multan Chemicals Limited (MCL) has grown to become Pakistan's most trusted name in industrial and medical gases.`;

  const features = [1, 2, 3, 4].map(i => {
    const c = contentMap[`feature-${i}`];
    return {
      icon: featureIcons[i - 1],
      title: c?.title || ['ISO Certified', 'Advanced Technology', 'Safety First', 'Nationwide Network'][i - 1],
      subtitle: c?.description || ['Quality Management Systems', 'Modern Plants & Equipment', 'Highest Safety Standards', 'Extensive Reach Across Pakistan'][i - 1],
    };
  });

  return (
    <section className="bg-white py-20 px-4 sm:px-8 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            ref={leftRef}
            className={`transition-all duration-700 ${
              leftInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <h3 className="text-mclRed font-bold uppercase tracking-widest text-sm mb-2">
              {heading}
            </h3>
            <h2 className="text-gray-900 font-extrabold text-4xl lg:text-5xl leading-tight mb-4">
              <span dangerouslySetInnerHTML={{ __html: title }} />
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              {description}
            </p>
            <Link to="/about" className="bg-mclRed hover:bg-red-800 text-white font-bold text-xs uppercase px-6 py-3 transition-all hover:shadow-lg active:scale-95 inline-block">
              Read More About Us &rarr;
            </Link>
          </div>
          <div
            ref={rightRef}
            className={`relative transition-all duration-700 delay-200 ${
              rightInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="overflow-hidden rounded-2xl shadow-lg group">
              <img
                src={plantImage}
                alt="Industrial chemical plant at dusk"
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl px-6 py-4 hidden sm:block">
              <p className="text-mclRed font-extrabold text-3xl leading-none">{foundedYear}</p>
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mt-1">Est. & Trusted</p>
            </div>
          </div>
        </div>
        <div
          ref={featRef}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 border-t border-gray-100 pt-8 transition-all duration-700 delay-300 ${
            featInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center space-x-4 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center group-hover:border-mclRed group-hover:bg-red-50 transition-all duration-300">
                  <Icon className="text-mclRed" size={20} />
                </div>
                <div>
                  <p className="text-gray-900 font-bold text-sm group-hover:text-mclRed transition-colors">{item.title}</p>
                  <p className="text-gray-500 text-xs">{item.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
