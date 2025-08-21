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
  IconButton,
  Typography,
  CircularProgress,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import { useNavigate, useParams } from 'react-router-dom';
import { getServices } from '../../../services/serviceService';
import { useAuth } from '../../../../auth/context/AuthContext';

const EmployeeServicesList = () => {
  const navigate = useNavigate();
  const { tenantKey, employeeId } = useParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {token} = useAuth();

  useEffect(() => {
    if (!tenantKey) return;

    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getServices(tenantKey, token);
        setServices(data);
      } catch (err) {
        console.error('Failed to fetch services', err);
        setError('Failed to load services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [tenantKey]);

  const handleChooseDate = (serviceId) => {
    navigate(
      `/tenant/${tenantKey}/employee/${employeeId}/service/${serviceId}/calendar`
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Employee Services List
      </Typography>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress size={24} />
        </Box>
      )}
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.serviceId}>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.price}</TableCell>
                <TableCell>{service.duration}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => handleChooseDate(service.serviceId)}
                  >
                    <EventIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {services.length === 0 && !loading && !error && (
              <TableRow>
                <TableCell colSpan={5} align="center">
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

export default EmployeeServicesList;