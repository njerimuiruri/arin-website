import { fetchWithTimeout } from '../lib/fetchWithTimeout';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.demo.arin-africa.org";
const BASE_URL = `${API_BASE_URL}/api/policy-briefs`;

export interface PolicyBrief {
  _id?: string;
  title: string;
  description: string;
  image?: string;
  datePosted?: string;
  availableResources?: string[];
  year?: number;
}

export const policyBriefsService = {
  async uploadImage(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetchWithTimeout(`${BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
      timeout: 10000,
    });
    if (!response.ok) throw new Error('Failed to upload image');
    return response.json();
  },

  async uploadResource(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('resource', file);
    const response = await fetchWithTimeout(`${BASE_URL}/upload-resource`, {
      method: 'POST',
      body: formData,
      timeout: 10000,
    });
    if (!response.ok) throw new Error('Failed to upload resource');
    return response.json();
  },

  async create(data: PolicyBrief): Promise<PolicyBrief> {
    const response = await fetchWithTimeout(`${BASE_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      timeout: 10000,
    });
    if (!response.ok) throw new Error('Failed to create policy brief');
    return response.json();
  },

  async getAll(): Promise<PolicyBrief[]> {
    const response = await fetchWithTimeout(`${BASE_URL}`, { timeout: 10000 });
    if (!response.ok) throw new Error('Failed to fetch policy briefs');
    return response.json();
  },

  async getById(id: string): Promise<PolicyBrief> {
    const response = await fetchWithTimeout(`${BASE_URL}/${id}`, { timeout: 10000 });
    if (!response.ok) throw new Error('Policy brief not found');
    return response.json();
  },

  async update(id: string, data: PolicyBrief): Promise<PolicyBrief> {
    const response = await fetchWithTimeout(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      timeout: 10000,
    });
    if (!response.ok) throw new Error('Failed to update policy brief');
    return response.json();
  },

  async delete(id: string): Promise<{ message: string }> {
    const response = await fetchWithTimeout(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      timeout: 10000,
    });
    if (!response.ok) throw new Error('Failed to delete policy brief');
    return response.json();
  },
};