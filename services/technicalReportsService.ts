import { fetchWithTimeout } from '../lib/fetchWithTimeout';
import { getApiUrl } from '../lib/apiConfig';

const BASE_URL = getApiUrl('/technical-reports');

export interface TechnicalReport {
  _id?: string;
  title: string;
  authors?: string[];
  description: string;
  image?: string;
  datePosted?: string;
  availableResources?: string[];
  year?: number;
  category?: string;
}

export const technicalReportsService = {
  async getAll(): Promise<TechnicalReport[]> {
    const response = await fetchWithTimeout(BASE_URL, { timeout: 10000 });
    if (!response.ok) throw new Error('Failed to fetch technical reports');
    return response.json();
  },

  async getById(id: string): Promise<TechnicalReport> {
    const response = await fetchWithTimeout(`${BASE_URL}/${id}`, {
      cache: 'no-store',
      timeout: 10000,
    });
    if (!response.ok) throw new Error('Technical report not found');
    return response.json();
  },
  
  async getTechnicalReports() {
    try {
      const res = await fetchWithTimeout(BASE_URL, { cache: 'no-store', timeout: 10000 });
      if (!res.ok) throw new Error('Failed to fetch technical reports');
      return res.json();
    } catch (error) {
      console.error('Failed to fetch technical reports:', error);
      return [];
    }
  },

  async getTechnicalReport(id: string) {
    try {
      const res = await fetchWithTimeout(`${BASE_URL}/${id}`, { cache: 'no-store', timeout: 10000 });
      if (!res.ok) throw new Error('Failed to fetch technical report');
      return res.json();
    } catch (error) {
      console.error('Failed to fetch technical report:', error);
      return null;
    }
  }
};
