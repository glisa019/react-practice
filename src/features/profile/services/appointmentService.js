import axios from 'axios';
import { API_URL } from '../../../shared/api';

export const getAppointments = async (tenantKey, token, date) => {
  const response = await axios.get(`${API_URL}/appointments`, {
    params: { date: date ?? null },
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Tenant-ID': tenantKey,
      },
    });
  return response.data;
};
