import { FaRegCalendarAlt, FaIndustry, FaTruck, FaUsers, FaGasPump, FaUserTie } from 'react-icons/fa';
import { TbCylinder } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import useStats from '../hooks/useStats';
import useInView from '../hooks/useInView';
import useCountUp from '../hooks/useCountUp';
import { resolveStat } from '../data/stats';

function Stat({ icon: Icon, number, title, subtitle, active, onClick }) {
  const numeric = parseInt(String(number).replace(/[^0-9]/g, ''), 10) || 0;
  const suffix = String(number).replace(/[0-9,]/g, '');
  const display = useCountUp(numeric, active);

  return (
    <div onClick={onClick} className="group px-6 py-7 text-center transition-colors duration-200 ease-out hover:bg-accent-soft cursor-pointer">
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
  { key: 'years_of_excellence', icon: FaRegCalendarAlt, path: '/about' },
  { key: 'oxygen_plant_capacity', icon: FaIndustry, path: '/production' },
  { key: 'cylinder_capacity', icon: TbCylinder, path: '/production' },
  { key: 'fleet_trucks', icon: FaTruck, path: '/infrastructure' },
  { key: 'filling_stations', icon: FaGasPump, path: '/infrastructure' },
  { key: 'employees', icon: FaUserTie, path: '/careers' },
  { key: 'satisfied_clients', icon: FaUsers, path: '/about#clients' },
];

export default function StatsRow() {
  const navigate = useNavigate();
  const { statsMap } = useStats();
  const [ref, inView] = useInView({ threshold: 0.3 });

  const handleStatClick = (path) => {
    const [base, hash] = path.split('#');
    navigate(base);
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const stats = statCards.map((card) => {
    const stat = resolveStat(statsMap, card.key);
    return { key: card.key, icon: card.icon, number: stat.value, title: stat.label, subtitle: stat.subtitle, path: card.path };
  });

  return (
    <section className="relative z-30 -mt-16 pb-4 sm:-mt-16 lg:-mt-16">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
        <div
          ref={ref}
          className="overflow-hidden rounded-[2.5rem] border border-line bg-canvas shadow-[var(--shadow-lg)] lg:rounded-full lg:px-6"
        >
          <div className="grid grid-cols-2 divide-line sm:grid-cols-4 sm:divide-x lg:grid-cols-7 lg:divide-x [&>*]:border-t [&>*]:border-line sm:[&>*]:border-t-0">
            {stats.map((s) => (
              <Stat key={s.key} {...s} active={inView} onClick={() => handleStatClick(s.path)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
