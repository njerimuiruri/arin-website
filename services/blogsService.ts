import { fetchWithTimeout } from '../lib/fetchWithTimeout';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.demo.arin-africa.org";
const BASE_URL = `${API_BASE_URL}/api/blogs`;

export interface Blog {
  _id?: string;
  title: string;
  description: string;
  image?: string;
  category: string;
  date: string;
  projectTeam: string[];
  createdAt?: string;
  updatedAt?: string;
}

export const blogsService = {
  async getAll(): Promise<Blog[]> {
    const response = await fetchWithTimeout(`${BASE_URL}`, { timeout: 10000 });
    if (!response.ok) throw new Error('Failed to fetch blogs');
    return response.json();
  },

  async getById(id: string): Promise<Blog> {
    const response = await fetchWithTimeout(`${BASE_URL}/${id}`, { timeout: 10000 });
    if (!response.ok) throw new Error('Blog not found');
    return response.json();
  },
};

export async function getBlogs(): Promise<Blog[]> {
  try {
    const res = await fetchWithTimeout(BASE_URL, { cache: 'no-store', timeout: 10000 });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export async function getBlogById(id: string): Promise<Blog | null> {
  try {
    const res = await fetchWithTimeout(`${BASE_URL}/${id}`, { cache: 'no-store', timeout: 10000 });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}
