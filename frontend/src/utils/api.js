import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 (Unauthorized) errors by logging out
    if (error.response && error.response.status === 401) {
      // Import dynamically to avoid circular dependency
      import('../stores/authStore').then(module => {
        const authStore = module.default;
        // Only logout if we're authenticated and trying to access a protected resource
        if (authStore.getState().token) {
          authStore.getState().logout();
          window.location.href = '/login';
        }
      }).catch(err => console.error('Failed to import auth store:', err));
    }
    
    // Pass through the error
    return Promise.reject(error);
  }
);

export default api;
