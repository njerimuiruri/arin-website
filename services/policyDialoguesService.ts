import { fetchWithTimeout } from '../lib/fetchWithTimeout';
import { getApiUrl } from '../lib/apiConfig';

const BASE_URL = getApiUrl('/policy-dialogue');

export interface PolicyDialogue {
    _id: string;
    title: string;
    description: string;
    excerpt?: string; // Added excerpt property
    date: string;
    status: 'Ongoing' | 'Completed' | 'Incomplete';
    image?: string;
    availableResources?: string[];
    createdAt?: string;
    updatedAt?: string;
}

export async function getPolicyDialogues(): Promise<PolicyDialogue[]> {
    try {
        const res = await fetchWithTimeout(BASE_URL, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            timeout: 10000,
        });
        if (!res.ok) return [];
        return res.json();
    } catch (error) {
        console.error('Failed to fetch policy dialogues:', error);
        return [];
    }
}

export async function getPolicyDialogue(id: string): Promise<PolicyDialogue | null> {
    try {
        const res = await fetchWithTimeout(`${BASE_URL}/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            timeout: 10000,
        });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error('Failed to fetch policy dialogue:', error);
        return null;
    }
}
