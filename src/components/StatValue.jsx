import useCountUp from '../hooks/useCountUp';

// Matches "35+", "1,000+", "87,000+", "100%" — a clean leading number with a
// non-numeric suffix. Deliberately does NOT match "24/7", "Real-time", or any
// other qualitative label mixed into the same stat arrays — those fall
// through to a plain, non-animated render instead of being mis-parsed.
const COUNTABLE = /^(\d[\d,]*)(\D*)$/;

/**
 * Drop-in replacement for rendering a stat's raw string value — animates a
 * count-up for values that are actually numeric, and renders everything
 * else (compliance badges, "24/7", "Real-time", etc.) unchanged. Reuses the
 * same `useCountUp` easing/reduced-motion behavior already proven in
 * `StatsRow.jsx`, just applied to sections that previously had no count-up
 * at all.
 */
export default function StatValue({ value, active, className }) {
  const match = typeof value === 'string' ? value.match(COUNTABLE) : null;
  const numeric = match ? parseInt(match[1].replace(/,/g, ''), 10) : 0;
  const suffix = match ? match[2] : '';
  const display = useCountUp(numeric, Boolean(active && match));

  if (!match) return <span className={className}>{value}</span>;
  return <span className={className}>{display.toLocaleString()}{suffix}</span>;
}
