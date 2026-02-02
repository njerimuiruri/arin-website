export async function fetchWithTimeout(resource: RequestInfo, options: any = {}) {
  const { timeout = 10000 } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(resource, { ...options, signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (e) {
    clearTimeout(id);
    const error = e instanceof Error ? e : new Error('Unknown error occurred');
    
    // Provide more detailed error information
    if (error.name === 'AbortError') {
      throw new Error(`Request timeout after ${timeout}ms to ${resource}`);
    }
    
    // Only log errors in development mode
    if (process.env.NODE_ENV === 'development') {
      console.error(`Fetch error for ${resource}:`, error.message);
    }
    throw error;
  }
}
