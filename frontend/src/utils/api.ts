export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('access_token');
  
  const headers = new Headers(options.headers);
  
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response;
};