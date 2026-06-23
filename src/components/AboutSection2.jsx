import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaIndustry, FaTruck, FaWarehouse, FaShieldAlt, FaMapMarkerAlt } from 'react-icons/fa';
import useContent from '../hooks/useContent';
import useStats from '../hooks/useStats';
import useInView from '../hooks/useInView';
import WarehouseMap from './WarehouseMap';
import { resolveStat } from '../data/stats';

const staticFeatures = [
  { icon: FaWarehouse, title: 'Strategic Warehouses', subtitle: 'For Timely Delivery' },
  { icon: FaShieldAlt, title: 'Modern Fleet', subtitle: 'For Safe & Reliable Supply' },
];

export default function AboutSection2() {
  const { contentMap } = useContent('about');
  const { statsMap } = useStats();
  const [leftRef, leftInView] = useInView();
  const [mapRef, mapInView] = useInView();
  const [locations, setLocations] = useState([]);
  const [highlightKey, setHighlightKey] = useState(null);

  const heading = contentMap['section2-heading']?.title || 'Nationwide Network';
  const sectionTitle = contentMap['section2-title']?.title || 'Reaching Every Corner of Pakistan';

  const features = [
    { icon: FaIndustry, title: `${resolveStat(statsMap, 'filling_stations').value} Company Owned`, subtitle: 'Filling Stations' },
    { icon: FaTruck, title: `${resolveStat(statsMap, 'authorized_distributors').value} Distributors`, subtitle: 'Across Pakistan' },
    ...staticFeatures.map((f, i) => {
      const c = contentMap[`network-feature-${i + 3}`];
      return {
        ...f,
        title: c?.title || f.title,
        subtitle: c?.description || f.subtitle,
      };
    }),
  ];

  return (
    <section className="bg-[#0B1A28] py-20 px-4 sm:px-8 lg:px-12">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div
          ref={leftRef}
          className={`transition-all duration-700 ${leftInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
        >
          <h3 className="text-red-600 font-bold uppercase tracking-widest text-sm mb-2">{heading}</h3>
          <h2 className="text-white font-extrabold text-3xl md:text-4xl mb-10">{sectionTitle}</h2>
          <div className="flex flex-col space-y-6">
            {features.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className={`flex items-center space-x-4 group transition-all duration-500 ${leftInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                  style={{ transitionDelay: leftInView ? `${150 + i * 100}ms` : '0ms' }}
                >
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:border-mclRed group-hover:bg-mclRed/10 transition-colors">
                    <Icon className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-white font-bold">{item.title}</p>
                    <p className="text-gray-400 text-sm">{item.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {locations.length > 0 && (
            <div
              className={`mt-8 transition-all duration-700 ${leftInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
              style={{ transitionDelay: leftInView ? '550ms' : '0ms' }}
            >
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">
                Warehouse Locations — click to locate
              </p>
              <div className="flex flex-wrap gap-2">
                {locations.map((loc) => {
                  const active = highlightKey === loc.key;
                  return (
                    <button
                      key={loc.id}
                      onClick={() => setHighlightKey(loc.key)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all focus:outline-none focus:ring-2 focus:ring-mclRed ${
                        active
                          ? 'bg-mclRed border-mclRed text-white shadow-md shadow-red-900/30 scale-105'
                          : 'bg-white/5 border-white/15 text-gray-300 hover:border-mclRed hover:text-white'
                      }`}
                    >
                      <FaMapMarkerAlt size={10} className={active ? 'text-white' : 'text-mclRed'} />
                      {loc.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <Link to="/infrastructure" className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase px-8 py-3 mt-8 inline-block transition-all hover:shadow-lg hover:shadow-red-900/30 active:scale-95 rounded">
            View Our Network
          </Link>
        </div>
        <div
          ref={mapRef}
          className={`transition-all duration-700 delay-150 ${mapInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
        >
          <WarehouseMap
            className="h-[500px]"
            highlightKey={highlightKey}
            onLocationClick={(loc) => setHighlightKey(loc.key)}
            onLocationsLoaded={setLocations}
          />
        </div>
      </div>
    </section>
  );
}
