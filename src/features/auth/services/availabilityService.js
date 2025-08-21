import axios from 'axios';
import { API_URL } from '../../../shared/api';

export const createAvailability = async (data, token) => {
  const response = await axios.post(`${API_URL}/availability`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Tenant-ID': data.tenantKey,
      },
    });
  return response.data;
};

export const getAvailabilities = async (tenantKey, token) => {
  const response = await axios.get(`${API_URL}/availability`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Tenant-ID': tenantKey,
      },
    });
  return response.data;
};
