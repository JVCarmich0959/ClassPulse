import { useEffect, useState } from 'react';
import { USE_LIVE_DATA, LIVE_DATA_URL } from '../config';
import { staticData } from '../data/staticData';
import { fetchLiveData } from '../lib/fetchLiveData';
import { normalizeRows } from '../lib/normalizeRows';
import { buildDashboardData } from '../lib/buildDashboardData';

export function useDashboardData() {
  const [data, setData] = useState(staticData);
  const [loading, setLoading] = useState(USE_LIVE_DATA);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    if (!USE_LIVE_DATA) {
      setData(staticData);
      setLoading(false);
      return () => {
        mounted = false;
      };
    }

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const payload = await fetchLiveData(LIVE_DATA_URL);
        const rows = normalizeRows(payload?.rows ?? []);
        const built = buildDashboardData(rows);
        if (mounted) setData(built);
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Unable to load live data.');
          setData(staticData);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading, error };
}
