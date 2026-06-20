import { useState, useEffect } from 'react';
import { fetchContentBySection, contentToMap } from '../services/api';

export default function useContent(section) {
  const [contentMap, setContentMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    fetchContentBySection(section)
      .then(data => { if (mounted) setContentMap(contentToMap(data)); })
      .catch(err => { if (mounted) setError(err); })
      .finally(() => { if (mounted) setLoading(false); });

    return () => { mounted = false; };
  }, [section]);

  return { contentMap, loading, error };
}
