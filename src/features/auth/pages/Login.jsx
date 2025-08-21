import './Login.css';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../shared/contexts/ThemeContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper
} from '@mui/material';

const Login = () => {
  const navigate = useNavigate();
  const { theme, fetchTenantTheme } = useTheme();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { tenantKey } = useParams();

  useEffect(() => {
    if (tenantKey) {
      fetchTenantTheme(tenantKey);
    }
  }, [tenantKey, fetchTenantTheme]);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await login({ ...data, tenantKey });


      // temporary test should be tenantKey
      if(tenantKey){
        if(response.account.role === "EMPLOYEE" && response.passwordResetRequired){
          navigate(`/tenant/${tenantKey}/reset-password`);
          return;
        }

        navigate(`/tenant/${tenantKey}/view`);
        return;
      }

      if(response.account.role === "ADMIN"){
        navigate('/tenant/list');
        return;
      }
        

      !response.tenantExists ? navigate('/tenant/form') : navigate(`/tenant/${response.tenantKey}/view`);
    } catch (err) {
      console.error('Login failed', err);
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateTo = (e) => {
    e.preventDefault();
    if(tenantKey) {
      navigate(`/tenant/${tenantKey}/register`);
      return;
    }

    navigate('/register');
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
          Welcome back!
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Please sign in to your account.
        </Typography>
        {error && (
          <Typography color="error" variant="body2" mb={1}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
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
            variant="standard"
            fullWidth
            margin="normal"
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
            variant="standard"
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
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
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
          <Button
            size="small"
            onClick={handleNavigateTo}
            fullWidth
            sx={{ mt: 1 }}
          >
            Don't have an account?
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
