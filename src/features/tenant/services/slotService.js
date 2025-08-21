import axios from 'axios';
import { API_URL } from '../../../shared/api';

export const getEmployeeSlots = async (tenantKey, employeeId, date, token) => {
  const response = await axios.get(`${API_URL}/slots/${employeeId}`, {
    params: { date },
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Tenant-ID': tenantKey,
      },
    });
  return response.data;
};
