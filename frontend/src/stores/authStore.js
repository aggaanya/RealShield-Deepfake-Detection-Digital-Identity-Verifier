import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/utils/api';
import axios from 'axios';

// Zustand v5 with improved type safety
const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,
      
      // Action to set the authentication in the store
      setAuth: (user, token) => {
        set({ user, token });
        
        // Set token for all axios requests
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          localStorage.setItem('token', token);
        } else {
          delete axios.defaults.headers.common['Authorization'];
          localStorage.removeItem('token');
        }
      },
      
      // Login action
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post(`/api/auth/login`, {
            email,
            password
          });
          
          // Get token from response and fetch user data
          const { token } = response.data;
          
          // Get user details
          const userResponse = await api.get('/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          const user = userResponse.data.data;
          
          set({ user, token, isLoading: false });
          
          // Set token for future axios requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          localStorage.setItem('token', token);
          
          return { success: true };
        } catch (error) {
          set({
            isLoading: false,
            error: error.response?.data?.error || 'Login failed. Please check your credentials.'
          });
          return { success: false, error: get().error };
        }
      },
      
      // Register action
      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post(`/api/auth/register`, userData);
          
          // Get token from response
          const { token } = response.data;
          
          // Get user details
          const userResponse = await api.get('/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          const user = userResponse.data.data;
          
          set({ user, token, isLoading: false });
          
          // Set token for future axios requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          localStorage.setItem('token', token);
          
          return { success: true };
        } catch (error) {
          set({
            isLoading: false,
            error: error.response?.data?.error || 'Registration failed. Please try again.'
          });
          return { success: false, error: get().error };
        }
      },
      
      // Logout action
      logout: () => {
        set({ user: null, token: null });
        delete axios.defaults.headers.common['Authorization'];
        localStorage.removeItem('token');
      },
      
      // Check if user is authenticated on app load
      checkAuth: async () => {
        set({ isLoading: true });
        try {
          // Get token from storage
          const token = localStorage.getItem('token');
          
          if (!token) {
            set({ isLoading: false });
            return false;
          }
          
          // Set default headers
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Verify token by getting current user data
          const response = await api.get(`/api/auth/me`);
          
          set({ user: response.data.data, token, isLoading: false });
          return true;
        } catch (error) {
          // Token validation failed
          set({ user: null, token: null, isLoading: false });
          delete axios.defaults.headers.common['Authorization'];
          localStorage.removeItem('token');
          return false;
        }
      },
      
      // Update user profile
      updateProfile: async (profileData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.put('/api/auth/updatedetails', profileData);
          
          set({ 
            user: { ...get().user, ...response.data.data }, 
            isLoading: false 
          });
          
          return { success: true };
        } catch (error) {
          set({
            isLoading: false,
            error: error.response?.data?.error || 'Failed to update profile. Please try again.'
          });
          return { success: false, error: get().error };
        }
      },
      
      // Change password
      changePassword: async (currentPassword, newPassword) => {
        set({ isLoading: true, error: null });
        try {
          await api.put(
            '/api/auth/updatepassword', 
            { currentPassword, newPassword }
          );
          
          set({ isLoading: false });
          return { success: true };
        } catch (error) {
          set({
            isLoading: false,
            error: error.response?.data?.error || 'Failed to change password. Please try again.'
          });
          return { success: false, error: get().error };
        }
      },
      
      // Reset error state
      clearError: () => set({ error: null })
    }),
    {
      name: 'auth-storage',  // Unique name for localStorage
      partialize: (state) => ({ user: state.user, token: state.token })  // Only persist these fields
    }
  )
);

export default useAuthStore;
