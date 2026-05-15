import { fetchWithTimeout } from '../lib/fetchWithTimeout';
import { getApiUrl } from '../lib/apiConfig';

const BASE_URL = getApiUrl('/research-projects');

export async function getResearchProjects() {
  const res = await fetchWithTimeout(BASE_URL, { cache: 'no-store', timeout: 10000 });
  if (!res.ok) throw new Error('Failed to fetch research projects');
  return res.json();
}

export async function getResearchProject(id: string) {
  const res = await fetchWithTimeout(`${BASE_URL}/${id}`, { cache: 'no-store', timeout: 10000 });
  if (!res.ok) throw new Error('Failed to fetch research project');
  return res.json();
}
