import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const BookingSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { tenantKey } = useParams();

  if (!state) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 4rem)' }}>
        <Typography>Missing booking details.</Typography>
      </Box>
    );
  }

  const { employee, service, date, time, userId } = state;

  // Extract the time string from the time object
  const displayTime = typeof time === 'object' ? time.startTime : time;

  const handleViewReservations = () => {
    if (!userId) return;
    navigate(`/tenant/${tenantKey}/profile/${userId}/reservations`);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: '#f5f5f5', minHeight: 'calc(100vh - 4rem)', p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 480 }}>
        <Typography variant="h5" gutterBottom textAlign="center" color="green">
          Appointment Booked Successfully!
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          You have booked <b>{service?.name}</b> with <b>{employee?.user.firstName} {employee?.user.lastName}</b>.
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Date: {date} <br />
          Time: {displayTime}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button variant="outlined" onClick={() => navigate(`/tenant/${tenantKey}/view`)}>
            Back to Tenant
          </Button>
          {userId && (
            <Button variant="contained" onClick={handleViewReservations}>
              View My Reservations
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default BookingSuccess;
