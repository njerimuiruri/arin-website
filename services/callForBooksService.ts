import { fetchWithTimeout } from '../lib/fetchWithTimeout';
import { getApiUrl } from '../lib/apiConfig';

const BASE = getApiUrl('/call-for-books');


export async function getAllCalls() {
    try {
        const res = await fetchWithTimeout(BASE, { timeout: 10000 });
        if (!res.ok) throw new Error("Failed to fetch calls");
        return res.json();
    } catch (error) {
        console.error('Failed to fetch calls:', error);
        return [];
    }
}


export async function getCallById(id: string) {
    try {
        const res = await fetchWithTimeout(`${BASE}/${id}`, { timeout: 10000 });
        if (!res.ok) throw new Error("Failed to fetch call");
        return res.json();
    } catch (error) {
        console.error('Failed to fetch call:', error);
        return null;
    }
}
