// utils/api.ts
export const callApi = async <T>(
    url: string,
    method: string,
    data?: Record<string, any>
  ): Promise<T | null> => {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
      });
  
      if (!response.ok) {
        throw new Error(`API request to ${url} failed`);
      }
  
      return response.json();
    } catch (error) {
      console.error('Error making API request:', error);
      return null;
    }
  };
  