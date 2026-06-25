import { useState, useEffect, useRef } from 'react';
import { FaRegCalendarAlt, FaIndustry, FaTruck, FaUsers, FaGasPump } from 'react-icons/fa';
import { TbCylinder } from 'react-icons/tb';
import useStats from '../hooks/useStats';
import useInView from '../hooks/useInView';
import { resolveStat } from '../data/stats';

function useCountUp(target, active, duration = 1400) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!active) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dur = reduced ? 0 : duration;
    let startTime;
    const ease = (t) => 1 - Math.pow(1 - t, 3); // ease-out cubic
    const tick = (now) => {
      if (!startTime) startTime = now;
      const p = dur === 0 ? 1 : Math.min((now - startTime) / dur, 1);
      setValue(Math.round(ease(p) * target));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, active, duration]);

  return value;
}

function Stat({ icon: Icon, number, title, subtitle, active }) {
  const numeric = parseInt(String(number).replace(/[^0-9]/g, ''), 10) || 0;
  const suffix = String(number).replace(/[0-9,]/g, '');
  const display = useCountUp(numeric, active);

  return (
    <div className="group px-6 py-7 text-center transition-colors duration-200 ease-out hover:bg-accent-soft">
      <Icon
        size={20}
        className="mx-auto mb-2.5 text-muted transition-colors duration-200 ease-out group-hover:text-accent"
      />
      {/* mono = fixed advance width, so going bold on hover doesn't reflow */}
      <p className="font-mono text-3xl font-medium tracking-tight text-ink transition-colors duration-200 ease-out group-hover:font-bold group-hover:text-accent sm:text-[2.4rem]">
        {numeric ? display.toLocaleString() : ''}{suffix}
      </p>
      <p className="mt-2 text-sm font-medium text-ink transition-colors duration-200 ease-out group-hover:font-semibold group-hover:text-accent">
        {title}
      </p>
      <p className="text-[13px] text-muted">{subtitle}</p>
    </div>
  );
}

const statCards = [
  { key: 'years_of_excellence', icon: FaRegCalendarAlt },
  { key: 'oxygen_plant_capacity', icon: FaIndustry },
  { key: 'cylinder_capacity', icon: TbCylinder },
  { key: 'fleet_trucks', icon: FaTruck },
  { key: 'filling_stations', icon: FaGasPump },
  { key: 'satisfied_clients', icon: FaUsers },
];

export default function StatsRow() {
  const { statsMap } = useStats();
  const [ref, inView] = useInView({ threshold: 0.3 });

  const stats = statCards.map((card) => {
    const stat = resolveStat(statsMap, card.key);
    return { key: card.key, icon: card.icon, number: stat.value, title: stat.label, subtitle: stat.subtitle };
  });

  return (
    <section className="relative z-30 -mt-14 pb-4 sm:-mt-16 lg:-mt-20">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
        <div
          ref={ref}
          className="overflow-hidden rounded-[2.5rem] border border-line bg-canvas shadow-[var(--shadow-lg)] lg:rounded-full lg:px-6"
        >
          <div className="grid grid-cols-2 divide-line sm:grid-cols-3 sm:divide-x lg:grid-cols-6 lg:divide-x [&>*]:border-t [&>*]:border-line sm:[&>*]:border-t-0">
            {stats.map((s) => (
              <Stat key={s.key} {...s} active={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
