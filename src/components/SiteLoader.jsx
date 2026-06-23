import { useState, useEffect } from 'react';
import logo from '../assets/MCL_Logo.jpeg';

export default function SiteLoader() {
  // loading → exiting (curtain slides up) → done (unmounted)
  const [phase, setPhase] = useState('loading');

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      // Skip the show; just briefly cover then reveal.
      const t = setTimeout(() => setPhase('done'), 300);
      return () => clearTimeout(t);
    }

    document.body.style.overflow = 'hidden';
    const tExit = setTimeout(() => setPhase('exiting'), 1900);
    const tDone = setTimeout(() => setPhase('done'), 2750);
    return () => {
      clearTimeout(tExit);
      clearTimeout(tDone);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (phase === 'done' || phase === 'exiting') document.body.style.overflow = '';
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white ${phase === 'exiting' ? 'loader-exit' : ''}`}
    >
      <div className="relative flex items-center justify-center">
        {/* expanding brand rings behind the logo */}
        <span className="absolute w-40 h-40 rounded-full border border-mclRed/30 loader-ring" />
        <span className="absolute w-40 h-40 rounded-full border border-mclRed/20 loader-ring" style={{ animationDelay: '0.5s' }} />

        <img src={logo} alt="Multan Chemicals Limited" className="loader-logo relative w-32 sm:w-40 h-auto object-contain" />
      </div>

      <p className="loader-word mt-7 text-[11px] sm:text-xs font-bold uppercase tracking-[0.4em] text-gray-500">
        Multan Chemicals Limited
      </p>

      {/* slim indeterminate progress bar */}
      <div className="loader-track relative mt-6 w-44 sm:w-56 h-[3px] rounded-full bg-gray-100 overflow-hidden">
        <span className="loader-fill absolute top-0 h-full w-2/5 rounded-full bg-gradient-to-r from-mclRed/0 via-mclRed to-mclRed/0" />
      </div>
    </div>
  );
}
