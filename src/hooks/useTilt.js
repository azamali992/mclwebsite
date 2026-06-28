import { useRef, useCallback, useEffect } from 'react';

const SPRING_BACK = 'transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';
// Exponential-follow damping per animation frame — the tilt chases the
// cursor's target angle rather than snapping straight to it, giving it a
// touch of natural lag/momentum instead of feeling artificially rigid.
// (A hand-rolled approximation of a spring, in the same spirit as
// `useCountUp`'s RAF-driven easing — no new animation dependency.)
const FOLLOW_DAMPING = 0.22;

/**
 * 3D perspective tilt + cursor-tracking specular highlight for hover cards.
 * Spread the returned handlers onto the tilting element along with `ref`.
 * Mutates the element's style directly (no React state/re-render per
 * mousemove) so the tilt tracks the cursor at full pointer-event frequency.
 * No-ops entirely under `prefers-reduced-motion`.
 *
 * @param {object} [options]
 * @param {number} [options.max=8] - maximum rotation in degrees, either axis.
 */
export default function useTilt({ max = 8 } = {}) {
  const ref = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafId = useRef(0);

  // Plain hoisted function (not a `const`/`useCallback`) so its own
  // recursive `requestAnimationFrame(tick)` call isn't "used before
  // declared" — it only ever reads from refs, so it needs no memoization.
  function tick() {
    const el = ref.current;
    if (!el) return;
    current.current.x += (target.current.x - current.current.x) * FOLLOW_DAMPING;
    current.current.y += (target.current.y - current.current.y) * FOLLOW_DAMPING;
    el.style.transform = `perspective(1000px) rotateX(${current.current.y}deg) rotateY(${current.current.x}deg)`;

    const settled = Math.abs(target.current.x - current.current.x) < 0.05
      && Math.abs(target.current.y - current.current.y) < 0.05;
    if (!settled) {
      rafId.current = requestAnimationFrame(tick);
    } else {
      rafId.current = 0;
    }
  }

  const startLoop = useCallback(() => {
    if (!rafId.current) rafId.current = requestAnimationFrame(tick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => () => cancelAnimationFrame(rafId.current), []);

  const onMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    target.current = { x: (x - 0.5) * 2 * max, y: (0.5 - y) * 2 * max };

    el.style.transition = 'none';
    el.style.setProperty('--tilt-glow-x', `${x * 100}%`);
    el.style.setProperty('--tilt-glow-y', `${y * 100}%`);
    el.style.setProperty('--tilt-glow-opacity', '1');
    startLoop();
  }, [max, startLoop]);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(rafId.current);
    rafId.current = 0;
    target.current = { x: 0, y: 0 };
    current.current = { x: 0, y: 0 };
    el.style.transition = SPRING_BACK;
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    el.style.setProperty('--tilt-glow-opacity', '0');
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
