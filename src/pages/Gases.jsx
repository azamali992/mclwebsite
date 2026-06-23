import { useEffect } from 'react';
import { FaCheck, FaArrowRight, FaAward, FaLock, FaUsers, FaFileAlt, FaPhone } from 'react-icons/fa';
import useInView from '../hooks/useInView';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import useContent from '../hooks/useContent';
import ProductCard from '../components/ProductCard';
import heroBg from '../assets/infra01.JPG';
import cylinderYardImg from '../assets/infra02.JPG';
import medicalGasImg from '../assets/products/mgps-ward-hero.jpeg';
import specialtyGasImg from '../assets/daplant.png';
import lpgImg from '../assets/trucks1.JPG';
import {
  industrialGases, medicalGases, specialtyGases, lpgGases, categoryGroups,
} from '../data/products';

const gasesGroup = categoryGroups.find((g) => g.id === 'gases');

const categoryImages = {
  industrial: cylinderYardImg,
  medical: medicalGasImg,
  specialty: specialtyGasImg,
  lpg: lpgImg,
};

function SectionWrap({ children, className = '', id }) {
  const [ref, inView] = useInView();
  return (
    <section id={id} ref={ref} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </section>
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

  const gasDefaults = {
    industrial: industrialGases,
    medical: medicalGases,
    specialty: specialtyGases,
    lpg: lpgGases,
  };

  const getProductsForCategory = (categoryId) => gasDefaults[categoryId] || [];

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
              <button
                key={cat.id}
                onClick={() => document.getElementById(cat.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="group relative h-64 lg:h-96 rounded-2xl overflow-hidden shadow-xl focus:outline-none focus:ring-2 focus:ring-mclRed"
              >
                <img src={categoryImages[cat.id]} alt={cat.label} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-slate-900/10" />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-5 lg:p-6 text-center">
                  <cat.icon className="text-mclRed mb-3" size={28} />
                  <h3 className="text-white font-bold text-base lg:text-xl leading-tight">{cat.label}</h3>
                  <span className="text-white/70 text-[10px] lg:text-xs uppercase tracking-widest mt-2 flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Products <FaArrowRight size={9} />
                  </span>
                </div>
              </button>
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
                {getProductsForCategory(cat.id).map((product, i) => (
                  <ProductCard key={i} index={i} {...product} />
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
