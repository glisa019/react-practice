import axios from 'axios';
import { API_URL } from '../../../shared/api';

export const getServices = async (tenantKey, token) => {
  const response = await axios.get(`${API_URL}/manage/services`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-Tenant-ID': tenantKey,
      },
    });
  return response.data;
};

export const createService = async (tenantKey, serviceData, token) => {
  const response = await axios.post(
    `${API_URL}/manage/services`,
    serviceData,
    {
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Tenant-ID': tenantKey,
          'Content-Type': 'application/json',
        },
      }
    );
  return response.data;
};

export const deleteService = async (tenantKey, id, token) => {
  const response = await axios.delete(`${API_URL}/manage/services/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-Tenant-ID': tenantKey,
      },
    });
  return response.data;
};

export const getService = async (tenantKey, id, token) => {
  const response = await axios.get(`${API_URL}/manage/services/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-Tenant-ID': tenantKey,
      },
    });
  return response.data;
};
