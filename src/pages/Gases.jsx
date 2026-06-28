import { useEffect } from 'react';
import { FaCheck, FaArrowRight, FaAward, FaLock, FaUsers, FaFileAlt, FaPhone } from 'react-icons/fa';
import SectionWrap from '../components/SectionWrap';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import useContent from '../hooks/useContent';
import useTilt from '../hooks/useTilt';
import GasCard from '../components/GasCard';
import heroBg from '../assets/infra01.JPG';
import { categoryGroups } from '../data/products';
import { gasesBySection } from '../data/gasesData';
import Seo, { SITE_URL } from '../components/Seo';

const gasesGroup = categoryGroups.find((g) => g.id === 'gases');

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
    { '@type': 'ListItem', position: 2, name: 'Gases', item: SITE_URL + '/gases' },
  ],
};

function CategoryCard({ cat, count }) {
  const Icon = cat.icon;
  const { ref: tiltRef, onMouseMove, onMouseLeave } = useTilt();
  return (
    <button
      ref={tiltRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={() => document.getElementById(cat.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
      className="group relative flex h-64 flex-col overflow-hidden rounded-lg border border-line bg-canvas p-6 text-left transition-[background-color,border-color,box-shadow] duration-300 ease-out hover:border-accent hover:bg-accent hover:shadow-[var(--shadow-accent)] lg:h-80 lg:p-7"
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-[var(--tilt-glow-opacity,0)] transition-opacity duration-300"
        style={{ background: 'radial-gradient(circle at var(--tilt-glow-x,50%) var(--tilt-glow-y,50%), rgba(255,255,255,0.18), transparent 60%)' }}
      />
      <Icon className="pointer-events-none absolute -right-4 -top-4 select-none text-ink/[0.04] transition-colors duration-300 group-hover:text-white/[0.14]" size={140} />

      <div className="relative flex h-12 w-12 items-center justify-center rounded-md bg-accent-soft text-accent transition-colors duration-300 group-hover:bg-white/15 group-hover:text-white">
        <Icon size={22} />
      </div>

      <h3 className="relative mt-6 text-2xl font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-white">
        {cat.label}
      </h3>

      <div className="relative flex-1" />

      <div className="relative flex items-end justify-between border-t border-line pt-5 transition-colors duration-300 group-hover:border-white/25">
        <div>
          <p className="font-mono text-xl leading-none text-ink transition-colors duration-300 group-hover:text-white">{count}</p>
          <p className="mt-2 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted transition-colors duration-300 group-hover:text-white/70">
            {count === 1 ? 'Gas available' : 'Gases available'}
          </p>
        </div>
        <span className="flex items-center gap-1.5 whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.14em] text-accent transition-colors duration-300 group-hover:text-white">
          View
          <FaArrowRight size={11} className="transition-transform duration-200 group-hover:translate-x-1" />
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
      <Seo
        title="Industrial, Medical & Specialty Gases"
        description="Multan Chemicals Limited supplies high-purity industrial gases, medical-grade gases, specialty gas mixtures and LPG across Pakistan: explore oxygen, nitrogen, argon, acetylene, hydrogen, helium and more by category."
        path="/gases"
        jsonLd={breadcrumbJsonLd}
      />
      <section className="relative w-full overflow-hidden bg-ink-deep px-6 py-24 sm:px-8 lg:px-12">
        <img src={heroBg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.18]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#06101b]/95 via-[#06101b]/90 to-[#06101b]" />
        <div className="relative mx-auto max-w-[1400px]">
          <div className="mb-12 max-w-3xl">
            <p className="eyebrow mb-4" style={{ color: 'var(--on-ink-accent)' }}>Our gases</p>
            <h1 className="text-4xl font-semibold leading-[1.06] tracking-tight text-white lg:text-[3.25rem]">{pageTitle}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-on-dark-soft">{pageDesc}</p>
          </div>

          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-6">
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
              <div className="mb-8 flex items-baseline gap-3 border-b border-line pb-4">
                <cat.icon size={18} className="self-center text-accent" />
                <h3 className="text-xl font-semibold tracking-tight text-ink">{cat.label}</h3>
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

      <SectionWrap className="bg-ink-deep px-6 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="mb-14 max-w-2xl text-3xl font-semibold tracking-tight text-white md:text-[2.5rem]">Why teams choose MCL</h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: FaAward, title: 'International standards', desc: 'HTM, NFPA and ISO compliant systems' },
              { icon: FaLock, title: 'Safety first', desc: 'Maximum protection for patients and staff' },
              { icon: FaUsers, title: 'Expert support', desc: '24/7 technical support and maintenance' },
              { icon: FaFileAlt, title: 'Quality assured', desc: 'Certified materials and rigorous testing' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i}>
                  <Icon size={24} className="text-on-ink-accent" />
                  <h3 className="mt-5 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-on-dark-soft">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </SectionWrap>

      <SectionWrap className="bg-surface px-6 py-24 text-center sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-[2.5rem]">Need a custom solution?</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
            Talk to our team about customised gas supply and system consultations tailored to your facility.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button onClick={() => navigate('/contact')} className="btn btn-primary"><FaPhone size={13} /> Contact us</button>
            <button onClick={() => navigate('/careers')} className="btn btn-ghost">Join our team</button>
          </div>
        </div>
      </SectionWrap>

      <SectionWrap className="bg-canvas px-6 py-10 text-center sm:px-8 lg:px-12">
        <p className="text-sm text-muted">
          <FaCheck className="mb-0.5 mr-2 inline text-accent" size={13} />
          HTM 02-01 · NFPA 99 · ISO 7396-1 · ISO 9001 certified.{' '}
          <Link to="/about#certifications" className="font-semibold text-accent hover:underline">See all certifications</Link>
        </p>
      </SectionWrap>
    </div>
  );
}
