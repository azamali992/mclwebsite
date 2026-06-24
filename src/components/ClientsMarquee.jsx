import { useRef, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { clients } from '../data/clients';

const SPEED = 0.4; // px per frame (~24px/s at 60fps)

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
    const step = () => {
      if (!pausedRef.current) {
        el.scrollLeft += SPEED;
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const manualScroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  const items = [...clients, ...clients];

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
        className="flex flex-1 items-center gap-4 overflow-x-auto no-scrollbar"
      >
        {items.map((name, i) => (
          <div
            key={i}
            className="group flex h-20 w-[210px] flex-shrink-0 cursor-default items-center justify-center rounded-md border border-line bg-canvas px-5 transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[var(--shadow-md)]"
          >
            <span className="line-clamp-3 text-center text-xs font-semibold uppercase leading-tight tracking-wide text-muted transition-colors duration-200 group-hover:text-ink">
              {name}
            </span>
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
