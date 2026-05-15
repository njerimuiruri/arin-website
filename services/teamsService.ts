import { fetchWithTimeout } from '../lib/fetchWithTimeout';
import { getApiUrl } from '../lib/apiConfig';

const BASE_URL = getApiUrl('/teams');

export async function getTeamMembers() {
  try {
    const res = await fetchWithTimeout(BASE_URL, { cache: 'no-store', timeout: 10000 });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Failed to fetch team members:', error);
    return [];
  }
}
