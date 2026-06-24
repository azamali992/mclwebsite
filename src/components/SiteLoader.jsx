import { useState, useEffect } from 'react';
import logo from '../assets/MCL_Logo.jpeg';

export default function SiteLoader() {
  // Only show on the first visit of a session — a preloader on every navigation
  // is friction on a high-frequency action.
  const [phase, setPhase] = useState(() => {
    if (typeof window === 'undefined') return 'done';
    return sessionStorage.getItem('mcl_seen') ? 'done' : 'loading';
  });

  useEffect(() => {
    if (phase === 'done') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    sessionStorage.setItem('mcl_seen', '1');

    if (reduced) {
      const t = setTimeout(() => setPhase('done'), 200);
      return () => clearTimeout(t);
    }

    document.body.style.overflow = 'hidden';
    const tExit = setTimeout(() => setPhase('exiting'), 1100);
    const tDone = setTimeout(() => setPhase('done'), 1600);
    return () => {
      clearTimeout(tExit);
      clearTimeout(tDone);
      document.body.style.overflow = '';
    };
  }, [phase]);

  useEffect(() => {
    if (phase === 'done' || phase === 'exiting') document.body.style.overflow = '';
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-canvas ${phase === 'exiting' ? 'loader-exit' : ''}`}
    >
      <img src={logo} alt="Multan Chemicals Limited" className="loader-logo w-28 sm:w-32" />
      <p className="loader-word mt-6 font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-muted">
        Multan Chemicals Limited
      </p>
      <div className="relative mt-6 h-[2px] w-44 overflow-hidden rounded-full bg-line sm:w-56">
        <span className="loader-fill absolute inset-y-0 left-0 w-2/5 rounded-full bg-accent" />
      </div>
    </div>
  );
}
