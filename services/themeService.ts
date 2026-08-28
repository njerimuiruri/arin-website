import { fetchWithTimeout } from '../lib/fetchWithTimeout';
import { getApiUrl } from '../lib/apiConfig';

const BASE_URL = getApiUrl('/themes');

export async function getThemesByProject(researchProjectId: string) {
  const res = await fetchWithTimeout(`${BASE_URL}?researchProject=${researchProjectId}`, { cache: 'no-store', timeout: 10000 });
  if (!res.ok) throw new Error('Failed to fetch themes');
  return res.json();
}

export async function getTheme(id: string) {
  const res = await fetchWithTimeout(`${BASE_URL}/${id}`, { cache: 'no-store', timeout: 10000 });
  if (!res.ok) throw new Error('Failed to fetch theme');
  return res.json();
}
