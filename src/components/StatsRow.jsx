import { useState, useEffect } from 'react';
import { FaRegCalendarAlt, FaIndustry, FaTruck, FaUsers } from 'react-icons/fa';
import { TbCylinder } from 'react-icons/tb';
import useContent from '../hooks/useContent';
import useInView from '../hooks/useInView';

function AnimatedStat({ icon, number, title, subtitle, delay }) {
  const [ref, inView] = useInView();

  const parseNumber = (str) => {
    const numeric = parseInt(str.replace(/[^0-9]/g, '')) || 0;
    const suffix = str.replace(/[0-9,]/g, '');
    return { numeric, suffix };
  };

  const { numeric, suffix } = parseNumber(number);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(numeric / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= numeric) {
        setDisplay(numeric);
        clearInterval(timer);
      } else {
        setDisplay(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, numeric]);

  return (
    <div
      ref={ref}
      className={`p-4 lg:p-6 flex flex-col items-center justify-center text-center group hover:bg-gray-50/50 transition-colors ${
        inView ? 'animate-count-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="mb-3 transform group-hover:-translate-y-1 transition-transform duration-300 flex items-center justify-center h-8">
        {icon}
      </div>
      <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1 tracking-tight">
        {inView ? display.toLocaleString() : '0'}{suffix}
      </h3>
      <div className="flex flex-col">
        <span className="text-[10px] font-bold text-mclRed tracking-widest uppercase">
          {title}
        </span>
        <span className="text-[10px] font-semibold text-gray-500 tracking-widest uppercase mt-0.5">
          {subtitle}
        </span>
      </div>
    </div>
  );
}

const defaultStats = [
  { id: 1, icon: <FaRegCalendarAlt size={28} className="text-mclRed" />, number: "40+", title: "YEARS OF", subtitle: "EXCELLENCE" },
  { id: 2, icon: <FaIndustry size={28} className="text-mclRed" />, number: "125 TPD", title: "OXYGEN PLANT", subtitle: "CAPACITY" },
  { id: 3, icon: <TbCylinder size={32} strokeWidth={1.5} className="text-mclRed" />, number: "87000+", title: "CYLINDERS", subtitle: "CAPACITY" },
  { id: 4, icon: <FaTruck size={28} className="text-mclRed" />, number: "65+", title: "TRUCKS IN", subtitle: "OUR FLEET" },
  { id: 5, icon: <FaIndustry size={28} className="text-mclRed" />, number: "20+", title: "FILLING STATIONS", subtitle: "NATIONWIDE" },
  { id: 6, icon: <FaUsers size={28} className="text-mclRed" />, number: "1000+", title: "SATISFIED", subtitle: "CLIENTS" },
];

const iconMap = [FaRegCalendarAlt, FaIndustry, TbCylinder, FaTruck, FaIndustry, FaUsers];

export default function StatsRow() {
  const { contentMap } = useContent('stats');

  const stats = defaultStats.map((s, i) => {
    const c = contentMap[`stat-${s.id}`];
    if (c) {
      return {
        ...s,
        number: c.title || s.number,
        title: c.description || s.title,
        subtitle: c.text || s.subtitle,
      };
    }
    return s;
  });

  return (
    <div className="relative z-40 -mt-16 lg:-mt-20 max-w-full mx-auto px-4 sm:px-8 lg:px-12">
      <div className="bg-white rounded-[2rem] lg:rounded-full shadow-2xl shadow-black/10 border border-gray-100 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-gray-50/50 pointer-events-none" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-y md:divide-y-0 lg:divide-x divide-gray-100 relative z-10 py-4 lg:py-2">
          {stats.map((stat) => (
            <AnimatedStat key={stat.id} {...stat} delay={stat.id * 0.1} />
          ))}
        </div>
      </div>
    </div>
  );
}
