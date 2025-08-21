// src/features/auth/services/authService.js
import axios from 'axios';
import { API_URL } from '../../../shared/api';

export const login = async (credentials) => {
  console.log(credentials);
    const response = await axios.post(`${API_URL}/auth/login`, credentials, {
      headers: {
        'X-Tenant-ID': credentials.tenantKey,
      },
    });
  return response.data;
};

export const register = async (userData) => {
    const response = await axios.post(`${API_URL}/admins/tenant`, userData, {
      headers: {
        'X-Tenant-ID': userData.tenantKey,
      },
    });
  return response.data;
};

export const registerConsumer = async (userData) => {
    const response = await axios.post(`${API_URL}/user`, userData, {
      headers: {
        'X-Tenant-ID': userData.tenantKey,
      },
    });
  return response.data;
};
export const resetPassword = async (data, tenantKey) => {
    const response = await axios.post(`${API_URL}/auth/reset-password`, data, {
      headers: {
        'X-Tenant-ID': tenantKey,
      },
    });
  return response.data;
};