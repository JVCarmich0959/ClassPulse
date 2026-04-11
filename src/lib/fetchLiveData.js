export async function fetchLiveData(url) {
  if (!url) throw new Error('LIVE_DATA_URL is not configured.');
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Live data request failed (${res.status}).`);
  return res.json();
}
