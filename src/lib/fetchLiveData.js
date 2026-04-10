export async function fetchLiveData(url) {
  const requestUrl = `${url}${url.includes('?') ? '&' : '?'}t=${Date.now()}`;
  const res = await fetch(requestUrl, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Failed to fetch live data: ${res.status}`);
  }
  return await res.json();
}
