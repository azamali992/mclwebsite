import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionWrap from './SectionWrap';
import StatValue from './StatValue';
import { FaIndustry, FaUsers, FaShieldAlt, FaClock, FaCog, FaMapMarkerAlt, FaCheck, FaCheckCircle, FaExternalLinkAlt, FaSearch, FaWarehouse, FaTruck } from 'react-icons/fa';
import useContent from '../hooks/useContent';
import useStats from '../hooks/useStats';
import useInView from '../hooks/useInView';
import { resolveStat } from '../data/stats';
import heroBg from '../assets/infra01.JPG';
import stationImg from '../assets/stationimg.JPG';
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
import WarehouseMap, { loadWarehouseLocations, loadDistributorLocations } from './WarehouseMap';
import MiniMap from './MiniMap';
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

const imageMap = {
  faisalabad: whFaisalabad,
  gojra: whGojra,
  gujranwala: whGujranwala,
  jhelum: whJhelum,
  manshara: whManshara,
  'mehmood boti': whMehmoodBoti,
  mianwali: whMianwali,
  peshawar: whPeshawar,
  pindi: whPindi,
  sahiwal: whSahiwal,
  sargodha: whSargodha,
  sundar: whSundar,
};

function getProvince(name) {
  const lower = name.toLowerCase();
  if (lower.includes('peshawar') || lower.includes('manshara')) return 'KPK';
  if (lower.includes('karachi') || lower.includes('therparker')) return 'Sindh';
  return 'Punjab';
}

const plants = [
  { capacityKey: 'oxygen_plant_capacity', type: 'Oxygen Plant', location: 'Faisalabad', imagePlaceholder: plantImg1 },
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

export default function Infrastructure() {
  const { contentMap } = useContent('infrastructure');
  const { statsMap } = useStats();
  const [highlightKey, setHighlightKey] = useState(null);
  const [warehouses, setWarehouses] = useState([]);
  const [warehousesLoading, setWarehousesLoading] = useState(true);
  const [distributors, setDistributors] = useState([]);
  const [distributorsLoading, setDistributorsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('warehouses');
  const [searchQuery, setSearchQuery] = useState('');
  const cardRefs = useRef({});
  const [statsRef, statsInView] = useInView();
  const [logisticsStatsRef, logisticsStatsInView] = useInView();

  useEffect(() => {
    loadWarehouseLocations()
      .then(setWarehouses)
      .catch(() => {})
      .finally(() => setWarehousesLoading(false));
    loadDistributorLocations()
      .then(setDistributors)
      .catch(() => {})
      .finally(() => setDistributorsLoading(false));
  }, []);

  const currentLocations = activeTab === 'warehouses' ? warehouses : distributors;
  const currentLoading = activeTab === 'warehouses' ? warehousesLoading : distributorsLoading;

  const filteredDistributors = activeTab === 'distributors' && searchQuery
    ? distributors.filter(d =>
        d.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : distributors;

  const handleMapLocationClick = (loc) => {
    setHighlightKey(loc.key);
    cardRefs.current[loc.key]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleCardClick = (loc) => {
    setHighlightKey(loc.key);
    cardRefs.current[loc.key]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleGetLocation = (e, loc) => {
    e.stopPropagation();
    if (loc.mapsUrl) window.open(loc.mapsUrl, '_blank', 'noopener,noreferrer');
  };

  const heroHeading = contentMap['hero-heading']?.title || 'OUR INFRASTRUCTURE';
  const heroTitle = contentMap['hero-title']?.title || 'Nationwide Filling Stations For Uninterrupted Supply';
  const heroDesc = contentMap['hero-description']?.title || `MCL operates ${resolveStat(statsMap, 'filling_stations').value} company owned filling stations and ${resolveStat(statsMap, 'authorized_distributors').value} authorized distributors across Pakistan to ensure availability, safety and reliable distribution of medical and industrial gases.`;

  const getStat = (key) => {
    const c = contentMap[key];
    if (!c) return null;
    return { value: c.title, label: c.description, sublabel: c.text };
  };

  const statsData = [
    { icon: FaIndustry, value: resolveStat(statsMap, 'filling_stations').value, label: 'Filling Stations', sublabel: 'Nationwide' },
    { icon: FaUsers, value: resolveStat(statsMap, 'authorized_distributors').value, label: 'Authorized', sublabel: 'Distributors' },
    { icon: FaShieldAlt, value: 'Safety First', label: 'Strict Safety', sublabel: 'Protocols' },
    { icon: FaClock, value: '24/7', label: 'Reliable Supply', sublabel: 'Network' },
    { icon: FaCog, value: 'Expert Team', label: 'Trained & Certified', sublabel: 'Professionals' },
  ];

  const stats = statsData.map((s, i) => {
    if (i < 2) return s; // filling stations / distributors already resolved from the central stats registry above
    const api = getStat(`stat-${i + 1}`);
    return api ? { ...s, value: api.value, label: api.label, sublabel: api.sublabel } : s;
  });

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

  const logisticsDefaults = [
    { value: resolveStat(statsMap, 'fleet_trucks').value, label: 'Delivery Trucks' },
    { value: resolveStat(statsMap, 'tanker_trucks').value, label: 'Tanker Trucks' },
    { value: resolveStat(statsMap, 'logistics_staff').value, label: 'Dedicated Staff' },
    { value: 'Real-time', label: 'Tracking System' },
  ];

  const logisticsStats = [1, 2, 3, 4].map(i => {
    if (i <= 3) return logisticsDefaults[i - 1]; // delivery/tanker trucks & staff already resolved from the central stats registry
    const c = contentMap[`logistics-stat-${i}`];
    return c ? { value: c.title, label: c.description } : logisticsDefaults[i - 1];
  });

  const qualityHeading = contentMap['quality-heading']?.title || 'QUALITY ASSURANCE';
  const qualityTitle = contentMap['quality-title']?.title || 'Quality You Can Trust.';
  const qualityDesc = contentMap['quality-description']?.title || 'We follow international standards and strict quality control at every step to ensure safety and reliability.';

  return (
    <>
      <section className="w-full relative bg-gray-900 min-h-[calc(100dvh-6rem)]">
        <img src={heroBg} alt="Filling station canopy" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-8 lg:px-12 max-w-[1400px] mx-auto z-10 w-full lg:w-1/2">
          <p className="text-accent font-bold uppercase tracking-widest text-sm mb-4">{heroHeading}</p>
          <h1 className="text-white font-extrabold text-4xl lg:text-5xl leading-tight mb-6">{heroTitle}</h1>
          <p className="text-gray-200 text-base leading-relaxed">{heroDesc}</p>
        </div>
      </section>

      <div ref={statsRef} className="relative z-20 -mt-4 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="bg-white rounded-xl shadow-xl flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-gray-100 p-2">
          {stats.map((stat, i) => (
            <div key={i} className="flex-1 flex items-center justify-center p-4 gap-4">
              <div className="bg-red-50 text-red-600 p-3 rounded-full"><stat.icon size={20} /></div>
              <div className="flex flex-col">
                <StatValue value={stat.value} active={statsInView} className="text-gray-900 font-bold text-lg" />
                <span className="text-gray-800 text-sm font-semibold">{stat.label}</span>
                <span className="text-gray-500 text-xs">{stat.sublabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="py-20 bg-white max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="text-center mb-8">
          <h2 className="text-red-600 font-bold uppercase tracking-widest text-sm mb-3">
            {activeTab === 'warehouses'
              ? (contentMap['stations-heading']?.title || 'OUR FILLING STATIONS ACROSS PAKISTAN')
              : (contentMap['distributors-heading']?.title || 'OUR AUTHORIZED DISTRIBUTORS')}
          </h2>

          <div className="inline-flex bg-gray-100 rounded-lg p-1 mt-2">
            <button
              onClick={() => { setActiveTab('warehouses'); setSearchQuery(''); setHighlightKey(null); }}
              className={`flex items-center gap-2 px-5 py-2 rounded-md text-sm font-semibold transition-all ${
                activeTab === 'warehouses'
                  ? 'bg-white text-red-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FaWarehouse size={14} />
              Warehouses
            </button>
            <button
              onClick={() => { setActiveTab('distributors'); setSearchQuery(''); setHighlightKey(null); }}
              className={`flex items-center gap-2 px-5 py-2 rounded-md text-sm font-semibold transition-all ${
                activeTab === 'distributors'
                  ? 'bg-white text-red-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FaTruck size={14} />
              Distributors
            </button>
          </div>
        </div>

        {activeTab === 'distributors' && (
          <div className="relative max-w-md mx-auto mb-8">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input
              type="text"
              placeholder="Search by city or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400"
            />
          </div>
        )}

        <p className="text-center text-gray-500 text-sm mb-8 max-w-2xl mx-auto">
          {activeTab === 'warehouses'
            ? 'Click a marker on the map, or a card below, to reveal its exact location on Google Maps.'
            : 'Click a marker on the map or search by city to find a distributor.'}
        </p>

        <div className="mb-12">
          <WarehouseMap
            className="h-[45vh] max-h-[420px] min-h-[280px]"
            tileTheme="light"
            highlightKey={highlightKey}
            onLocationClick={handleMapLocationClick}
            locations={currentLocations}
            loading={currentLoading}
          />
        </div>

        {currentLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-red-600 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {(activeTab === 'warehouses' ? warehouses : filteredDistributors).map((loc) => {
              const img = activeTab === 'warehouses' ? imageMap[loc.key] : null;
              return (
                <div
                  key={loc.id}
                  ref={(el) => { cardRefs.current[loc.key] = el; }}
                  className={`flex flex-col rounded-lg transition-all ${
                    highlightKey === loc.key ? 'ring-2 ring-accent ring-offset-2' : ''
                  }`}
                >
                  <div onClick={() => handleCardClick(loc)} className="cursor-pointer">
                    {activeTab === 'warehouses' ? (
                      img ? (
                        <div className="aspect-video w-full overflow-hidden rounded-lg mb-3">
                          <img src={img} alt={loc.name} loading="lazy" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      ) : (
                        <div className="aspect-video w-full rounded-lg mb-3 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <FaMapMarkerAlt size={28} className="text-gray-300" />
                        </div>
                      )
                    ) : loc.lat != null && loc.lng != null ? (
                      <div className="aspect-video w-full overflow-hidden rounded-lg mb-3 bg-gray-100">
                        <MiniMap lat={loc.lat} lng={loc.lng} />
                      </div>
                    ) : (
                      <div className="aspect-video w-full rounded-lg mb-3 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100">
                        <FaTruck size={28} className="text-emerald-300" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <div onClick={() => handleCardClick(loc)} className="cursor-pointer min-w-0 flex-1">
                      <p className="text-gray-900 font-bold text-sm truncate">{loc.name}</p>
                      {activeTab === 'distributors' && loc.city ? (
                        <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                          <FaMapMarkerAlt size={10} />
                          <span>{loc.city}</span>
                        </div>
                      ) : activeTab === 'warehouses' ? (
                        <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                          <FaMapMarkerAlt size={10} />
                          <span>{getProvince(loc.name)}</span>
                        </div>
                      ) : null}
                    </div>
                    {loc.mapsUrl && highlightKey === loc.key && (
                      <button
                        onClick={(e) => handleGetLocation(e, loc)}
                        className="mt-1 flex-shrink-0 bg-red-600 hover:bg-red-700 text-white text-[10px] font-semibold uppercase px-2.5 py-1.5 rounded flex items-center gap-1 transition-all hover:shadow-md active:scale-95 animate-fade-in-up"
                        title="Open in Google Maps"
                      >
                        <FaExternalLinkAlt size={8} />
                        Get Location
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
            {activeTab === 'distributors' && filteredDistributors.length === 0 && (
              <p className="col-span-full text-center text-gray-400 text-sm py-8">No distributors found matching your search.</p>
            )}
          </div>
        )}
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
                <div key={i} className="relative aspect-[4/3] w-full rounded-xl overflow-hidden group">
                  <img src={plant.imagePlaceholder} alt={plant.location} loading="lazy" className="object-cover w-full h-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1A28]/90 via-[#0B1A28]/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 flex flex-col">
                    <span className="text-white font-bold text-xl mb-1">{plant.capacityKey ? resolveStat(statsMap, plant.capacityKey).value : plant.capacity}</span>
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
              <img src={hero01} alt="Oxygen filling station" loading="lazy" className="object-cover w-full h-full hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {galleryImages.map((img, i) => (
            <div key={i} className="aspect-video rounded-lg overflow-hidden bg-gray-100 group">
              <img src={img} alt={`Oxygen station gallery ${i + 1}`} loading="lazy" className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
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
            <div ref={logisticsStatsRef} className="grid grid-cols-2 gap-4">
              {logisticsStats.map((stat, i) => (
                <div key={i} className="border border-gray-100 rounded-lg p-4 bg-white shadow-sm flex flex-col justify-center hover:shadow-md hover:border-red-100 transition-all group">
                  <StatValue value={stat.value} active={logisticsStatsInView} className="text-2xl font-bold text-gray-900 group-hover:text-red-600 transition-colors" />
                  <span className="text-xs text-gray-500 font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="w-full aspect-[4/3] lg:aspect-video rounded-xl overflow-hidden shadow-md">
              <img src={trucks1} alt="Logistics fleet" loading="lazy" className="object-cover w-full h-full hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {logisticsGalleryImages.map((img, i) => (
            <div key={i} className="aspect-video rounded-lg overflow-hidden bg-gray-100 group">
              <img src={img} alt={`Logistics gallery ${i + 1}`} loading="lazy" className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
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
            <Link to="/certifications" className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase px-6 py-3 inline-flex items-center gap-2 transition-all hover:shadow-lg active:scale-95 rounded">OUR CERTIFICATIONS &rarr;</Link>
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
