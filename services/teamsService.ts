const BASE_URL = "https://api.demo.arin-africa.org/api/teams";

import { fetchWithTimeout } from '../lib/fetchWithTimeout';

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
