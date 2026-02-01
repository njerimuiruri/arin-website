
import { fetchWithTimeout } from '../lib/fetchWithTimeout';
const BASE_URL = "https://api.demo.arin-africa.org/api/capacity-building";


export async function getCapacityProjects() {
  try {
    const res = await fetchWithTimeout(BASE_URL, { cache: 'no-store', timeout: 10000 });
    if (!res.ok) throw new Error('Failed to fetch capacity building projects');
    return res.json();
  } catch (error) {
    console.error('Failed to fetch capacity building projects:', error);
    return [];
  }
}


export async function getCapacityProject(id: string) {
  try {
    const res = await fetchWithTimeout(`${BASE_URL}/${id}`, { cache: 'no-store', timeout: 10000 });
    if (!res.ok) throw new Error('Failed to fetch capacity building project');
    return res.json();
  } catch (error) {
    console.error('Failed to fetch capacity building project:', error);
    return null;
  }
}
