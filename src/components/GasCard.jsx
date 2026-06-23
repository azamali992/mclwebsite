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
      className="group relative flex flex-col h-full min-h-[330px] p-7 lg:p-8 bg-white rounded-[20px] border-2 border-mclRed/30 shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden transition-[transform,background-color,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:bg-mclRed hover:border-mclRed hover:shadow-[0_28px_55px_-18px_rgba(220,38,38,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-mclRed focus-visible:ring-offset-2"
    >
      {/* faint oversized formula for depth — stays a whisper in both states */}
      <span className="pointer-events-none select-none absolute -right-3 -top-6 font-serif font-light text-[8.5rem] leading-none text-gray-900/[0.035] group-hover:text-white/[0.12] transition-colors duration-500">
        {gas.formula}
      </span>

      {/* eyebrow + availability */}
      <div className="relative flex items-center justify-between mb-9">
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mclRed group-hover:text-white transition-colors duration-500">
          {categoryLabel}
        </span>
        {gas.availability && (
          <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400 group-hover:text-white/80 transition-colors duration-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:bg-white transition-colors duration-500" />
            {gas.availability}
          </span>
        )}
      </div>

      {/* formula + name, editorial serif pairing */}
      <p className="relative font-serif font-light text-5xl lg:text-6xl tracking-tight leading-none text-gray-900 group-hover:text-white transition-colors duration-500">
        {gas.formula}
      </p>
      <h3 className="relative font-serif text-2xl font-semibold tracking-tight text-gray-900 group-hover:text-white mt-4 transition-colors duration-500">
        {gas.name}
      </h3>

      <p className="relative text-sm leading-relaxed text-gray-500 group-hover:text-white/85 mt-3 line-clamp-3 transition-colors duration-500">
        {gas.description}
      </p>

      <div className="flex-1" />

      {/* footer: headline metric + explore */}
      <div className="relative mt-8 pt-5 flex items-end justify-between border-t border-gray-100 group-hover:border-white/25 transition-colors duration-500">
        <div className="min-w-0 pr-3">
          <p className="font-serif text-xl leading-none text-gray-900 group-hover:text-white truncate transition-colors duration-500">
            {stat.value}
          </p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 group-hover:text-white/70 mt-2 transition-colors duration-500">
            {stat.label}
          </p>
        </div>
        <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-mclRed group-hover:text-white whitespace-nowrap transition-colors duration-500">
          Explore
          <FaArrowRight size={11} className="group-hover:translate-x-1 transition-transform duration-300" />
        </span>
      </div>
    </Link>
  );
}
