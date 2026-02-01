import { fetchWithTimeout } from '../lib/fetchWithTimeout';
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://api.demo.arin-africa.org') + '/api';

export interface TechnicalReport {
  _id?: string;
  title: string;
  authors?: string[];
  description: string;
  image?: string;
  datePosted?: string;
  availableResources?: string[];
  year?: number;
}

export const technicalReportsService = {
  async getAll(): Promise<TechnicalReport[]> {
    const response = await fetchWithTimeout(`${API_BASE_URL}/technical-reports`, { timeout: 10000 });
    if (!response.ok) throw new Error('Failed to fetch technical reports');
    return response.json();
  },

  async getById(id: string): Promise<TechnicalReport> {
    const response = await fetchWithTimeout(`${API_BASE_URL}/technical-reports/${id}`, { timeout: 10000 });
    if (!response.ok) throw new Error('Technical report not found');
    return response.json();
  },
  
  async getTechnicalReports() {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/technical-reports`, { cache: 'no-store', timeout: 10000 });
      if (!res.ok) throw new Error('Failed to fetch technical reports');
      return res.json();
    } catch (error) {
      console.error('Failed to fetch technical reports:', error);
      return [];
    }
  },

  async getTechnicalReport(id: string) {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/technical-reports/${id}`, { cache: 'no-store', timeout: 10000 });
      if (!res.ok) throw new Error('Failed to fetch technical report');
      return res.json();
    } catch (error) {
      console.error('Failed to fetch technical report:', error);
      return null;
    }
  }
};
