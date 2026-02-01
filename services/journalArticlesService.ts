
import { fetchWithTimeout } from '../lib/fetchWithTimeout';
const BASE_URL = "https://api.demo.arin-africa.org/api/journal-articles";


export async function getJournalArticles() {
  try {
    const res = await fetchWithTimeout(BASE_URL, { cache: 'no-store', timeout: 10000 });
    if (!res.ok) throw new Error('Failed to fetch journal articles');
    return res.json();
  } catch (error) {
    console.error('Failed to fetch journal articles:', error);
    return [];
  }
}


export async function getJournalArticle(id: string) {
  try {
    const res = await fetchWithTimeout(`${BASE_URL}/${id}`, { cache: 'no-store', timeout: 10000 });
    if (!res.ok) throw new Error('Failed to fetch journal article');
    return res.json();
  } catch (error) {
    console.error('Failed to fetch journal article:', error);
    return null;
  }
}
