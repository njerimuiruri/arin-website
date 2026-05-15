import { fetchWithTimeout } from '../lib/fetchWithTimeout';
import { getApiUrl } from '../lib/apiConfig';

const BASE_URL = getApiUrl('/books');


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
