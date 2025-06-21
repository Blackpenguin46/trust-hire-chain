
// REST API utility for direct HTTP requests to Back4App
const API_BASE_URL = 'https://parseapi.back4app.com';
const APP_ID = import.meta.env.VITE_BACK4APP_APP_ID || '2IRWN8rmJxc43OSfiWKRKQYmnIyFwRPHycYqtLlW';
const REST_API_KEY = import.meta.env.VITE_BACK4APP_REST_API_KEY || 'YOUR_REST_API_KEY_HERE';

const headers = {
  'X-Parse-Application-Id': APP_ID,
  'X-Parse-REST-API-Key': REST_API_KEY,
  'Content-Type': 'application/json'
};

console.log('REST API configured with:', {
  appId: APP_ID.substring(0, 8) + '...',
  restApiKey: REST_API_KEY.substring(0, 8) + '...',
  baseUrl: API_BASE_URL
});

export const restApi = {
  // Create Object
  async create(className: string, data: any) {
    const response = await fetch(`${API_BASE_URL}/classes/${className}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });
    return response.json();
  },

  // Read (Query) Objects
  async query(className: string, params?: Record<string, any>) {
    const url = new URL(`${API_BASE_URL}/classes/${className}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers
    });
    return response.json();
  },

  // Update Object
  async update(className: string, objectId: string, data: any) {
    const response = await fetch(`${API_BASE_URL}/classes/${className}/${objectId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data)
    });
    return response.json();
  },

  // Delete Object
  async delete(className: string, objectId: string) {
    const response = await fetch(`${API_BASE_URL}/classes/${className}/${objectId}`, {
      method: 'DELETE',
      headers
    });
    return response.json();
  }
};
