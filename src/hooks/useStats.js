import { useState, useEffect } from 'react';
import { fetchStats, statsToMap } from '../services/api';

let cachedPromise = null;

function loadStats() {
  if (!cachedPromise) {
    cachedPromise = fetchStats().catch(err => {
      cachedPromise = null;
      throw err;
    });
  }
  return cachedPromise;
}

export default function useStats() {
  const [statsMap, setStatsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    loadStats()
      .then(data => { if (mounted) setStatsMap(statsToMap(data)); })
      .catch(err => { if (mounted) setError(err); })
      .finally(() => { if (mounted) setLoading(false); });

    return () => { mounted = false; };
  }, []);

  return { statsMap, loading, error };
}
