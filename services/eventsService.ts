const API_URL = 'http://localhost:5001/api';

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
        const res = await fetch(`${API_URL}/events`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) return [];
        return res.json();
    } catch (error) {
        console.error('Failed to fetch events:', error);
        return [];
    }
}

export async function getEvent(id: string): Promise<Event | null> {
    try {
        const res = await fetch(`${API_URL}/events/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error('Failed to fetch event:', error);
        return null;
    }
}
