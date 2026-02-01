
import { fetchWithTimeout } from '../lib/fetchWithTimeout';
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api/impact-stories` : "https://api.demo.arin-africa.org/api/impact-stories";


export async function getImpactStories() {
  try {
    const res = await fetchWithTimeout(BASE_URL, { credentials: 'include', timeout: 10000 });
    if (!res.ok) throw new Error('Failed to fetch impact stories');
    return res.json();
  } catch (error) {
    console.error('Failed to fetch impact stories:', error);
    return [];
  }
}


export async function getImpactStory(id: string) {
  try {
    const res = await fetchWithTimeout(`${BASE_URL}/${id}`, { credentials: 'include', timeout: 10000 });
    if (!res.ok) throw new Error('Failed to fetch impact story');
    return res.json();
  } catch (error) {
    console.error('Failed to fetch impact story:', error);
    return null;
  }
}
