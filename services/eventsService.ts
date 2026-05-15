import { fetchWithTimeout } from '../lib/fetchWithTimeout';
import { getApiUrl } from '../lib/apiConfig';

const BASE_URL = getApiUrl('/events');
const shouldLogErrors = process.env.NODE_ENV === 'development';

export interface Event {
    _id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    status: 'Upcoming' | 'Past';
    category: 'Conference' | 'Workshop' | 'Webinar' | 'Dialogue' | 'Friday Reviews';
    image?: string;
    availableResources?: string[];
    createdAt?: string;
    updatedAt?: string;
}

export async function getEvents(): Promise<Event[]> {
    try {
        const res = await fetchWithTimeout(BASE_URL, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            timeout: 10000,
        });
        if (!res.ok) return [];
        return res.json();
    } catch (error) {
        if (shouldLogErrors) {
            console.error('Failed to fetch events:', error);
        }
        return [];
    }
}

export async function getEvent(id: string): Promise<Event | null> {
    try {
        const res = await fetchWithTimeout(`${BASE_URL}/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            timeout: 10000,
        });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        if (shouldLogErrors) {
            console.error('Failed to fetch event:', error);
        }
        return null;
    }
}
