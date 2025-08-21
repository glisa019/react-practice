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
  Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { getTenants } from '../../services/tenantService';
import { useAuth } from '../../../auth/context/AuthContext';

const TenantList = () => {
  const [tenants, setTenants] = useState([]);
  const [filteredTenants, setFilteredTenants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { token } = useAuth();

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
      tenant.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTenants(filtered);
  }, [searchTerm, tenants]);

  const handleView = (tenant) => {
    navigate(`/tenant/${tenant.schemaName}/view`);
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
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTenants.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell>{tenant.schemaName}</TableCell>
                  <TableCell>{tenant.name}</TableCell> 
                  <TableCell>{tenant.tenantAdmin?.firstName} {tenant.tenantAdmin?.lastName}</TableCell>
                  <TableCell>{tenant.phone}</TableCell>
                  <TableCell>{tenant.address}</TableCell>
                  <TableCell>{tenant.motto}</TableCell>
                  <TableCell>{tenant.description}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => handleView(tenant)}
                    >
                      <VisibilityIcon fontSize="medium" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default TenantList;