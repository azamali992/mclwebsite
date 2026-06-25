import { useState, useEffect, useRef } from 'react';
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

function Stat({ number, title, subtitle, active }) {
  const numeric = parseInt(String(number).replace(/[^0-9]/g, ''), 10) || 0;
  const suffix = String(number).replace(/[0-9,]/g, '');
  const display = useCountUp(numeric, active);

  return (
    <div className="px-6 py-6 text-center">
      <p className="font-mono text-3xl font-medium tracking-tight text-ink sm:text-[2.4rem]">
        {numeric ? display.toLocaleString() : ''}{suffix}
      </p>
      <p className="mt-2 text-sm font-medium text-ink">{title}</p>
      <p className="text-[13px] text-muted">{subtitle}</p>
    </div>
  );
}

const statKeys = [
  'years_of_excellence',
  'oxygen_plant_capacity',
  'cylinder_capacity',
  'fleet_trucks',
  'filling_stations',
  'satisfied_clients',
];

export default function StatsRow() {
  const { statsMap } = useStats();
  const [ref, inView] = useInView({ threshold: 0.3 });

  const stats = statKeys.map((key) => {
    const stat = resolveStat(statsMap, key);
    return { key, number: stat.value, title: stat.label, subtitle: stat.subtitle };
  });

  return (
    <section className="bg-canvas py-10 sm:py-12">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
        <div
          ref={ref}
          className="overflow-hidden rounded-[2.5rem] border border-line bg-surface shadow-[var(--shadow-md)] lg:rounded-full lg:px-6"
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
