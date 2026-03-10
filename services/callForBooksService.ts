
import { fetchWithTimeout } from '../lib/fetchWithTimeout';

const BASE = process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/call-for-books`
    : "https://api.demo.arin-africa.org/api/call-for-books";


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
