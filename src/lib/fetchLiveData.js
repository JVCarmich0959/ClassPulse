export async function fetchLiveData(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch live data: ${res.status}`);
  }
  return await res.json();
}
