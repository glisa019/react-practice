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
  Stack,
  IconButton,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';
import { getServices, createService, deleteService } from '../../services/serviceService';
import FormControl from '@mui/material/FormControl';
import { useAuth } from '../../../auth/context/AuthContext';

const TenantSettingsServices = () => {
  const { tenantKey } = useParams();
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    name: '',
    duration: '',
    description: '',
    price: '',
  });
  const {token} = useAuth()

  useEffect(() => {
    if (!tenantKey) return;

    const fetch = async () => {
      try {
        const data = await getServices(tenantKey, token);
        setServices(data);
      } catch (err) {
        console.error('Failed to fetch services', err);
      }
    };

    fetch();
  }, [tenantKey]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name || !form.duration || !form.description || form.price === '') {
      return;
    }

    try {
      await createService(tenantKey, {
        name: form.name,
        duration: form.duration,
        description: form.description,
        price: parseFloat(form.price),
      }, token);
      const data = await getServices(tenantKey, token);
      setServices(data);
      setForm({ name: '', duration: '', description: '', price: '' });
    } catch (err) {
      console.error('Failed to create service', err);
    }
  };

  const handleRemove = async (id) => {
    try {
      await deleteService(tenantKey, id, token);
      setServices(services.filter((s) => s.serviceId !== id));
    } catch (err) {
      console.error('Failed to delete service', err);
    }
  };

  return (
    <Box p={2} maxWidth={900} mx="auto" display="flex" flexDirection="column" alignItems="center">
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Add Service
      </Typography>
      <Box
        component="form"
        onSubmit={handleAdd}
        mb={4}
        width="100%"
        display="flex"
        justifyContent="center"
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{ width: '100%', maxWidth: 900, mx: 'auto' }}
        >
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            variant="standard"
            sx={{ minWidth: 180, maxWidth: 250, width: '100%' }}
          />
          <FormControl variant="standard" sx={{ minWidth: 120, maxWidth: 180, width: '100%' }}>
            <InputLabel id="duration-label">Duration</InputLabel>
            <Select
              labelId="duration-label"
              id="duration"
              name="duration"
              value={form.duration}
              onChange={handleChange}
              required
              label="Duration"
            >
              {Array.from({ length: 16 }, (_, i) => (i + 1) * 15).map((value) => (
                <MenuItem key={value} value={value}>
                  {value} min
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            variant="standard"
            sx={{ minWidth: 200, maxWidth: 300, width: '100%' }}
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            required
            variant="standard"
            sx={{ minWidth: 100, maxWidth: 140, width: '100%' }}
            inputProps={{ min: 0, step: 0.01 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ minWidth: 120 }}
          >
            Add Service
          </Button>
        </Stack>
      </Box>

      <Typography variant="h6" gutterBottom>
        Employee Services
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          mb: 4,
          maxWidth: 900,
          mx: 'auto',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Duration</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.serviceId}>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.duration}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell>${service.price.toFixed(2)}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="error"
                    onClick={() => handleRemove(service.serviceId)}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {services.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No services found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TenantSettingsServices;