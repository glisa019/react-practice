import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
} from '@mui/material';
import { resetPassword } from '../services/authService';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthContext';

const ResetPassword = () => {
  const { tenantKey } = useParams();
  const { user } = useAuth()

  const [form, setForm] = useState({
    email: '',
    temporaryPassword: '',
    newPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await resetPassword(form, tenantKey);
      setForm({ email: '', temporaryPassword: '', newPassword: '' });
      navigate(`/tenant/${tenantKey}/profile/${user.id}/employee-availability`);
    } catch (err) {
      console.error('Reset password failed', err);
      setError('Reset password failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f5f5',
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" gutterBottom>
          Reset Password
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Enter your email and temporary password.
        </Typography>
        <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              variant="standard"
              value={form.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Temporary Password"
              name="temporaryPassword"
              type="password"
              fullWidth
              margin="normal"
              variant="standard"
              value={form.temporaryPassword}
              onChange={handleChange}
              required
            />
            <TextField
              label="New Password"
              name="newPassword"
              type="password"
              fullWidth
              margin="normal"
              variant="standard"
              value={form.newPassword}
              onChange={handleChange}
              required
            />
            {error && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {error}
              </Alert>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Reset Password'}
            </Button>
          </form>
      </Paper>
    </Box>
  );
};

export default ResetPassword;
