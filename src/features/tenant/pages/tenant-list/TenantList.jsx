import React, { useState, useEffect } from 'react';
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
  TextField,
  InputAdornment,
  Alert,
  Snackbar
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';
import { useNavigate } from 'react-router-dom';
import { getTenants, activateTenantById, deactivateTenantById } from '../../services/tenantService';
import { useAuth } from '../../../auth/context/AuthContext';

const TenantList = () => {
  const [tenants, setTenants] = useState([]);
  const [filteredTenants, setFilteredTenants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { token, user } = useAuth();

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        setLoading(true);
        const data = await getTenants(token);
        setTenants(data);
        setFilteredTenants(data);
      } catch (err) {
        console.error('Failed to fetch tenants', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTenants();
  }, [token]);

  useEffect(() => {
    const filtered = tenants.filter(tenant =>
      tenant.schemaName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.tenantAdmin?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.tenantAdmin?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.motto?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.subscriptionStatus?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTenants(filtered);
  }, [searchTerm, tenants]);

  const handleView = (tenant) => {
    navigate(`/tenant/${tenant.schemaName}/view`);
  };

  const updateStatus = (id, status) => {
    setTenants(prev =>
      prev.map(t =>
        t.id === id || t.tenantId === id
          ? { ...t, subscriptionStatus: status }
          : t
      )
    );
    setFilteredTenants(prev =>
      prev.map(t =>
        t.id === id || t.tenantId === id
          ? { ...t, subscriptionStatus: status }
          : t
      )
    );
  };

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleActivate = async (tenant) => {
    const tenantId = tenant.id ?? tenant.tenantId;
    if (!tenantId) return;
    try {
      await activateTenantById(tenantId, token);
      updateStatus(tenantId, 'ACTIVE');
      showSnackbar('Tenant activated successfully');
    } catch (err) {
      console.error('Failed to activate tenant', err);
      showSnackbar('Failed to activate tenant', 'error');
    }
  };

  const handleDeactivate = async (tenant) => {
    const tenantId = tenant.id ?? tenant.tenantId;
    if (!tenantId) return;
    try {
      await deactivateTenantById(tenantId, token);
      updateStatus(tenantId, 'INACTIVE');
      showSnackbar('Tenant deactivated successfully');
    } catch (err) {
      console.error('Failed to deactivate tenant', err);
      showSnackbar('Failed to deactivate tenant', 'error');
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">Loading tenants...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6">
          Tenant List
        </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        
        {/* Search Field - moved to right side */}
        <TextField
          placeholder="Search tenants"
            type="text"
            variant="standard"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {tenants.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          No tenants found.
        </Alert>
      ) : filteredTenants.length === 0 ? (
        <Alert severity="warning" sx={{ mt: 2 }}>
          No tenants match your search criteria. Try a different search term.
        </Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="whitespace-nowrap">Schema Name</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Motto</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Subscription Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTenants.map((tenant) => (
                <TableRow key={tenant.id || tenant.tenantId}>
                  <TableCell>{tenant.schemaName}</TableCell>
                  <TableCell>{tenant.name}</TableCell> 
                  <TableCell>{tenant.tenantAdmin?.firstName} {tenant.tenantAdmin?.lastName}</TableCell>
                  <TableCell>{tenant.phone}</TableCell>
                  <TableCell>{tenant.address}</TableCell>
                  <TableCell>{tenant.motto}</TableCell>
                  <TableCell>{tenant.description}</TableCell>
                  <TableCell>{tenant.subscriptionStatus}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => handleView(tenant)}
                    >
                      <VisibilityIcon fontSize="medium" />
                    </IconButton>
                    {user?.role === 'ADMIN' && (
                      tenant.subscriptionStatus === 'INACTIVE' ? (
                        <IconButton
                          color="success"
                          size="small"
                          onClick={() => handleActivate(tenant)}
                        >
                          <CheckCircleIcon fontSize="medium" />
                        </IconButton>
                      ) : tenant.subscriptionStatus === 'ACTIVE' ? (
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => handleDeactivate(tenant)}
                        >
                          <BlockIcon fontSize="medium" />
                        </IconButton>
                      ) : null
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TenantList;
