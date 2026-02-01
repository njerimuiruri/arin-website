import { fetchWithTimeout } from '../lib/fetchWithTimeout';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.demo.arin-africa.org';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export const contactService = {
  async submitContact(data: ContactFormData): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetchWithTimeout(`${API_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        timeout: 10000,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to submit contact form');
      }

      const result = await response.json();

      return {
        success: true,
        message: 'Message sent successfully!',
      };
    } catch (error) {
      console.error('Error submitting contact form:', error);
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'There was an error submitting your message. Please try again.';
      
      return {
        success: false,
        message: errorMessage,
      };
    }
  },
};
