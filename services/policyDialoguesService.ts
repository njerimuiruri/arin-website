import { fetchWithTimeout } from '../lib/fetchWithTimeout';

const API_URL = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api` : 'https://api.demo.arin-africa.org/api';

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
        const res = await fetchWithTimeout(`${API_URL}/policy-dialogue`, {
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
        const res = await fetchWithTimeout(`${API_URL}/policy-dialogue/${id}`, {
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
