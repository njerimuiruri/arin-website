
import { fetchWithTimeout } from '../lib/fetchWithTimeout';
const BASE_URL = "https://api.demo.arin-africa.org/api/news-briefs";


export async function getNewsBriefs() {
  try {
    const res = await fetchWithTimeout(BASE_URL, { cache: 'no-store', timeout: 10000 });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Failed to fetch news briefs:', error);
    return [];
  }
}


export async function getNewsBriefById(id) {
  try {
    const res = await fetchWithTimeout(`${BASE_URL}/${id}`, { timeout: 10000 });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Failed to fetch news brief:', error);
    return null;
  }
}
