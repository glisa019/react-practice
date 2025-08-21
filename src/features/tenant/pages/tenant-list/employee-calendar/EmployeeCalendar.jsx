import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Grid,
  Button,
  Stack,
  TextField,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useParams } from 'react-router-dom';
import { getEmployee } from '../../../services/employeeService';
import { getService } from '../../../services/serviceService';
import { getEmployeeSlots } from '../../../services/slotService';
import { createAppointment } from '../../../services/appointmentService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../auth/context/AuthContext';
import { format } from 'date-fns';


const EmployeeCalendar = () => {
  const { tenantKey, employeeId, serviceId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState(null);
  const navigate = useNavigate();
  const {user, token} = useAuth();

  useEffect(() => {
    if (!tenantKey || !employeeId || !serviceId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [empData, serviceData] = await Promise.all([
          getEmployee(tenantKey, employeeId, token),
          getService(tenantKey, serviceId, token),
        ]);
        setEmployee(empData);
        setService(serviceData);
      } catch (err) {
        console.error('Failed to fetch employee or service', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tenantKey, employeeId, serviceId]);

  useEffect(() => {
    if (!tenantKey || !employeeId || !selectedDate) return;

    const fetchSlots = async () => {
      try {
        setSlotsLoading(true);
        setSlotsError(null);
        const dateStr = new Date(format(selectedDate, 'yyyy-MM-dd')).toISOString().split('T')[0];
        const times = await getEmployeeSlots(tenantKey, employeeId, dateStr, token);
        setAvailableTimes(times);
      } catch (err) {
        console.error('Failed to fetch slots', err);
        setSlotsError('Failed to load slots');
        setAvailableTimes([]);
      } finally {
        setSlotsLoading(false);
      }
    };

    fetchSlots();
  }, [selectedDate, tenantKey, employeeId]);

  const handleBook = async () => {
    if (!employee || !service || !selectedDate || !selectedTime) return;

    try {
      await createAppointment(tenantKey, serviceId, selectedTime.slotId, token);
      navigate(
        `/tenant/${tenantKey}/employee/${employeeId}/service/${serviceId}/success`,
        {
          state: {
            employee,
            service,
            date: new Date(format(selectedDate, 'yyyy-MM-dd')).toISOString().split('T')[0],
            time: selectedTime,
            userId: user?.id,
          },
        }
      );
    } catch (err) {
      console.error('Failed to create appointment', err);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 4rem)' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
  <Box
    sx={{
      minHeight: 'calc(100vh - 4rem)',
      bgcolor: '#f5f5f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 3,
    }}
  >
    <Grid container spacing={4} justifyContent="center" alignItems="center" sx={{ maxWidth: 900 }}>
      {/* Employee & Service Details */}
      <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar src={employee?.avatar} sx={{ width: 64, height: 64 }} />
            <Box>
              <Typography variant="h6">
                {employee?.user.firstName} {employee?.user.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {employee?.role}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {employee?.user.email}
              </Typography>
            </Box>
          </Stack>
          <Box mt={3}>
            <Typography variant="subtitle1" fontWeight={600}>
              {service?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {service?.description}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <b>Price:</b> {service?.price} &nbsp; <b>Duration:</b> {service?.duration}
            </Typography>
          </Box>
        </Paper>
      </Grid>
      {/* Calendar & Booking */}
      <Grid item xs={12} md={5} sx={{maxWidth: '500px'
      }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Choose Date & Time
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={setSelectedDate}
              disablePast
              sx={{ mb: 2, width: '100%' }}
            />
          </LocalizationProvider>
          <TextField
            select
            label="Select Time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            disabled={!selectedDate || slotsLoading}
          >
            {slotsLoading ? (
              <MenuItem disabled>Loading...</MenuItem>
            ) : availableTimes.length > 0 ? (
              availableTimes.map((slot) => (
                <MenuItem key={slot.slotId} value={slot}>
                  {slot.startTime} - {slot.endTime}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No available slots</MenuItem>
            )}
          </TextField>
          {slotsError && (
            <Typography color="error" variant="body2" sx={{ mb: 2 }}>
              {slotsError}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            disabled={!selectedDate || !selectedTime}
            fullWidth
            onClick={handleBook}
          >
            Book Appointment
          </Button>
        </Paper>
      </Grid>
    </Grid>
  </Box>
);
};

export default EmployeeCalendar;