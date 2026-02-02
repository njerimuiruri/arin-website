// Centralized API configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.demo.arin-africa.org',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 2,
};

export const getApiUrl = (endpoint: string) => {
  return `${API_CONFIG.BASE_URL}/api${endpoint}`;
};

// Check if we're in development mode
export const isDevelopment = process.env.NODE_ENV === 'development';

// Check if backend is available (used for fallback logic)
export const isBackendAvailable = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(3000),
    });
    return response.ok;
  } catch {
    return false;
  }
};
