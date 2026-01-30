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
    const response = await fetch(`${API_BASE_URL}/technical-reports`);
    if (!response.ok) throw new Error('Failed to fetch technical reports');
    return response.json();
  },

  async getById(id: string): Promise<TechnicalReport> {
    const response = await fetch(`${API_BASE_URL}/technical-reports/${id}`);
    if (!response.ok) throw new Error('Technical report not found');
    return response.json();
  },
};
