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
  Button
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployees } from '../../../services/employeeService';
import { useAuth } from '../../../../auth/context/AuthContext';

const EmployeesList = () => {
  const navigate = useNavigate();
  const { tenantKey } = useParams();
  const [employees, setEmployees] = useState([]);
  const {token} = useAuth();

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
  }, [tenantKey]);

  const handleChooseEmployee = (employeeId) => {
    navigate(`/tenant/${tenantKey}/employee/${employeeId}/services-list`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Employees List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Employee Role</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((emp) => (
              <TableRow key={emp.employeeId}>
                <TableCell>{emp.user?.firstName}</TableCell>
                <TableCell>{emp.user?.lastName}</TableCell>
                <TableCell>{emp.user?.role}</TableCell>
                <TableCell>{emp.user?.email}</TableCell>
                <TableCell>{emp.user?.phone}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => handleChooseEmployee(emp.employeeId)}
                  >
                    <ArrowForwardIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {employees.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No employees found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
        {employees.length === 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(`/tenant/${tenantKey}/view`)}
          >
            Back
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default EmployeesList;