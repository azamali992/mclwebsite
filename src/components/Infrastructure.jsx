import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import useInView from '../hooks/useInView';
import { FaIndustry, FaUsers, FaShieldAlt, FaClock, FaCog, FaMapMarkerAlt, FaCheck, FaCheckCircle } from 'react-icons/fa';
import useContent from '../hooks/useContent';
import heroBg from '../assets/infra01.JPG';
import stationImg from '../assets/stationimg.jpg';
import plantImg1 from '../assets/hero02.JPG';
import plantImg2 from '../assets/infra03.JPG';
import plantImg3 from '../assets/infra04.JPG';
import hero01 from '../assets/hero01.JPG';
import pagedemo1 from '../assets/pagedemo1.jpeg';
import pagedemo2 from '../assets/pagedemo2.jpeg';
import pagedemo3 from '../assets/pagedemo3.jpeg';
import trucks1 from '../assets/trucks1.JPG';
import trucks2 from '../assets/trucks2.JPG';
import trucks3 from '../assets/trucks3.JPG';
import trucks4 from '../assets/trucks4.JPG';
import WarehouseMap, { normalizeWarehouseName } from './WarehouseMap';
import whFaisalabad from '../assets/Warehouses Pics/Faisalabad Warehouse/WhatsApp Image 2026-06-03 at 10.20.18 PM.jpeg';
import whGojra from '../assets/Warehouses Pics/Gojra Warehouse/WhatsApp Image 2026-06-03 at 5.55.29 PM.jpeg';
import whGujranwala from '../assets/Warehouses Pics/Gujranwala Warehouse/WhatsApp Image 2026-06-03 at 7.57.44 PM.jpeg';
import whJhelum from '../assets/Warehouses Pics/Jhelum Warehouse/WhatsApp Image 2026-06-03 at 7.08.46 PM.jpeg';
import whManshara from '../assets/Warehouses Pics/Manshara Warehouse/WhatsApp Image 2026-06-03 at 5.17.36 PM.jpeg';
import whMehmoodBoti from '../assets/Warehouses Pics/Mehmood Boti Warehouse/WhatsApp Image 2026-06-03 at 7.07.48 PM.jpeg';
import whMianwali from '../assets/Warehouses Pics/Mianwali Warehouse/WhatsApp Image 2026-06-04 at 3.47.58 PM.jpeg';
import whPeshawar from '../assets/Warehouses Pics/Peshawar Warehouse/WhatsApp Image 2026-06-04 at 2.32.08 PM.jpeg';
import whPindi from '../assets/Warehouses Pics/Pindi Warehouse/WhatsApp Image 2026-06-04 at 3.47.57 PM.jpeg';
import whSahiwal from '../assets/Warehouses Pics/Sahiwal warehouse/WhatsApp Image 2026-06-04 at 4.13.06 PM.jpeg';
import whSargodha from '../assets/Warehouses Pics/Sargodha Warehouse/WhatsApp Image 2026-06-04 at 1.59.36 PM.jpeg';
import whSundar from '../assets/Warehouses Pics/Sundar Warehouse/WhatsApp Image 2026-06-04 at 10.30.42 AM.jpeg';

const stations = [
  { name: 'Faisalabad Warehouse', province: 'Punjab', img: whFaisalabad },
  { name: 'Gojra Warehouse', province: 'Punjab', img: whGojra },
  { name: 'Gujranwala Warehouse', province: 'Punjab', img: whGujranwala },
  { name: 'Jhelum Warehouse', province: 'Punjab', img: whJhelum },
  { name: 'Manshara Warehouse', province: 'KPK', img: whManshara },
  { name: 'Mehmood Boti Warehouse', province: 'Punjab', img: whMehmoodBoti },
  { name: 'Mianwali Warehouse', province: 'Punjab', img: whMianwali },
  { name: 'Peshawar Warehouse', province: 'KPK', img: whPeshawar },
  { name: 'Pindi Warehouse', province: 'Punjab', img: whPindi },
  { name: 'Sahiwal Warehouse', province: 'Punjab', img: whSahiwal },
  { name: 'Sargodha Warehouse', province: 'Punjab', img: whSargodha },
  { name: 'Sundar Warehouse', province: 'Punjab', img: whSundar },
].map(s => ({ ...s, key: normalizeWarehouseName(s.name) }));

const plants = [
  { capacity: '125 TPD', type: 'Oxygen Plant', location: 'Faisalabad', imagePlaceholder: plantImg1 },
  { capacity: '20 TPD', type: 'Oxygen Plant', location: 'Multan', imagePlaceholder: plantImg2 },
  { capacity: '15 TPD', type: 'Oxygen Plant', location: 'Multan', imagePlaceholder: plantImg3 },
];

const galleryImages = [stationImg, pagedemo1, pagedemo2, pagedemo3];
const logisticsGalleryImages = [trucks1, trucks2, trucks3, trucks4];

const certColors = {
  blue: { border: 'border-blue-200', text: 'text-blue-600' },
  green: { border: 'border-green-200', text: 'text-green-600' },
  red: { border: 'border-red-200', text: 'text-red-600' },
  yellow: { border: 'border-yellow-200', text: 'text-yellow-600' },
};

const qualityCerts = [
  { color: 'blue', title: 'ISO 9001:2015', desc: 'Quality Management' },
  { color: 'green', title: 'ISO 14001:2015', desc: 'Environmental Management' },
  { color: 'red', title: 'ISO 45001:2018', desc: 'Occupational Health & Safety' },
  { color: 'blue', title: 'HTM 02-01', desc: 'Medical Gas Pipeline Systems' },
  { color: 'yellow', title: 'GMP', desc: 'Good Manufacturing Practice' },
];

const SectionWrap = ({ children, className = '' }) => {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </section>
  );
};

export default function Infrastructure() {
  const { contentMap } = useContent('infrastructure');
  const [highlightKey, setHighlightKey] = useState(null);
  const cardRefs = useRef({});

  const handleMapLocationClick = (loc) => {
    setHighlightKey(loc.key);
    cardRefs.current[loc.key]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const heroHeading = contentMap['hero-heading']?.title || 'OUR INFRASTRUCTURE';
  const heroTitle = contentMap['hero-title']?.title || 'Nationwide Filling Stations For Uninterrupted Supply';
  const heroDesc = contentMap['hero-description']?.title || 'MCL operates 20+ company owned filling stations and 30+ authorized distributors across Pakistan to ensure availability, safety and reliable distribution of medical and industrial gases.';

  const getStat = (i) => {
    const c = contentMap[`stat-${i + 1}`];
    if (!c) return null;
    return { value: c.title, label: c.description, sublabel: c.text };
  };

  const statsData = [
    { icon: FaIndustry, value: '20+', label: 'Filling Stations', sublabel: 'Nationwide' },
    { icon: FaUsers, value: '30+', label: 'Authorized', sublabel: 'Distributors' },
    { icon: FaShieldAlt, value: 'Safety First', label: 'Strict Safety', sublabel: 'Protocols' },
    { icon: FaClock, value: '24/7', label: 'Reliable Supply', sublabel: 'Network' },
    { icon: FaCog, value: 'Expert Team', label: 'Trained & Certified', sublabel: 'Professionals' },
  ];

  const stats = statsData.map((s, i) => {
    const api = getStat(i);
    return api ? { ...s, value: api.value, label: api.label, sublabel: api.sublabel } : s;
  });

  const stationsHeading = contentMap['stations-heading']?.title || 'OUR FILLING STATIONS ACROSS PAKISTAN';
  const plantsHeading = contentMap['plants-heading']?.title || 'OUR PRODUCTION PLANTS';
  const plantsTitle = contentMap['plants-title']?.title || 'Built for Capacity. Engineered for Excellence.';
  const plantsDesc = contentMap['plants-description']?.title || 'State-of-the-art production facilities with advanced technology ensure consistent quality, high purity and uninterrupted supply.';

  const oxygenHeading = contentMap['oxygen-heading']?.title || 'OXYGEN FILLING STATIONS';
  const oxygenTitle = contentMap['oxygen-title']?.title || 'Safe. Precise. Reliable.';
  const oxygenDesc = contentMap['oxygen-description']?.title || 'Our oxygen filling stations are equipped with advanced filling manifolds, precision controls and safety systems to deliver high purity oxygen for medical and industrial applications.';

  const oxygenChecklist = [1, 2, 3, 4, 5].map(i => {
    const c = contentMap[`oxygen-check-${i}`];
    return c?.title || [
      'High pressure cylinder filling up to 200 Bar',
      'Automatic filling manifolds',
      'Online purity & pressure monitoring',
      'Strict safety & quality control',
      'Trained and certified operators',
    ][i - 1];
  });

  const logisticsHeading = contentMap['logistics-heading']?.title || 'LOGISTICS & DISTRIBUTION';
  const logisticsTitle = contentMap['logistics-title']?.title || 'Strong Fleet. On-Time Delivery.';
  const logisticsDesc = contentMap['logistics-description']?.title || 'Our modern fleet of tankers and cylinder delivery vehicles ensures safe and timely delivery of gases to every corner of Pakistan.';

  const logisticsStats = [1, 2, 3, 4].map(i => {
    const c = contentMap[`logistics-stat-${i}`];
    const defaults = [
      { value: '65+', label: 'Delivery Trucks' },
      { value: '20+', label: 'Tanker Trucks' },
      { value: '100+', label: 'Dedicated Staff' },
      { value: 'Real-time', label: 'Tracking System' },
    ];
    return c ? { value: c.title, label: c.description } : defaults[i - 1];
  });

  const qualityHeading = contentMap['quality-heading']?.title || 'QUALITY ASSURANCE';
  const qualityTitle = contentMap['quality-title']?.title || 'Quality You Can Trust.';
  const qualityDesc = contentMap['quality-description']?.title || 'We follow international standards and strict quality control at every step to ensure safety and reliability.';

  return (
    <>
      <section className="w-full relative bg-gray-900 h-[500px] lg:h-[600px]">
        <img src={heroBg} alt="Filling station canopy" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-8 lg:px-12 max-w-[1400px] mx-auto z-10 w-full lg:w-1/2">
          <p className="text-mclRed font-bold uppercase tracking-widest text-sm mb-4">{heroHeading}</p>
          <h1 className="text-white font-extrabold text-4xl lg:text-5xl leading-tight mb-6">{heroTitle}</h1>
          <p className="text-gray-200 text-base leading-relaxed">{heroDesc}</p>
        </div>
      </section>

      <div className="relative z-20 -mt-16 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="bg-white rounded-xl shadow-xl flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-gray-100 p-2">
          {stats.map((stat, i) => (
            <div key={i} className="flex-1 flex items-center justify-center p-4 gap-4">
              <div className="bg-red-50 text-red-600 p-3 rounded-full"><stat.icon size={20} /></div>
              <div className="flex flex-col">
                <span className="text-gray-900 font-bold text-lg">{stat.value}</span>
                <span className="text-gray-800 text-sm font-semibold">{stat.label}</span>
                <span className="text-gray-500 text-xs">{stat.sublabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="py-20 bg-white max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        <h2 className="text-center text-red-600 font-bold uppercase tracking-widest text-sm mb-3">{stationsHeading}</h2>
        <p className="text-center text-gray-500 text-sm mb-12 max-w-2xl mx-auto">Click a marker on the map to jump to that location below.</p>
        <div className="mb-12">
          <WarehouseMap className="h-[420px]" tileTheme="light" highlightKey={highlightKey} onLocationClick={handleMapLocationClick} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {stations.map((station, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[station.key] = el; }}
              className={`flex flex-col group cursor-pointer rounded-lg transition-all ${
                highlightKey === station.key ? 'ring-2 ring-mclRed ring-offset-2' : ''
              }`}
              onClick={() => setHighlightKey(station.key)}
            >
              <div className="aspect-video w-full overflow-hidden rounded-lg mb-3">
                <img src={station.img} alt={station.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
              </div>
              <p className="text-gray-900 font-bold text-base">{station.name}</p>
              <div className="flex items-center gap-1 text-gray-500 text-xs mt-1"><FaMapMarkerAlt size={10} /><span>{station.province}</span></div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#0B1A28] py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4">
            <p className="text-red-600 font-bold uppercase tracking-widest text-sm mb-4">{plantsHeading}</p>
            <h2 className="text-white font-extrabold text-3xl md:text-4xl leading-tight mb-6">{plantsTitle}</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">{plantsDesc}</p>
          </div>
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {plants.map((plant, i) => (
                <div key={i} className="relative h-[300px] lg:h-[350px] w-full rounded-xl overflow-hidden group">
                  <img src={plant.imagePlaceholder} alt={plant.location} className="object-cover w-full h-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1A28]/90 via-[#0B1A28]/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 flex flex-col">
                    <span className="text-white font-bold text-xl mb-1">{plant.capacity}</span>
                    <span className="text-gray-300 text-sm">{plant.type}</span>
                    <span className="text-gray-400 text-xs mt-1">{plant.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionWrap className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-20 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-2">
            <p className="text-red-600 font-bold uppercase tracking-widest text-xs mb-3">{oxygenHeading}</p>
            <h2 className="text-gray-900 font-extrabold text-3xl lg:text-4xl leading-tight mb-4">{oxygenTitle}</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">{oxygenDesc}</p>
            <ul className="space-y-2 mb-8">
              {oxygenChecklist.map((item, i) => (
                <li key={i} className="flex items-start group">
                  <FaCheck className="text-red-600 mt-0.5 mr-2 flex-shrink-0 group-hover:scale-110 transition-transform" size={12} />
                  <span className="text-gray-800 text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase px-6 py-3 inline-flex items-center gap-2 transition-all hover:shadow-lg active:scale-95 rounded">REQUEST SUPPLY &rarr;</Link>
          </div>
          <div className="lg:col-span-3">
            <div className="w-full aspect-[4/3] lg:aspect-video rounded-xl overflow-hidden shadow-md">
              <img src={hero01} alt="Oxygen filling station" className="object-cover w-full h-full hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {galleryImages.map((img, i) => (
            <div key={i} className="aspect-video rounded-lg overflow-hidden bg-gray-100 group">
              <img src={img} alt={`Oxygen station gallery ${i + 1}`} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </SectionWrap>

      <hr className="border-gray-100 max-w-[1400px] mx-auto" />

      <SectionWrap className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-20 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-2">
            <p className="text-red-600 font-bold uppercase tracking-widest text-xs mb-3">{logisticsHeading}</p>
            <h2 className="text-gray-900 font-extrabold text-3xl lg:text-4xl leading-tight mb-4">{logisticsTitle}</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">{logisticsDesc}</p>
            <div className="grid grid-cols-2 gap-4">
              {logisticsStats.map((stat, i) => (
                <div key={i} className="border border-gray-100 rounded-lg p-4 bg-white shadow-sm flex flex-col justify-center hover:shadow-md hover:border-red-100 transition-all group">
                  <span className="text-2xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">{stat.value}</span>
                  <span className="text-xs text-gray-500 font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="w-full aspect-[4/3] lg:aspect-video rounded-xl overflow-hidden shadow-md">
              <img src={trucks1} alt="Logistics fleet" className="object-cover w-full h-full hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {logisticsGalleryImages.map((img, i) => (
            <div key={i} className="aspect-video rounded-lg overflow-hidden bg-gray-100 group">
              <img src={img} alt={`Logistics gallery ${i + 1}`} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </SectionWrap>

      <hr className="border-gray-100 max-w-[1400px] mx-auto" />

      <SectionWrap className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-20 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-2">
            <p className="text-red-600 font-bold uppercase tracking-widest text-xs mb-3">{qualityHeading}</p>
            <h2 className="text-gray-900 font-extrabold text-3xl lg:text-4xl leading-tight mb-4">{qualityTitle}</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">{qualityDesc}</p>
            <Link to="/about#certifications" className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase px-6 py-3 inline-flex items-center gap-2 transition-all hover:shadow-lg active:scale-95 rounded">OUR CERTIFICATIONS &rarr;</Link>
          </div>
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {qualityCerts.map((cert, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-4 flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                  <div className={`w-14 h-14 rounded-full border-2 ${certColors[cert.color].border} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <FaCheckCircle className={certColors[cert.color].text} size={22} />
                  </div>
                  <span className="font-bold text-gray-900 text-xs mb-1">{cert.title}</span>
                  <span className="text-[10px] text-gray-500 leading-tight">{cert.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrap>
    </>
  );
}
