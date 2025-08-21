import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  Divider,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { getUser, updateUser, resetPassword } from '../services/userService';
import { useAuth } from '../../auth/context/AuthContext';

const ProfileGeneralDetails = () => {
  const { profileId,tenantKey } = useParams();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    oldPassword: '',
    newPassword: '',
    repeatNewPassword: '',
  });
  const {token, user} = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!profileId) return;
      try {
        const data = await getUser(profileId, tenantKey, token, user.role);
        setForm((prev) => ({
          ...prev,
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          phone: data.phone || '',
          email: data.email || '',
        }));
      } catch (err) {
        console.error('Failed to fetch user', err);
      }
    };
    fetchData();
  }, [profileId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSaveBasic = async (e) => {
    e.preventDefault();
    if (!profileId) return;
    try {
      await updateUser(profileId, {
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        email: form.email,
      }, token, tenantKey, user.role);
      alert('Basic information updated!');
    } catch (err) {
      console.error('Failed to update user', err);
    }
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.repeatNewPassword) {
      alert('New passwords do not match!');
      return;
    }
    try {
      await resetPassword({
        email: form.email,
        temporaryPassword: form.oldPassword,
        newPassword: form.newPassword,
      }, token, tenantKey, user.role);
      alert('Password updated!');
      setForm((prev) => ({
        ...prev,
        oldPassword: '',
        newPassword: '',
        repeatNewPassword: '',
      }));
    } catch (err) {
      console.error('Failed to reset password', err);
    }
  };


  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 4 },
        maxWidth: 480,
        mx: 'auto',
        borderRadius: 4,
        bgcolor: '#fff',
        color: '#222',
        fontFamily: 'Roboto, Arial, sans-serif',
        transition: 'all 0.3s',
        boxShadow: 'none',
        border: 'none',
      }}
    >
      <Typography variant="h5" fontWeight={700} gutterBottom>
        General Details
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Section 1: Basic Info */}
      <Box mb={3} component="form" onSubmit={handleSaveBasic}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Basic Information
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
          />
          <TextField
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 1, fontWeight: 600, borderRadius: 2 }}
            fullWidth
          >
            Save Basic Info
          </Button>
        </Stack>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Section 2: Change Password */}
      <Box mb={3} component="form" onSubmit={handleSavePassword}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Change Password
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Old Password"
            name="oldPassword"
            type="password"
            value={form.oldPassword}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="New Password"
            name="newPassword"
            type="password"
            value={form.newPassword}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Repeat New Password"
            name="repeatNewPassword"
            type="password"
            value={form.repeatNewPassword}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 1, fontWeight: 600, borderRadius: 2 }}
            fullWidth
          >
            Save Password
          </Button>
        </Stack>
      </Box>

      <Divider sx={{ my: 3 }} />

    </Paper>
  );
};

export default ProfileGeneralDetails;
