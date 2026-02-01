
import { fetchWithTimeout } from '../lib/fetchWithTimeout';
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://api.demo.arin-africa.org') + '/api';

export interface WorkingPaperSeries {
  _id?: string;
  title: string;
  description: string;
  image?: string;
  authors?: string[];
  datePosted?: string;
  availableResources?: string[];
  year?: number;
}

export const workingPaperSeriesService = {
  async getAll(): Promise<WorkingPaperSeries[]> {
    const response = await fetchWithTimeout(`${API_BASE_URL}/working-paper-series`, { timeout: 10000 });
    if (!response.ok) throw new Error('Failed to fetch working paper series');
    return response.json();
  },

  async getById(id: string): Promise<WorkingPaperSeries> {
    const response = await fetchWithTimeout(`${API_BASE_URL}/working-paper-series/${id}`, { timeout: 10000 });
    if (!response.ok) throw new Error('Working paper series not found');
    return response.json();
  },
};
