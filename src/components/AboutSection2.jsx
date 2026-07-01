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
    <section id="network" className="bg-ink-deep px-6 py-24 sm:px-8 lg:px-12 scroll-mt-28">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div
          ref={leftRef}
          className={`transition-[opacity,transform] duration-500 ease-[var(--ease-out)] ${leftInView ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'}`}
        >
          <p className="eyebrow mb-4" style={{ color: 'var(--on-ink-accent)' }}>{heading}</p>
          <h2 className="mb-10 text-3xl font-semibold tracking-tight text-white md:text-[2.5rem]">{sectionTitle}</h2>
          <div className="flex flex-col gap-6">
            {features.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className={`group flex items-center gap-4 transition-[opacity,transform] duration-500 ease-[var(--ease-out)] ${leftInView ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0'}`}
                  style={{ transitionDelay: leftInView ? `${120 + i * 80}ms` : '0ms' }}
                >
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-md border border-white/15 bg-white/[0.04] text-white transition-colors duration-200 group-hover:border-white/40">
                    <Icon size={18} />
                  </span>
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="text-sm text-on-dark-soft">{item.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {locations.length > 0 && (
            <div
              className={`mt-8 transition-[opacity,transform] duration-700 ease-[var(--ease-out)] ${leftInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
              style={{ transitionDelay: leftInView ? '550ms' : '0ms' }}
            >
              <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-on-dark-soft">
                Warehouse locations, click to locate
              </p>
              <div className="flex flex-wrap gap-2">
                {locations.map((loc) => {
                  const active = highlightKey === loc.key;
                  return (
                    <button
                      key={loc.id}
                      onClick={() => setHighlightKey(loc.key)}
                      className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-[background-color,border-color,color,transform] duration-200 ease-out ${
                        active
                          ? 'scale-105 border-accent bg-accent text-white'
                          : 'border-white/15 bg-white/5 text-on-dark-soft hover:border-white/40 hover:text-white'
                      }`}
                    >
                      <FaMapMarkerAlt size={10} className={active ? 'text-white' : 'text-on-ink-accent'} />
                      {loc.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <Link to="/infrastructure" className="btn btn-primary mt-8">
            View our network
          </Link>
        </div>
        <div
          ref={mapRef}
          className={`transition-[opacity,transform] duration-500 ease-[var(--ease-out)] ${mapInView ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'}`}
        >
          <WarehouseMap
            className="h-[50vh] max-h-[500px] min-h-[300px]"
            highlightKey={highlightKey}
            onLocationClick={(loc) => setHighlightKey(loc.key)}
            onLocationsLoaded={setLocations}
          />
        </div>
      </div>
    </section>
  );
}
