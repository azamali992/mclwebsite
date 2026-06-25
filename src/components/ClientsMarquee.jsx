import { useRef, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const SPEED = 0.4; // px per frame (~24px/s at 60fps)

// Auto-import every client logo from the folder. New logos dropped in there
// appear automatically. Non-client assets (certs, MCL's own marks, product
// shots) are filtered out below.
const logoModules = import.meta.glob('../assets/mcl_client_logos/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  import: 'default',
});

const EXCLUDE = /(cert-|cylinder|industry|lpg-division|manifold-valves|mcl-logo|medical-gas-manifolds|satisfied-clients)/i;

const labelFromPath = (path) =>
  path
    .split('/')
    .pop()
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

const logos = Object.entries(logoModules)
  .filter(([path]) => !EXCLUDE.test(path))
  .map(([path, src]) => ({ src, name: labelFromPath(path) }))
  .sort((a, b) => a.name.localeCompare(b.name));

export default function ClientsMarquee() {
  const scrollRef = useRef(null);
  const pausedRef = useRef(false);

  // Continuous auto-scroll. The list is rendered twice; once we've scrolled
  // past the first copy we subtract its width to loop seamlessly.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf;
    // Track position in a float accumulator. Reading el.scrollLeft back each
    // frame rounds sub-pixel increments to 0, so the marquee never advances.
    let pos = el.scrollLeft;
    let lastSet = pos;
    const step = () => {
      if (!pausedRef.current) {
        // Adopt any manual scroll (arrow buttons, wheel, drag) so the loop
        // continues from there instead of snapping back.
        if (Math.abs(el.scrollLeft - lastSet) > 2) pos = el.scrollLeft;
        const half = el.scrollWidth / 2;
        pos += SPEED;
        if (half > 0 && pos >= half) pos -= half;
        el.scrollLeft = pos;
        lastSet = el.scrollLeft;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Instant jump (no smooth) so the auto-scroll loop doesn't override it
  // mid-animation; the loop resyncs to the new position on the next frame.
  const manualScroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 320 });
  };

  const items = [...logos, ...logos];

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => manualScroll(-1)}
        aria-label="Scroll left"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-2 text-ink-soft transition-[background-color,color,transform] duration-200 ease-out hover:bg-accent hover:text-white active:scale-95"
      >
        <FaChevronLeft size={14} />
      </button>

      <div
        ref={scrollRef}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
        className="flex min-w-0 flex-1 items-center gap-4 overflow-x-auto no-scrollbar"
      >
        {items.map((logo, i) => (
          <div
            key={i}
            className="group flex h-24 w-[200px] flex-shrink-0 items-center justify-center rounded-md border border-line bg-white px-7 transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[var(--shadow-md)]"
          >
            <img
              src={logo.src}
              alt={logo.name}
              loading="lazy"
              className="max-h-14 w-auto max-w-full object-contain opacity-70 grayscale transition-[filter,opacity] duration-200 ease-out group-hover:opacity-100 group-hover:grayscale-0"
            />
          </div>
        ))}
      </div>

      <button
        onClick={() => manualScroll(1)}
        aria-label="Scroll right"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-2 text-ink-soft transition-[background-color,color,transform] duration-200 ease-out hover:bg-accent hover:text-white active:scale-95"
      >
        <FaChevronRight size={14} />
      </button>
    </div>
  );
}
