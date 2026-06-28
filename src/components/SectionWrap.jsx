import useInView from '../hooks/useInView';

// Tailwind's JIT scanner needs literal class strings, not runtime-interpolated
// ones (e.g. `duration-${n}` is invisible to the scanner and would silently
// fail to generate the utility) — so every duration/translate combination
// actually used by the 9 call sites is enumerated here as a literal string
// rather than built dynamically.
const DURATIONS = {
  500: 'duration-500',
  700: 'duration-700',
};

const TRANSLATES = {
  'translate-y-4': { hidden: 'translate-y-4', shown: 'translate-y-0' },
  'translate-y-8': { hidden: 'translate-y-8', shown: 'translate-y-0' },
};

/**
 * Scroll-reveal wrapper shared by every long-scroll inner page
 * (`Infrastructure`, `Gases`, `QualitySafety`, `Certifications`, `Production`,
 * `ModularOT`, `ClinicalSystems`, `HealthEngineering`, `Team`). Was previously
 * reimplemented independently in all 9 files with only minor variation; this
 * is the single consolidated version, with the variation preserved via props
 * rather than dropped.
 *
 * Transitions only `opacity`/`transform` (not `transition-all`, which used to
 * animate every animatable property including ones that never change) using
 * the project's bespoke `--ease-out` token rather than Tailwind's bare
 * `ease-out` utility (a milder, different curve) — see the Phase 1 Animation
 * & 3D audit's easing-consistency finding. Previously 7 of the 9 original
 * call sites used bare `transition-all` with no explicit easing class at
 * all; this consolidation intentionally drops that tier rather than
 * preserving it, since the split was incidental code drift across
 * originally-separate files, not a deliberate design choice.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.className='']
 * @param {string} [props.id] - optional element id, used by `Gases.jsx` for
 *   its in-page category anchor/scroll-to-section navigation.
 * @param {500|700} [props.duration=700] - reveal transition duration in ms.
 *   `Team.jsx`'s leadership/org-chart section deliberately uses 500ms
 *   (a tighter reveal for a denser stat grid); every other caller uses the
 *   700ms default.
 * @param {'translate-y-4'|'translate-y-8'} [props.translateClass='translate-y-8']
 *   the Tailwind translate utility applied pre-reveal (and removed once in
 *   view). `Team.jsx` uses the smaller `translate-y-4`; everyone else uses
 *   `translate-y-8`.
 */
export default function SectionWrap({
  children,
  className = '',
  id,
  duration = 700,
  translateClass = 'translate-y-8',
}) {
  const [ref, inView] = useInView();

  const durationClass = DURATIONS[duration] ?? DURATIONS[700];
  const translate = TRANSLATES[translateClass] ?? TRANSLATES['translate-y-8'];

  const revealClass = inView
    ? `opacity-100 ${translate.shown}`
    : `opacity-0 ${translate.hidden}`;

  return (
    <section
      id={id}
      ref={ref}
      className={`transition-[opacity,transform] ease-[var(--ease-out)] ${durationClass} ${revealClass} ${className}`}
    >
      {children}
    </section>
  );
}
