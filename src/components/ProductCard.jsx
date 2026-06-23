import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaArrowRight } from 'react-icons/fa';
import useInView from '../hooks/useInView';
import { slugify } from '../data/products';

// Gas titles are "Name (Formula)", e.g. "Oxygen (O₂)" — but some parenthetical
// suffixes are full names rather than formulas (e.g. "LPG (Liquefied Petroleum Gas)"),
// so only treat the parenthetical as a formula when it has no spaces.
function parseGasName(title) {
  const match = title.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  if (!match) return { name: title, formula: null };
  const [, name, paren] = match;
  return { name, formula: paren.includes(' ') ? null : paren };
}

// Curved-metal gradients: the off-center bright band fakes a cylindrical
// specular highlight, so a flat div reads as a rounded 3D surface.
const STEEL = 'linear-gradient(105deg, #6b7280 0%, #9ca3af 17%, #e5e7eb 37%, #ffffff 45%, #d1d5db 55%, #9ca3af 74%, #4b5563 100%)';
const STEEL_RED = 'linear-gradient(105deg, #7f1d1d 0%, #b91c1c 19%, #ef4444 40%, #fecaca 47%, #ef4444 55%, #b91c1c 75%, #7f1d1d 100%)';
const GUNMETAL = 'linear-gradient(105deg, #374151 0%, #6b7280 44%, #cbd5e1 50%, #4b5563 76%, #1f2937 100%)';

function GasCylinder({ name, formula, delay }) {
  const long = name.length > 14;

  return (
    <div className="relative w-full h-80 flex items-end justify-center overflow-hidden bg-gradient-to-b from-gray-100 via-gray-50 to-white">
      {/* brand glow + ground shadow */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-52 h-52 rounded-full bg-mclRed/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-4 rounded-[50%] bg-black/25 blur-md transition-all duration-500 group-hover:w-36 group-hover:bg-black/30" />

      <div className="relative flex flex-col items-center mb-6 animate-cyl-float motion-reduce:animate-none" style={{ animationDelay: delay }}>
        {/* valve cap */}
        <div className="w-2.5 h-2.5 rounded-[2px] bg-gray-900 z-30" />
        {/* handwheel — turns when the card is hovered */}
        <div className="-mt-1 w-9 h-9 rounded-full border-[3px] border-red-800 bg-gradient-to-br from-red-500 via-red-600 to-red-800 shadow-md z-20 flex items-center justify-center transition-transform duration-700 ease-out group-hover:rotate-[120deg]">
          <div className="w-2.5 h-2.5 rounded-full bg-red-950/70 shadow-inner" />
        </div>
        {/* valve body + outlet */}
        <div className="-mt-1.5 w-5 h-6 rounded-t-[3px] z-10 shadow-sm" style={{ background: GUNMETAL }} />
        {/* neck collar */}
        <div className="-mt-0.5 w-12 h-3 rounded-[3px] shadow z-10" style={{ background: STEEL }} />

        {/* red domed shoulder */}
        <div className="-mt-0.5 w-40 h-14 rounded-t-[80px] shadow-lg relative overflow-hidden" style={{ background: STEEL_RED }}>
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-6 rounded-full bg-white/40 blur-[1px]" />
        </div>

        {/* silver body */}
        <div className="-mt-2 w-40 h-44 rounded-b-[18px] shadow-2xl relative overflow-hidden flex flex-col items-center justify-center" style={{ background: STEEL }}>
          {/* hover gloss sweep */}
          <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/55 to-transparent skew-x-12 pointer-events-none" />
          {/* base ring */}
          <div className="absolute bottom-0 inset-x-0 h-5 bg-gradient-to-b from-transparent to-black/20" />

          <div className="text-center mb-3 relative">
            <p className="text-mclRed font-black text-2xl italic tracking-tighter drop-shadow-sm leading-none">MCL</p>
            <p className="text-[6.5px] font-bold text-gray-700 uppercase tracking-[0.22em] mt-1">Multan Chemicals</p>
          </div>

          <div className="text-center w-full px-2 relative">
            {formula && <div className="text-mclRed font-mono font-black text-3xl mb-1 drop-shadow-sm leading-none">{formula}</div>}
            <h4 className={`text-red-800 font-black uppercase break-words leading-tight ${long ? 'text-[11px] tracking-wide' : 'text-lg tracking-widest'}`}>
              {name}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductCard({ icon: Icon, image, title, description, features, index = 0, isGas = false, to }) {
  const [expanded, setExpanded] = useState(false);
  const [ref, inView] = useInView();
  const navigate = useNavigate();
  const gas = isGas ? parseGasName(title) : null;
  const hasVisual = !!(gas || image);

  return (
    <div
      id={slugify(title)}
      ref={ref}
      onClick={() => (to ? navigate(to) : setExpanded(!expanded))}
      aria-expanded={!to && expanded}
      style={{ transitionDelay: inView ? `${(index % 6) * 60}ms` : '0ms' }}
      className={`relative bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-red-900/10 transition-all duration-500 cursor-pointer group hover:-translate-y-1.5 scroll-mt-28 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      {gas ? (
        <GasCylinder name={gas.name.toUpperCase()} formula={gas.formula} delay={`${(index % 6) * 0.4}s`} />
      ) : image ? (
        <div className="relative aspect-[4/3] overflow-hidden">
          <img src={image} alt={title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="text-white font-bold text-lg leading-snug drop-shadow">{title}</h3>
          </div>
        </div>
      ) : (
        <div className="relative bg-gradient-to-br from-slate-800 via-slate-800 to-mclRed p-6 pb-9 text-white overflow-hidden">
          <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-white/5" />
          <div className="absolute -right-2 top-8 w-16 h-16 rounded-full bg-white/5" />
          <h3 className="relative text-lg font-bold mb-1 pr-12 leading-snug">{title}</h3>
          <p className="relative text-sm text-white/75 leading-relaxed">{description}</p>
        </div>
      )}

      {!hasVisual && (
        <div className="relative flex justify-end px-6">
          <div className="absolute -top-7 right-6 w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-mclRed group-hover:bg-mclRed group-hover:text-white group-hover:-rotate-6 transition-all duration-300">
            <Icon size={24} />
          </div>
        </div>
      )}

      <div className={hasVisual ? 'px-6 pt-4' : ''}>
        {hasVisual && <p className="text-sm text-gray-600 leading-relaxed">{description}</p>}
      </div>

      {!to && (
        <div className={`grid transition-all duration-300 ease-in-out ${expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`} style={{ display: 'grid' }}>
          <div className="overflow-hidden">
            {features && (
              <div className="px-6 pt-2 pb-4">
                <h4 className="font-bold text-gray-900 mb-3 uppercase text-xs tracking-wide">Key Features</h4>
                <ul className="space-y-2">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <FaCheck className="text-mclRed mt-0.5 flex-shrink-0" size={12} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{to ? 'View details' : expanded ? 'Show less' : 'Key features'}</span>
        <span className="w-7 h-7 rounded-full bg-gray-50 group-hover:bg-red-50 flex items-center justify-center transition-colors">
          <FaArrowRight className={`text-mclRed transition-transform duration-300 ${!to && expanded ? 'rotate-90' : ''}`} size={11} />
        </span>
      </div>
    </div>
  );
}
