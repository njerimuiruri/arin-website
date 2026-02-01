
import { fetchWithTimeout } from '../lib/fetchWithTimeout';
const BASE_URL = "https://api.demo.arin-africa.org/api/books";


export async function getBooks() {
  try {
    const res = await fetchWithTimeout(BASE_URL, { cache: 'no-store', timeout: 10000 });
    if (!res.ok) throw new Error('Failed to fetch books');
    return res.json();
  } catch (error) {
    console.error('Failed to fetch books:', error);
    return [];
  }
}


export async function getBook(id: string) {
  try {
    const res = await fetchWithTimeout(`${BASE_URL}/${id}`, { cache: 'no-store', timeout: 10000 });
    if (!res.ok) throw new Error('Failed to fetch book');
    return res.json();
  } catch (error) {
    console.error('Failed to fetch book:', error);
    return null;
  }
}
