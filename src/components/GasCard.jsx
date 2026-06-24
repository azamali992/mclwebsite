import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

// Pick the single most meaningful headline metric for the footer, gracefully
// degrading across the inconsistent scraped dataset.
function headlineStat(gas) {
  const grade = gas.purity_grades?.[0];
  if (grade) return { value: grade.purity, label: `${grade.label}` };
  if (gas.supply_form) return { value: gas.supply_form, label: 'Supply form' };
  if (gas.stats?.capacity) return { value: gas.stats.capacity.value, label: 'Plant capacity' };
  return { value: gas.availability || 'Available', label: 'Availability' };
}

export default function GasCard({ gas, to }) {
  const stat = headlineStat(gas);
  const categoryLabel = gas.category.replace(/Gases$/i, 'Gas').trim();

  return (
    <Link
      to={to}
      className="group relative flex h-full min-h-[330px] flex-col overflow-hidden rounded-lg border border-line bg-canvas p-7 transition-[transform,background-color,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:border-accent hover:bg-accent hover:shadow-[var(--shadow-accent)] lg:p-8"
    >
      {/* faint oversized formula for depth — a whisper in both states */}
      <span className="pointer-events-none absolute -right-3 -top-6 select-none font-mono text-[7.5rem] font-light leading-none text-ink/[0.04] transition-colors duration-300 group-hover:text-white/[0.12]">
        {gas.formula}
      </span>

      {/* category + availability */}
      <div className="relative mb-9 flex items-center justify-between">
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-accent transition-colors duration-300 group-hover:text-white">
          {categoryLabel}
        </span>
        {gas.availability && (
          <span className="flex items-center gap-1.5 text-[11px] font-medium text-muted transition-colors duration-300 group-hover:text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 transition-colors duration-300 group-hover:bg-white" />
            {gas.availability}
          </span>
        )}
      </div>

      {/* formula + name */}
      <p className="relative font-mono text-5xl font-light leading-none tracking-tight text-ink transition-colors duration-300 group-hover:text-white lg:text-6xl">
        {gas.formula}
      </p>
      <h3 className="relative mt-4 text-2xl font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-white">
        {gas.name}
      </h3>

      <p className="relative mt-3 line-clamp-3 text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-white/85">
        {gas.description}
      </p>

      <div className="flex-1" />

      {/* footer: headline metric + explore */}
      <div className="relative mt-8 flex items-end justify-between border-t border-line pt-5 transition-colors duration-300 group-hover:border-white/25">
        <div className="min-w-0 pr-3">
          <p className="truncate font-mono text-xl leading-none text-ink transition-colors duration-300 group-hover:text-white">
            {stat.value}
          </p>
          <p className="mt-2 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted transition-colors duration-300 group-hover:text-white/70">
            {stat.label}
          </p>
        </div>
        <span className="flex items-center gap-1.5 whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.14em] text-accent transition-colors duration-300 group-hover:text-white">
          Explore
          <FaArrowRight size={11} className="transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
