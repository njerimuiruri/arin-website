const API_URL = 'http://localhost:5001/api';

export interface AnnualReport {
    _id: string;
    title: string;
    description: string;
    date: string;
    year: string;
    category?: string;
    image?: string;
    availableResources?: string[];
    createdAt?: string;
    updatedAt?: string;
}

export async function getAnnualReports(): Promise<AnnualReport[]> {
    try {
        const res = await fetch(`${API_URL}/annual-reports`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) return [];
        const data = await res.json();
        // Fix image URLs to include base URL if relative
        return data.map((item: AnnualReport) => ({
            ...item,
            image: item.image && !item.image.startsWith('http') ? `${API_URL}${item.image}` : item.image,
            availableResources: item.availableResources?.map(url => 
                !url.startsWith('http') ? `${API_URL}${url}` : url
            ) || []
        }));
    } catch (error) {
        console.error('Failed to fetch annual reports:', error);
        return [];
    }
}

export async function getAnnualReport(id: string): Promise<AnnualReport | null> {
    try {
        const res = await fetch(`${API_URL}/annual-reports/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) return null;
        const data = await res.json();
        // Fix image URLs to include base URL if relative
        return {
            ...data,
            image: data.image && !data.image.startsWith('http') ? `${API_URL}${data.image}` : data.image,
            availableResources: data.availableResources?.map((url: string) => 
                !url.startsWith('http') ? `${API_URL}${url}` : url
            ) || []
        };
    } catch (error) {
        console.error('Failed to fetch annual report:', error);
        return null;
    }
}

export async function searchAnnualReports(query: string): Promise<AnnualReport[]> {
    try {
        const res = await fetch(`${API_URL}/annual-reports?search=${encodeURIComponent(query)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) return [];
        const data = await res.json();
        // Fix image URLs to include base URL if relative
        return data.map((item: AnnualReport) => ({
            ...item,
            image: item.image && !item.image.startsWith('http') ? `${API_URL}${item.image}` : item.image,
            availableResources: item.availableResources?.map(url => 
                !url.startsWith('http') ? `${API_URL}${url}` : url
            ) || []
        }));
    } catch (error) {
        console.error('Failed to search annual reports:', error);
        return [];
    }
}
