import { useState } from 'react';
import { FaCheck, FaArrowRight } from 'react-icons/fa';
import useInView from '../hooks/useInView';
import { slugify } from '../data/products';

export default function ProductCard({ icon: Icon, image, title, description, features, index = 0 }) {
  const [expanded, setExpanded] = useState(false);
  const [ref, inView] = useInView();

  return (
    <div
      id={slugify(title)}
      ref={ref}
      onClick={() => setExpanded(!expanded)}
      aria-expanded={expanded}
      style={{ transitionDelay: inView ? `${(index % 6) * 60}ms` : '0ms' }}
      className={`relative bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-red-900/10 transition-all duration-500 cursor-pointer group hover:-translate-y-1.5 scroll-mt-28 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      {image ? (
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

      {!image && (
        <div className="relative flex justify-end px-6">
          <div className="absolute -top-7 right-6 w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-mclRed group-hover:bg-mclRed group-hover:text-white group-hover:-rotate-6 transition-all duration-300">
            <Icon size={24} />
          </div>
        </div>
      )}

      <div className={image ? 'px-6 pt-4' : ''}>
        {image && <p className="text-sm text-gray-600 leading-relaxed">{description}</p>}
      </div>

      <div className={`grid transition-all duration-300 ease-in-out ${expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`} style={{ display: 'grid' }}>
        <div className="overflow-hidden">
          {features && (
            <div className="px-6 pt-2 pb-4">
              <h4 className="font-bold text-gray-900 mb-3 uppercase text-xs tracking-wide">Key Features</h4>
              <ul className="space-y-2">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <FaCheck className="text-mclRed mt-1 flex-shrink-0" size={12} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{expanded ? 'Show less' : 'Key features'}</span>
        <span className="w-7 h-7 rounded-full bg-gray-50 group-hover:bg-red-50 flex items-center justify-center transition-colors">
          <FaArrowRight className={`text-mclRed transition-transform duration-300 ${expanded ? 'rotate-90' : ''}`} size={11} />
        </span>
      </div>
    </div>
  );
}
