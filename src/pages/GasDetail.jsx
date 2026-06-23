import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { FaArrowRight, FaPhone, FaCheckCircle, FaAward, FaChevronRight } from 'react-icons/fa';
import { getGas, getRelatedGases } from '../data/gasesData';

function StatBox({ stat }) {
  if (!stat) return null;
  return (
    <div className="text-center px-4 sm:px-6">
      <p className="text-white font-extrabold text-2xl sm:text-3xl leading-none">{stat.value}</p>
      {stat.label && <p className="text-gray-400 text-[11px] sm:text-xs uppercase tracking-widest mt-2">{stat.label}</p>}
    </div>
  );
}

export default function GasDetail() {
  const { categoryPath, slug } = useParams();
  const navigate = useNavigate();
  const gas = getGas(categoryPath, slug);

  if (!gas) return <Navigate to="/gases" replace />;

  const related = getRelatedGases(gas);
  const hasGrades = gas.purity_grades?.length > 0;
  const hasCylinders = gas.cylinders?.length > 0;
  const hasBulk = gas.bulk_supply?.length > 0;
  const hasTechSpecs = gas.techSpecs?.length > 0;
  const hasUseCases = gas.useCases?.length > 0;
  const hasCerts = gas.certifications?.length > 0;
  const statBoxes = [gas.stats.capacity, gas.stats.cylinders, gas.stats.stations, gas.stats.years].filter(Boolean);
  const sameFormula = !gas.formula || gas.formula === gas.name;

  const scrollToGrades = () => document.getElementById('grades')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="pt-24">
      <div className="bg-gray-50 border-b border-gray-100 px-4 sm:px-8 lg:px-12 py-3">
        <div className="max-w-[1400px] mx-auto flex items-center gap-2 text-xs text-gray-500">
          <Link to="/" className="hover:text-mclRed">Home</Link>
          <FaChevronRight size={8} />
          <Link to={`/gases#${gas.section}`} className="hover:text-mclRed">{gas.category}</Link>
          <FaChevronRight size={8} />
          <span className="text-gray-900 font-semibold">{gas.name}</span>
        </div>
      </div>

      <section className="relative w-full bg-slate-900 py-20 px-4 sm:px-8 lg:px-12 overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-mclRed/10 blur-3xl pointer-events-none" />
        <div className="relative max-w-[1400px] mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-white/10 text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">{gas.category}</span>
            {gas.availability && (
              <span className="flex items-center gap-1.5 bg-emerald-500/15 text-emerald-400 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> {gas.availability}
              </span>
            )}
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-3xl">
              <h1 className="text-white font-extrabold text-4xl lg:text-6xl leading-tight">
                {gas.name}{!sameFormula && <span className="text-mclRed"> ({gas.formula})</span>}
              </h1>
              {gas.supply_form && <p className="text-gray-400 text-lg mt-3">{gas.supply_form}</p>}
              <p className="text-gray-300 text-base mt-5 leading-relaxed">{gas.description}</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <button onClick={() => navigate('/contact')} className="bg-mclRed hover:bg-red-700 text-white font-bold text-sm uppercase tracking-wider px-7 py-3.5 rounded inline-flex items-center gap-2 transition-all hover:shadow-lg hover:shadow-red-900/30 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500">
                  <FaPhone size={13} /> Request Quote
                </button>
                {hasGrades && (
                  <button onClick={scrollToGrades} className="border-2 border-white/20 text-white hover:border-mclRed hover:text-mclRed font-bold text-sm uppercase tracking-wider px-7 py-3.5 rounded inline-flex items-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-mclRed">
                    View Grades <FaArrowRight size={12} />
                  </button>
                )}
              </div>
            </div>
            <div className="w-28 h-28 lg:w-36 lg:h-36 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
              <span className="text-mclRed font-black text-3xl lg:text-4xl">{gas.formula}</span>
            </div>
          </div>

          {statBoxes.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 mt-14 pt-8 border-t border-white/10 divide-x divide-white/10">
              {statBoxes.map((s, i) => <StatBox key={i} stat={s} />)}
            </div>
          )}
        </div>
      </section>

      {hasGrades && (
        <section id="grades" className="py-16 px-4 sm:px-8 lg:px-12 bg-white scroll-mt-28">
          <div className="max-w-[1400px] mx-auto">
            <p className="text-mclRed font-bold uppercase tracking-widest text-sm mb-2">Purity Standards</p>
            <h2 className="text-gray-900 font-extrabold text-3xl mb-10">Available Grades &amp; Specifications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {gas.purity_grades.map((g, i) => (
                <div key={i} className="border-2 border-gray-100 hover:border-mclRed rounded-xl p-6 transition-colors">
                  <p className="text-mclRed font-bold uppercase tracking-widest text-xs mb-2">{g.sector}</p>
                  <p className="text-gray-900 font-black text-2xl">{g.purity}</p>
                  <p className="text-gray-500 text-sm mt-1">{g.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {(hasTechSpecs || hasCylinders || hasBulk) && (
        <section className="py-16 px-4 sm:px-8 lg:px-12 bg-gray-50">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {hasTechSpecs && (
              <div>
                <p className="text-mclRed font-bold uppercase tracking-widest text-sm mb-2">Technical Specifications</p>
                <h2 className="text-gray-900 font-extrabold text-2xl mb-6">Product Data</h2>
                <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100 shadow-sm">
                  {gas.techSpecs.map((row, i) => (
                    <div key={i} className="flex items-center justify-between px-5 py-3.5">
                      <span className="text-gray-500 text-xs font-bold uppercase tracking-wide">{row.label}</span>
                      <span className="text-gray-900 font-semibold text-sm text-right">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(hasCylinders || hasBulk) && (
              <div>
                <p className="text-mclRed font-bold uppercase tracking-widest text-sm mb-2">Packaging &amp; Delivery</p>
                <h2 className="text-gray-900 font-extrabold text-2xl mb-6">Supply Options</h2>

                {hasCylinders && (
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                        <tr>
                          <th className="text-left px-5 py-3 font-bold">Cylinder</th>
                          <th className="text-left px-5 py-3 font-bold">Gas (m³)</th>
                          <th className="text-left px-5 py-3 font-bold">Valve</th>
                          <th className="text-left px-5 py-3 font-bold">Pressure</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {gas.cylinders.map((c, i) => (
                          <tr key={i}>
                            <td className="px-5 py-3 font-bold text-gray-900 whitespace-nowrap">{c.size}</td>
                            <td className="px-5 py-3 text-gray-600 whitespace-nowrap">{c.volume_m3}</td>
                            <td className="px-5 py-3 text-gray-600 whitespace-nowrap">{c.valve}</td>
                            <td className="px-5 py-3 text-mclRed font-semibold whitespace-nowrap">{c.pressure}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {hasBulk && (
                  <ul className="space-y-2.5">
                    {gas.bulk_supply.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                        <FaCheckCircle className="text-mclRed mt-0.5 flex-shrink-0" size={14} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {hasUseCases && (
        <section className="py-16 px-4 sm:px-8 lg:px-12 bg-white">
          <div className="max-w-[1400px] mx-auto">
            <p className="text-mclRed font-bold uppercase tracking-widest text-sm mb-2">Use Cases</p>
            <h2 className="text-gray-900 font-extrabold text-3xl mb-10">Where {gas.name} Is Used</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gas.useCases.map((uc, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-6 hover:border-mclRed hover:shadow-md transition-all">
                  <div className="w-9 h-9 rounded-lg bg-red-50 text-mclRed flex items-center justify-center font-bold text-xs mb-4">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="text-gray-900 font-bold text-base mb-2">{uc.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{uc.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {hasCerts && (
        <section className="py-10 px-4 sm:px-8 lg:px-12 bg-gray-50 border-t border-gray-100">
          <div className="max-w-[1400px] mx-auto flex flex-wrap items-center gap-3 justify-center">
            {[...new Set(gas.certifications)].map((c, i) => (
              <span key={i} className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-xs font-semibold text-gray-700">
                <FaAward className="text-mclRed" size={12} /> {c}
              </span>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="py-14 px-4 sm:px-8 lg:px-12 bg-white border-t border-gray-100">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-gray-900 font-bold text-xl mb-6">Explore More {gas.category}</h2>
            <div className="flex flex-wrap gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/gases/${r.categoryPath}/${r.slug}`}
                  className="group flex items-center gap-3 border border-gray-200 hover:border-mclRed rounded-xl px-5 py-3.5 transition-all hover:shadow-md"
                >
                  <span className="w-9 h-9 rounded-full bg-gray-50 group-hover:bg-red-50 text-mclRed font-bold text-xs flex items-center justify-center flex-shrink-0">{r.formula}</span>
                  <span className="text-gray-800 font-semibold text-sm group-hover:text-mclRed">{r.name}</span>
                  <FaArrowRight className="text-mclRed opacity-0 group-hover:opacity-100 transition-opacity" size={11} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 px-4 sm:px-8 lg:px-12 bg-gradient-to-r from-mclRed to-red-700">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-white font-extrabold text-3xl mb-3">Need {gas.name} For Your Facility?</h2>
          <p className="text-white/85 max-w-2xl mx-auto mb-8">Our team will assess your requirements and recommend the right grade and supply option.</p>
          <button onClick={() => navigate('/contact')} className="bg-white text-mclRed hover:bg-gray-100 font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded inline-flex items-center gap-2 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-white">
            <FaPhone size={13} /> Get A Quote
          </button>
        </div>
      </section>
    </div>
  );
}
