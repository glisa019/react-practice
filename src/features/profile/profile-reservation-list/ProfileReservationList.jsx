import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, parseISO } from 'date-fns';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthContext';
import { getAppointments } from '../services/appointmentService';

const ProfileReservationList = () => {
  const { tenantKey } = useParams();
  const { token, user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const dateStr = user?.role !== "CUSTOMER" && selectedDate 
          ? format(selectedDate, 'yyyy-MM-dd') 
          : null;
        const data = await getAppointments(tenantKey, token, dateStr);
        setReservations(data);
      } catch (err) {
        console.error('Failed to fetch appointments', err);
        setReservations([]);
      }
    };

    if (tenantKey && token) {
      fetchAppointments();
    }
  }, [tenantKey, token, selectedDate, user?.role]);

  const formatAppointmentTime = (isoString) => {
    try {
      const date = parseISO(isoString);
      return {
        date: format(date, 'yyyy-MM-dd'),
        time: format(date, 'HH:mm')
      };
    } catch {
      return { date: '', time: '' };
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Reservations
      </Typography>
      
      {user?.role !== "CUSTOMER" && (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Select date"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            renderInput={(params) => (
              <TextField 
                {...params} 
                sx={{ mb: 2 }} 
                helperText={!selectedDate ? "Select a date to view appointments" : ""}
              />
            )}
          />
        </LocalizationProvider>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {/* Show Employee column if user is CUSTOMER, otherwise show Customer column */}
              {user?.role === "CUSTOMER" ? (
                <TableCell>Employee</TableCell>
              ) : (
                <TableCell>Customer</TableCell>
              )}
              <TableCell>Service</TableCell>
              <TableCell>Duration (min)</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((res) => {
              const { date, time } = formatAppointmentTime(res.appointmentTime);
              return (
                <TableRow key={res.appointmentId}>
                  {/* Show Employee name if user is CUSTOMER, otherwise show Customer name */}
                  {user?.role === "CUSTOMER" ? (
                    <TableCell>
                      {res.employee?.user?.firstName} {res.employee?.user?.lastName}
                    </TableCell>
                  ) : (
                    <TableCell>
                      {res.customer?.firstName} {res.customer?.lastName}
                    </TableCell>
                  )}
                  <TableCell>{res.service?.name}</TableCell>
                  <TableCell>{res.service?.duration}</TableCell>
                  <TableCell>{date}</TableCell>
                  <TableCell>{time}</TableCell>
                  <TableCell>{res.status}</TableCell>
                </TableRow>
              );
            })}
            {reservations.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  {selectedDate || user?.role === "CUSTOMER" 
                    ? "No reservations found" 
                    : "Select a date to view appointments"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProfileReservationList;
