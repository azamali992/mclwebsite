import { useEffect } from 'react';
import { FaCheck, FaArrowRight, FaAward, FaLock, FaUsers, FaFileAlt, FaPhone } from 'react-icons/fa';
import useInView from '../hooks/useInView';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import useContent from '../hooks/useContent';
import GasCard from '../components/GasCard';
import heroBg from '../assets/infra01.JPG';
import { categoryGroups } from '../data/products';
import { gasesBySection } from '../data/gasesData';

const gasesGroup = categoryGroups.find((g) => g.id === 'gases');

function SectionWrap({ children, className = '', id }) {
  const [ref, inView] = useInView();
  return (
    <section id={id} ref={ref} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </section>
  );
}

function CategoryCard({ cat, count }) {
  const Icon = cat.icon;
  return (
    <button
      onClick={() => document.getElementById(cat.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
      className="group relative flex flex-col h-64 lg:h-80 p-6 lg:p-7 bg-white rounded-[20px] border-2 border-mclRed/30 shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden text-left transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_28px_55px_-18px_rgba(29,78,216,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-mclRed focus-visible:ring-offset-2"
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-700 to-mclRed opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <Icon className="absolute z-10 -right-4 -top-4 pointer-events-none select-none text-gray-900/[0.04] group-hover:text-white/[0.14] transition-colors duration-500" size={140} />

      <div className="relative z-10 w-12 h-12 rounded-xl bg-red-50 text-mclRed flex items-center justify-center group-hover:bg-white/15 group-hover:text-white transition-colors duration-500">
        <Icon size={22} />
      </div>

      <h3 className="relative z-10 font-serif text-2xl font-semibold tracking-tight text-gray-900 group-hover:text-white mt-6 transition-colors duration-500">
        {cat.label}
      </h3>

      <div className="relative z-10 flex-1" />

      <div className="relative z-10 pt-5 flex items-end justify-between border-t border-gray-100 group-hover:border-white/25 transition-colors duration-500">
        <div>
          <p className="font-serif text-xl leading-none text-gray-900 group-hover:text-white transition-colors duration-500">{count}</p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 group-hover:text-white/70 mt-2 transition-colors duration-500">
            {count === 1 ? 'Gas Available' : 'Gases Available'}
          </p>
        </div>
        <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-mclRed group-hover:text-white whitespace-nowrap transition-colors duration-500">
          View
          <FaArrowRight size={11} className="group-hover:translate-x-1 transition-transform duration-300" />
        </span>
      </div>
    </button>
  );
}

export default function Gases() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const { contentMap } = useContent('products');

  useEffect(() => {
    if (!categoryParam) return;
    const timeout = setTimeout(() => {
      document.getElementById(categoryParam)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
    return () => clearTimeout(timeout);
  }, [categoryParam]);

  const getProductsForCategory = (categoryId) => gasesBySection[categoryId] || [];

  const pageTitle = contentMap['page-hero-title']?.title || 'Industrial, Medical & Specialty Gases';
  const pageDesc = contentMap['page-hero-description']?.title || 'Multan Chemicals Limited is Pakistan\'s premier supplier of high-purity industrial gases, medical-grade gases, specialty gas mixtures, and LPG.';

  return (
    <div className="pt-24">
      <section className="relative w-full bg-slate-900 py-24 px-4 sm:px-8 lg:px-12 overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-900" />
        <div className="relative max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-mclRed font-bold uppercase tracking-widest text-sm mb-3">Our Gases</p>
            <h1 className="text-white font-extrabold text-4xl lg:text-5xl leading-tight mb-4">{pageTitle}</h1>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">{pageDesc}</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {gasesGroup.items.map((cat) => (
              <CategoryCard key={cat.id} cat={cat} count={gasesBySection[cat.id]?.length || 0} />
            ))}
          </div>
        </div>
      </section>

      <div className="space-y-16 py-20">
        {gasesGroup.items.map((cat) => (
          <SectionWrap key={cat.id} id={cat.id} className="px-4 sm:px-8 lg:px-12 scroll-mt-28">
            <div className="max-w-[1400px] mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-red-50 text-mclRed flex items-center justify-center flex-shrink-0">
                  <cat.icon size={18} />
                </div>
                <h3 className="text-gray-900 font-bold text-xl">{cat.label}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getProductsForCategory(cat.id).map((gas) => (
                  <GasCard key={gas.slug} gas={gas} to={`/gases/${gas.categoryPath}/${gas.slug}`} />
                ))}
              </div>
            </div>
          </SectionWrap>
        ))}
      </div>

      <SectionWrap className="py-20 bg-gradient-to-r from-mclRed to-red-700 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-white text-3xl font-bold mb-12 text-center">Why Choose MCL Products?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FaAward, title: 'International Standards', desc: 'HTM, NFPA, ISO compliant systems' },
              { icon: FaLock, title: 'Safety First', desc: 'Maximum protection for patients and staff' },
              { icon: FaUsers, title: 'Expert Support', desc: '24/7 technical support and maintenance' },
              { icon: FaFileAlt, title: 'Quality Assured', desc: 'Certified materials and rigorous testing' }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="text-center text-white">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-white/80 text-sm">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </SectionWrap>

      <SectionWrap className="py-16 bg-white px-4 sm:px-8 lg:px-12 border-t-4 border-mclRed">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Need a Custom Solution?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact our team for customized gas supply solutions and system consultations tailored to your facility needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('/contact')} className="bg-mclRed hover:bg-red-800 text-white px-8 py-3.5 font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-all focus:ring-2 focus:ring-red-500 focus:outline-none rounded">
              <FaPhone /> Contact Us
            </button>
            <button onClick={() => navigate('/careers')} className="border-2 border-mclRed text-mclRed hover:bg-mclRed hover:text-white px-8 py-3.5 font-bold uppercase tracking-wider transition-all focus:ring-2 focus:ring-mclRed focus:outline-none rounded">
              Join Our Team
            </button>
          </div>
        </div>
      </SectionWrap>

      <SectionWrap className="py-10 bg-gray-50 px-4 sm:px-8 lg:px-12 text-center">
        <p className="text-gray-600 text-sm">
          <FaCheck className="inline text-mclRed mb-0.5 mr-2" size={14} />
          HTM 02-01 &middot; NFPA 99 &middot; ISO 7396-1 &middot; ISO 9001 certified —{' '}
          <Link to="/about#certifications" className="text-mclRed font-semibold hover:underline">see all certifications</Link>
        </p>
      </SectionWrap>
    </div>
  );
}
