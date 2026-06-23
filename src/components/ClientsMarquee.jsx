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
        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-mclRed hover:text-white hover:scale-105 active:scale-95 shrink-0 transition-all focus:outline-none focus:ring-2 focus:ring-mclRed"
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
            className="group bg-white border border-gray-100 rounded-lg h-20 w-[210px] flex-shrink-0 px-5 flex items-center justify-center grayscale hover:grayscale-0 hover:shadow-md hover:border-mclRed/40 hover:-translate-y-0.5 transition-all cursor-default"
          >
            <span className="text-center text-xs font-bold text-gray-500 group-hover:text-mclRed tracking-wide uppercase leading-tight line-clamp-3 transition-colors">
              {name}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={() => manualScroll(1)}
        aria-label="Scroll right"
        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-mclRed hover:text-white hover:scale-105 active:scale-95 shrink-0 transition-all focus:outline-none focus:ring-2 focus:ring-mclRed"
      >
        <FaChevronRight size={14} />
      </button>
    </div>
  );
}
