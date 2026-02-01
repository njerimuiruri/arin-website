
import { fetchWithTimeout } from '../lib/fetchWithTimeout';
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.demo.arin-africa.org/api/call-for-books";


export async function getAllCalls() {
    try {
        const res = await fetchWithTimeout(API_URL, { timeout: 10000 });
        if (!res.ok) throw new Error("Failed to fetch calls");
        return res.json();
    } catch (error) {
        console.error('Failed to fetch calls:', error);
        return [];
    }
}


export async function getCallById(id) {
    try {
        const res = await fetchWithTimeout(`${API_URL}/${id}`, { timeout: 10000 });
        if (!res.ok) throw new Error("Failed to fetch call");
        return res.json();
    } catch (error) {
        console.error('Failed to fetch call:', error);
        return null;
    }
}
