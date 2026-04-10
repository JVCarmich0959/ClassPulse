import { useEffect, useState } from 'react';
import { LIVE_DATA_URL, USE_LIVE_DATA } from '../config';
import { staticDashboardData } from '../data/staticData';
import { buildDashboardData } from '../lib/buildDashboardData';
import { fetchLiveData } from '../lib/fetchLiveData';
import { normalizeIncidentRow } from '../lib/normalizeRows';

function extractRows(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.rows)) return payload.rows;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

export function useDashboardData() {
  const [data, setData] = useState(USE_LIVE_DATA ? null : staticDashboardData);
  const [loading, setLoading] = useState(USE_LIVE_DATA);
  const [error, setError] = useState('');

  useEffect(() => {
    let canceled = false;

    async function load() {
      if (!USE_LIVE_DATA) {
        setData(staticDashboardData);
        setLoading(false);
        setError('');
        return;
      }

      if (!LIVE_DATA_URL) {
        setError('Live data is enabled but LIVE_DATA_URL is empty in src/config.js.');
        setData(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');

      try {
        const payload = await fetchLiveData(LIVE_DATA_URL);
        const rows = extractRows(payload);
        const normalizedRows = rows.map(normalizeIncidentRow);
        const dashboardData = buildDashboardData(normalizedRows);

        if (!canceled) {
          setData(dashboardData);
          setLoading(false);
        }
      } catch (err) {
        if (!canceled) {
          setData(null);
          setError(err instanceof Error ? err.message : 'Unable to load dashboard data.');
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      canceled = true;
    };
  }, []);

  return { data, loading, error };
}
