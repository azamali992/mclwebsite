import { FaIndustry, FaTruck, FaWarehouse, FaShieldAlt, FaClock, FaCertificate, FaFlask, FaBoxes, FaImage } from 'react-icons/fa';
import SectionWrap from '../components/SectionWrap';
import mainPlant from '../assets/heromcl.png';
import plant20tpd from '../assets/20tpdplant.jpeg';
import multanPlant from '../assets/multanoxplant.jpeg';
import daPlant from '../assets/daplant.png';
import Seo from '../components/Seo';

const plants = [
  { image: mainPlant, title: '125 TPD Liquid Generation Plant', location: 'Sahianwala, Faisalabad' },
  { image: plant20tpd, title: '20 TPD Compressed Gas', location: 'Sahianwala, Faisalabad' },
  { image: multanPlant, title: '15 TPD Compressed Gas', location: 'Multan' },
  { image: daPlant, title: 'Dissolved Acetylene Plant', location: 'Multan, Faisalabad, Tharparkar' },
  { title: 'LPG Plant — 1,800 MT Capacity', location: 'Under Construction: 840 MT + 840 MT Expansion Planned', comingSoon: true },
  { title: '240 TPD ASU Plant', location: 'Under Construction', comingSoon: true },
];

const features = [
  { icon: FaIndustry, text: 'Largest plant — 125 tons per day' },
  { icon: FaWarehouse, text: 'Two backup plants of 40 tons per day' },
  { icon: FaBoxes, text: 'Largest cylinder inventory: 185,000' },
  { icon: FaTruck, text: 'Largest cylinder transportation fleet: 65 trucks' },
  { icon: FaFlask, text: 'Largest ISO tankers: 18 of 20-ton capacity and 7 of 5-ton capacity' },
  { icon: FaWarehouse, text: 'Largest liquid medical oxygen backup facility: 1,150,000 cubic metres' },
  { icon: FaShieldAlt, text: '1,200 tons biweekly backup storage tank' },
  { icon: FaClock, text: 'Round the clock smooth and uninterrupted supplies' },
  { icon: FaCertificate, text: 'HTM 02 trained competent person / authorised person certification' },
];

export default function Production() {
  return (
    <div className="pt-24">
      <Seo
        title="Production Plants"
        description="MCL operates three Air Separation Units in Punjab, Pakistan: a 125 TPD liquid plant in Faisalabad plus 20 TPD and 15 TPD compressed gas plants, supplying high-purity industrial and medical gases nationwide."
        path="/production"
      />
      <section className="bg-slate-900 py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="text-accent font-bold uppercase tracking-widest text-sm mb-3">Production</p>
          <h1 className="text-white font-extrabold text-4xl lg:text-5xl leading-tight mb-4">
            Three ASU Plants Across Punjab, Pakistan.
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            MCL operates three Air Separation Units in Punjab — two for compressed gases and one for liquid gases — supplying high-purity industrial and medical gases nationwide.
          </p>
        </div>
      </section>

      <SectionWrap className="py-20 bg-white px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {plants.map((plant, i) => (
              <div
                key={plant.title}
                style={{ transitionDelay: `${i * 80}ms` }}
                className="relative group rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-500"
              >
                {plant.comingSoon && (
                  <span className="absolute top-3 right-3 z-10 bg-accent text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
                    Under Construction
                  </span>
                )}
                <div className="aspect-[16/10] overflow-hidden">
                  {plant.image ? (
                    <img src={plant.image} alt={plant.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center gap-2">
                      <FaImage className="text-gray-300" size={48} />
                      <span className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Coming Soon</span>
                    </div>
                  )}
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-gray-900 font-bold text-lg mb-1">{plant.title}</h3>
                  <p className="text-gray-500 text-sm">{plant.comingSoon ? plant.location : `Location: ${plant.location}`}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrap>

      <SectionWrap className="py-20 bg-gray-50 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-accent font-bold uppercase tracking-widest text-sm mb-3">Salient Features</p>
          <h2 className="text-gray-900 font-extrabold text-3xl lg:text-4xl leading-tight mb-12">
            Capacity and Reliability
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <div
                key={f.text}
                style={{ transitionDelay: `${i * 50}ms` }}
                className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-accent/30 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-red-50 text-accent flex items-center justify-center flex-shrink-0">
                  <f.icon size={16} />
                </div>
                <p className="text-gray-700 text-sm leading-relaxed pt-1.5">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrap>
    </div>
  );
}
