import './Register.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../../../shared/contexts/ThemeContext';
import axios from 'axios';
import { API_URL } from '../../../shared/api';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from '@mui/material';

const Register = () => {
  const navigate = useNavigate();
  const { tenantKey } = useParams();
  const { fetchTenantTheme } = useTheme();
  const { register: registerAuth, registerConsumer } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  let { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    if (tenantKey) {
      fetchTenantTheme(tenantKey);
    }
  }, [tenantKey, fetchTenantTheme]);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const { repeatPassword, ...payload } = data;
      let response;

      if (tenantKey) {
        response = await registerConsumer({...payload, tenantKey});
      } else {
        response = await registerAuth({ ...payload, tenantKey });
      }

      if (tenantKey) {
        navigate(`/tenant/${tenantKey}/view`);
        return;
      }

      navigate('/tenant/form');
    } catch (err) {
      console.error('Registration failed', err);
      setError('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateTo = (e) => {
    e.preventDefault();
    if(tenantKey){
      navigate(`/tenant/${tenantKey}/login`);
      return;
    }

    navigate('/login');
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
          Registration
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Create your account to get started.
        </Typography>
        {error && (
          <Typography color="error" variant="body2" mb={1}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('firstName', {
              required: 'First name is required',
            })}
            label="First Name"
            fullWidth
            margin="normal"
            variant="standard"
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            required
          />
          <TextField
            {...register('lastName', {
              required: 'Last name is required',
            })}
            label="Last Name"
            fullWidth
            margin="normal"
            variant="standard"
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            required
          />
          <TextField
            {...register('phone', {
              required: 'Phone is required',
            })}
            label="Phone"
            fullWidth
            margin="normal"
            variant="standard"
            error={!!errors.phone}
            helperText={errors.phone?.message}
            required
          />
          <TextField
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Invalid email address',
              },
            })}
            label="Email Address"
            type="email"
            fullWidth
            margin="normal"
            variant="standard"
            error={!!errors.email}
            helperText={errors.email?.message}
            required
          />
          <TextField
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            })}
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="standard"
            error={!!errors.password}
            helperText={errors.password?.message}
            required
          />
          <TextField
            {...register('repeatPassword', {
              required: 'Repeat Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            })}
            label="Repeat Password"
            type="password"
            fullWidth
            margin="normal"
            variant="standard"
            error={!!errors.repeatPassword}
            helperText={errors.repeatPassword?.message}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </Button>
          <Button
            size="small"
            onClick={handleNavigateTo}
            fullWidth
            sx={{ mt: 1 }}
          >
            Already have an account? Log In
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;