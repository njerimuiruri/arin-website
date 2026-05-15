import { fetchWithTimeout } from '../lib/fetchWithTimeout';
import { getApiUrl } from '../lib/apiConfig';

const BASE_URL = getApiUrl('/working-paper-series');

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
    const response = await fetchWithTimeout(BASE_URL, { timeout: 10000 });
    if (!response.ok) throw new Error('Failed to fetch working paper series');
    return response.json();
  },

  async getById(id: string): Promise<WorkingPaperSeries> {
    const response = await fetchWithTimeout(`${BASE_URL}/${id}`, { timeout: 10000 });
    if (!response.ok) throw new Error('Working paper series not found');
    return response.json();
  },
};
