import { useState, useEffect, useRef } from 'react';

/**
 * requestAnimationFrame-driven count-up from 0 to `target`, eased with
 * ease-out-cubic so it starts fast and settles rather than ticking linearly.
 * Honors `prefers-reduced-motion` by collapsing straight to the final value.
 * Extracted from `StatsRow.jsx` (its original home) so other static-stat
 * sections can reuse the exact same, already-reviewed implementation.
 */
export default function useCountUp(target, active, duration = 1400) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!active) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dur = reduced ? 0 : duration;
    let startTime;
    const ease = (t) => 1 - Math.pow(1 - t, 3); // ease-out cubic
    const tick = (now) => {
      if (!startTime) startTime = now;
      const p = dur === 0 ? 1 : Math.min((now - startTime) / dur, 1);
      setValue(Math.round(ease(p) * target));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, active, duration]);

  return value;
}
