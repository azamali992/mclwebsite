import { FaAward, FaFlask, FaShieldAlt, FaCogs } from 'react-icons/fa';
import useInView from '../hooks/useInView';
import plantImage from '../assets/hero02.JPG';

export default function AboutSection1() {
  const [leftRef, leftInView] = useInView();
  const [rightRef, rightInView] = useInView();
  const [featRef, featInView] = useInView();

  const features = [
    { icon: FaAward, title: 'ISO Certified', subtitle: 'Quality Management Systems' },
    { icon: FaFlask, title: 'Advanced Technology', subtitle: 'Modern Plants & Equipment' },
    { icon: FaShieldAlt, title: 'Safety First', subtitle: 'Highest Safety Standards' },
    { icon: FaCogs, title: 'Nationwide Network', subtitle: 'Extensive Reach Across Pakistan' },
  ];

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
              About MCL
            </h3>
            <h2 className="text-gray-900 font-extrabold text-4xl lg:text-5xl leading-tight mb-4">
              Leader in Quality.<br />Driven by Innovation.
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              Established in 1980, Multan Chemicals Limited (MCL) has grown to become Pakistan's most trusted name in industrial and medical gases. With state-of-the-art production facilities, a modern fleet and a strong distribution network, we deliver reliability, safety and excellence to every industry and every life we touch.
            </p>
            <button className="bg-mclRed hover:bg-red-800 text-white font-bold text-xs uppercase px-6 py-3 transition-all hover:shadow-lg active:scale-95">
              Read More About Us &rarr;
            </button>
          </div>

          <div
            ref={rightRef}
            className={`transition-all duration-700 delay-200 ${
              rightInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <img
              src={plantImage}
              alt="Industrial chemical plant at dusk"
              className="w-full rounded-2xl shadow-lg object-cover"
            />
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
