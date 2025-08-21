import axios from 'axios';
import { API_URL } from '../../../shared/api';

export const getEmployees = async (tenantKey, token) => {
  const response = await axios.get(`${API_URL}/employee`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-Tenant-ID': tenantKey,
      },
    });
  return response.data;
};

export const createEmployee = async (employeeData, tenantKey, token) => {
  const response = await axios.post(`${API_URL}/employee`, employeeData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-Tenant-ID': tenantKey,
      },
    });
  return response.data;
};

export const getEmployee = async (tenantKey, id, token) => {
  const response = await axios.get(`${API_URL}/employee/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-Tenant-ID': tenantKey,
      },
    });
  return response.data;
};
