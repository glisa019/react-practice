import axios from 'axios';
import { API_URL } from '../../../shared/api';

export const createAppointment = async (tenantKey, serviceId, slotId, token) => {
  const response = await axios.post(
    `${API_URL}/appointments`,
    { serviceId, slotId },
    {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Tenant-ID': tenantKey,
        },
      }
    );
  return response.data;
};
