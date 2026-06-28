/**
 * Suspense fallback shown while a lazy-loaded route chunk is fetched
 * (see `App.jsx`'s `React.lazy()` page imports). Deliberately lightweight —
 * unlike `SiteLoader.jsx` (a one-time, session-gated full intro animation),
 * this can mount/unmount on every route navigation, so it has no timers,
 * no session storage, and no exit-animation phase machine. It reuses the
 * same visual language as `SiteLoader` (canvas background, accent fill bar,
 * mono micro-label) rather than introducing a new loading visual language.
 */
export default function RouteLoader() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center bg-canvas py-24">
      <div className="relative h-[2px] w-32 overflow-hidden rounded-full bg-line">
        <span className="absolute inset-y-0 left-0 w-2/5 animate-pulse rounded-full bg-accent" />
      </div>
      <p className="mt-4 font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-muted">
        Loading
      </p>
    </div>
  );
}
