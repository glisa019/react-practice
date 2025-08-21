import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { getEmployees, createEmployee } from '../../services/employeeService';
import { useAuth } from '../../../auth/context/AuthContext';

const TenantSettingsEmployees = () => {
  const { tenantKey } = useParams();
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    role: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    role: '',
    email: '',
    password: '',
  });
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    phone: false,
    role: false,
    email: false,
    password: false,
  });
  const [sending, setSending] = useState(false);
  const { token } = useAuth();

  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) error = 'This field is required';
        break;
      case 'email':
        if (!value) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'phone':
        if (!value) error = 'Phone number is required';
        break;
      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 8) {
          error = 'Password must be at least 8 characters';
        }
        break;
      case 'role':
        if (!value) error = 'Role is required';
        break;
      default:
        break;
    }
    
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, form[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    
    Object.keys(form).forEach(key => {
      const error = validateField(key, form[key]);
      newErrors[key] = error;
      if (error) isValid = false;
    });
    
    setErrors(newErrors);
    setTouched({
      firstName: true,
      lastName: true,
      phone: true,
      role: true,
      email: true,
      password: true,
    });
    
    return isValid;
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (!tenantKey) return;
    setSending(true);
    try {
      await createEmployee(form, tenantKey, token);
      const data = await getEmployees(tenantKey, token);
      setEmployees(data);
      setForm({ firstName: '', lastName: '', phone: '', email: '', password: '', role: '' });
      setErrors({
        firstName: '',
        lastName: '',
        phone: '',
        role: '',
        email: '',
        password: '',
      });
      setTouched({
        firstName: false,
        lastName: false,
        phone: false,
        role: false,
        email: false,
        password: false,
      });
    } catch (err) {
      console.error('Failed to add employee', err);
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    if (!tenantKey) return;
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees(tenantKey, token);
        setEmployees(data);
      } catch (err) {
        console.error('Failed to fetch employees', err);
      }
    };
    fetchEmployees();
  }, [tenantKey, token]);

  return (
    <Box p={2} maxWidth={900} mx="auto">
      <Typography variant="subtitle1" fontWeight={600} gutterBottom align="center">
        Add Employee
      </Typography>
      <Box
        component="form"
        onSubmit={handleAdd}
        mb={2}
        display="flex"
        justifyContent="center"
        width="100%"
      >
        <Grid justifyContent={'center'} container spacing={2} maxWidth={600}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              variant="standard"
              fullWidth
              error={!!errors.firstName && touched.firstName}
              helperText={touched.firstName && errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              variant="standard"
              fullWidth
              error={!!errors.lastName && touched.lastName}
              helperText={touched.lastName && errors.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              variant="standard"
              fullWidth
              error={!!errors.email && touched.email}
              helperText={touched.email && errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              variant="standard"
              fullWidth
              error={!!errors.phone && touched.phone}
              helperText={touched.phone && errors.phone}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Role"
              name="role"
              value={form.role}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              variant="standard"
              fullWidth
              error={!!errors.role && touched.role}
              helperText={touched.role && errors.role}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              variant="standard"
              fullWidth
              type="password"
              error={!!errors.password && touched.password}
              helperText={touched.password && errors.password}
            />
          </Grid>
        </Grid>
      </Box>

      <Box display="flex" justifyContent="center" mb={4}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={sending}
          onClick={handleAdd}
          sx={{ minWidth: 120 }}
        >
          {sending ? 'Adding...' : 'Add Employee'}
        </Button>
      </Box>

      <Typography variant="h6" gutterBottom>
        Employees
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4, maxWidth: 900, mx: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>First Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Last Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((emp) => (
              <TableRow key={emp.employeeId}>
                <TableCell>{emp.user?.firstName}</TableCell>
                <TableCell>{emp.user?.lastName}</TableCell>
                <TableCell>{emp?.role}</TableCell>
                <TableCell>{emp.user?.email}</TableCell>
                <TableCell>{emp.user?.phone}</TableCell>
              </TableRow>
            ))}
            {employees.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No employees found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TenantSettingsEmployees;