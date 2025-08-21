import axios from 'axios';
import { API_URL } from '../../../shared/api';

export const createTenant = async (tenantData, newToken) => {
  const formData = new FormData();

  Object.entries(tenantData).forEach(([key, value]) => {
    if (value instanceof File || typeof value === 'string') {
      formData.append(key, value);
    } else if (typeof value === 'object' && value !== null) {
      formData.append(key, JSON.stringify(value));
    }
  });
  

  const response = await axios.post(`${API_URL}/tenants`, formData, {
    headers: {
      'Authorization': `Bearer ${newToken}`,
      'Content-Type': 'multipart/form-data',
    },

  });
  return response.data;
};

export const getTenants = async (token) => {
    const response = await axios.get(`${API_URL}/tenants`,{
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  return response.data;
};

export const getTenantByKey = async (tenantKey, token) => {
  const response = await axios.get(`${API_URL}/tenants/key/${tenantKey}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  return response.data;
};

export const activateTenant = async (tenantKey, token) => {
  const response = await axios.post(`${API_URL}/tenants/activate`, null, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'X-Tenant-ID': tenantKey,
    },
  });
  return response.data;
};

export const getTenantMe = async (token) => {
    const response = await axios.get(`${API_URL}/tenants/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  return response.data;
};

export const updateTenant = async (tenantData, tenantKey, token) => {
  
  const formData = new FormData();

  Object.entries(tenantData).forEach(([key, value]) => {
    if (value instanceof File || typeof value === 'string') {
      formData.append(key, value);
    } else if (typeof value === 'object' && value !== null) {
      formData.append(key, JSON.stringify(value));
    }
  });

  const response = await axios.put(`${API_URL}/tenants/me`, formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
      'X-Tenant-ID': tenantKey
    },
  });
  return response.data;
};
