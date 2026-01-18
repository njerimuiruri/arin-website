const API_URL = 'http://localhost:5001';

export interface PolicyDialogue {
    _id: string;
    title: string;
    description: string;
    date: string;
    status: 'Ongoing' | 'Completed' | 'Incomplete';
    image?: string;
    availableResources?: string[];
    createdAt?: string;
    updatedAt?: string;
}

export async function getPolicyDialogues(): Promise<PolicyDialogue[]> {
    try {
        const res = await fetch(`${API_URL}/policy-dialogue`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
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
        const res = await fetch(`${API_URL}/policy-dialogue/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error('Failed to fetch policy dialogue:', error);
        return null;
    }
}
