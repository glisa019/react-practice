import axios from 'axios';
import { API_URL } from '../../../shared/api';

export const getUser = async (profileId, tenantKey, token, role) => {
  const url = (role === 'TENANT_ADMIN' || role === 'ADMIN') ? 
  `${API_URL}/admins/${profileId}` : 
  `${API_URL}/user/${profileId}`;

  const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Tenant-ID': tenantKey,
        "ngrok-skip-browser-warning": "69420",
      },
    });
  return response.data;
};

export const updateUser = async (id, data, token, tenantKey, role) => {
  const url = (role === 'TENANT_ADMIN' || role === 'ADMIN') ? 
  `${API_URL}/admins/${id}` : 
  `${API_URL}/user/${id}`;
  
  const response = await axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Tenant-ID': tenantKey,
        "ngrok-skip-browser-warning": "69420",
      },
    });
  return response.data;
};

export const resetPassword = async (data, token, tenantKey, role) => {
  const url = (role === 'TENANT_ADMIN' || role === 'ADMIN') ? 
  `${API_URL}/auth/admin/reset-password` : 
  `${API_URL}/auth/reset-password`;

  const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Tenant-ID': tenantKey,
        "ngrok-skip-browser-warning": "69420",
      },
    });
  return response.data;
};
