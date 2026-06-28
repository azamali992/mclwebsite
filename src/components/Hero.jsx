import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import useContent from '../hooks/useContent';
import heroImg from '../assets/heromcl.png';

export default function Hero() {
  const navigate = useNavigate();
  const { contentMap } = useContent('hero');

  const title = contentMap['slide-1-title']?.title || 'Industrial and medical gases, engineered for Pakistan.';
  const subtitle = contentMap['slide-1-subtitle']?.title || 'High-purity gases, medical pipeline systems and healthcare engineering, delivered nationwide with uncompromising safety.';

  return (
    <section className="relative min-h-[calc(100dvh-13rem)] w-full overflow-hidden bg-ink-deep">
      <img
        src={heroImg}
        alt=""
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Directional scrim — readable copy, image still breathes on the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#06101b]/92 via-[#06101b]/70 to-[#06101b]/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#06101b]/80 via-transparent to-transparent" />

      {/* Ambient depth — ~3-4% opacity, never competes with the copy's contrast.
          Color is --on-ink-accent, the same accent-on-dark token the eyebrow
          text already uses in this section, not a new color. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <span className="absolute left-[8%] top-[18%] h-24 w-24 rounded-full animate-float-ambient" style={{ background: 'var(--on-ink-accent)', opacity: 0.04, animationDelay: '0s' }} />
        <span className="absolute left-[28%] top-[62%] h-16 w-16 rounded-full animate-float-ambient" style={{ background: 'var(--on-ink-accent)', opacity: 0.05, animationDelay: '1.2s' }} />
        <span className="absolute left-[55%] top-[12%] h-32 w-32 rounded-full animate-float-ambient" style={{ background: 'var(--on-ink-accent)', opacity: 0.03, animationDelay: '2.4s' }} />
        <span className="absolute left-[72%] top-[55%] h-20 w-20 rounded-full animate-float-ambient" style={{ background: 'var(--on-ink-accent)', opacity: 0.04, animationDelay: '3.1s' }} />
        <span className="absolute left-[42%] top-[80%] h-12 w-12 rounded-full animate-float-ambient" style={{ background: 'var(--on-ink-accent)', opacity: 0.05, animationDelay: '4.3s' }} />
      </div>

      <div className="relative z-10 flex min-h-[calc(100dvh-13rem)] items-center">
        <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-8 lg:px-12">
          <div className="max-w-2xl reveal is-in">
            <p className="eyebrow mb-5" style={{ color: 'var(--on-ink-accent)' }}>
              Multan Chemicals Limited
            </p>
            <h1 className="text-balance text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.03em] text-white sm:text-6xl lg:text-[4.25rem]">
              {title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#c8cfd8]">
              {subtitle}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/gases')}
                className="btn btn-primary"
              >
                Explore our gases
                <FaArrowRight size={13} />
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="btn"
                style={{ color: '#fff', border: '1px solid rgba(255,255,255,0.32)' }}
              >
                Contact us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
