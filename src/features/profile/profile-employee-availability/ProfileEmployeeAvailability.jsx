import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Button,
  Alert,
  Chip,
  Collapse,
  IconButton,
  TablePagination,
  TableSortLabel,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createAvailability, getAvailabilities } from '../../auth/services/availabilityService';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthContext';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { format } from 'date-fns';

const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours, 10);
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  const ampm = hour >= 12 ? 'PM' : 'AM';
  return `${displayHour}:${minutes} ${ampm}`;
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const calculateDuration = (startTime, endTime) => {
  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);
  return (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);
};

const Row = ({ 
  availability, 
  slotsSortField,
  slotsSortDirection,
  onSlotsSort
}) => {
  const [open, setOpen] = useState(false);
  // Each row manages its own pagination state
  const [slotsPage, setSlotsPage] = useState(0);
  const [slotsRowsPerPage, setSlotsRowsPerPage] = useState(5);

  // Sort and paginate time slots
  const sortedSlots = useMemo(() => {
    const sorted = [...availability.timeSlots];
    
    if (slotsSortField) {
      sorted.sort((a, b) => {
        const aValue = slotsSortField === 'time' ? a.startTime : a.status;
        const bValue = slotsSortField === 'time' ? b.startTime : b.status;
        
        if (aValue < bValue) return slotsSortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return slotsSortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    return sorted;
  }, [availability.timeSlots, slotsSortField, slotsSortDirection]);

  const paginatedSlots = useMemo(() => {
    return sortedSlots.slice(
      slotsPage * slotsRowsPerPage,
      slotsPage * slotsRowsPerPage + slotsRowsPerPage
    );
  }, [sortedSlots, slotsPage, slotsRowsPerPage]);

  // Each row handles its own pagination
  const handleSlotsPageChange = (event, newPage) => {
    setSlotsPage(newPage);
  };

  const handleSlotsRowsPerPageChange = (event) => {
    setSlotsRowsPerPage(parseInt(event.target.value, 10));
    setSlotsPage(0);
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{formatDate(availability.date)}</TableCell>
        <TableCell>{availability.timeSlots.length} slots</TableCell>
        <TableCell>
          {availability.timeSlots.filter(s => s.status === 'AVAILABLE').length} available
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                Time Slots
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <TableSortLabel
                        active={slotsSortField === 'time'}
                        direction={slotsSortDirection}
                        onClick={() => onSlotsSort('time')}
                        IconComponent={slotsSortField === 'time' ? 
                          (slotsSortDirection === 'asc' ? ArrowUpwardIcon : ArrowDownwardIcon) : undefined}
                      >
                        Time
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={slotsSortField === 'status'}
                        direction={slotsSortDirection}
                        onClick={() => onSlotsSort('status')}
                        IconComponent={slotsSortField === 'status' ? 
                          (slotsSortDirection === 'asc' ? ArrowUpwardIcon : ArrowDownwardIcon) : undefined}
                      >
                        Status
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedSlots.map((slot) => (
                    <TableRow key={slot.slotId}>
                      <TableCell>{formatTime(slot.startTime)}</TableCell>
                      <TableCell>
                        {calculateDuration(slot.startTime, slot.endTime)} minutes
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={slot.status} 
                          color={slot.status === 'AVAILABLE' ? 'success' : 'error'}
                          size="small"
                          clickable={false}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={sortedSlots.length}
                rowsPerPage={slotsRowsPerPage}
                page={slotsPage}
                onPageChange={handleSlotsPageChange}
                onRowsPerPageChange={handleSlotsRowsPerPageChange}
                sx={{ 
                  '& .MuiTablePagination-toolbar': {
                    padding: 0,
                    minHeight: 'auto'
                  },
                  '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                    marginTop: '8px',
                    marginBottom: '8px'
                  }
                }}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const ProfileAvailabilityList = () => {
  const { tenantKey } = useParams();
  const [availabilities, setAvailabilities] = useState([]);
  const [filteredAvailabilities, setFilteredAvailabilities] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { token } = useAuth();
  
  // Main table pagination and sorting
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('date');
  const [order, setOrder] = useState('asc');
  
  // Time slots sorting (shared across all rows)
  const [slotsSortField, setSlotsSortField] = useState('time');
  const [slotsSortDirection, setSlotsSortDirection] = useState('asc');

  useEffect(() => {
    if (!tenantKey) return;
    const fetchAvailabilities = async () => {
      try {
        const data = await getAvailabilities(tenantKey, token);
        setAvailabilities(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch availabilities', err);
      }
    };
    fetchAvailabilities();
  }, [tenantKey, token]);

  useEffect(() => {
    // Filter and sort the availabilities whenever the original data or sorting changes
    const filtered = [...availabilities];
    
    filtered.sort((a, b) => {
      const aValue = orderBy === 'date' ? new Date(a.date) : a.timeSlots.length;
      const bValue = orderBy === 'date' ? new Date(b.date) : b.timeSlots.length;
      
      if (aValue < bValue) return order === 'asc' ? -1 : 1;
      if (aValue > bValue) return order === 'asc' ? 1 : -1;
      return 0;
    });
    
    setFilteredAvailabilities(filtered);
  }, [availabilities, orderBy, order]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fromDate || !toDate || !startTime || !endTime) {
      setError('Please fill in all fields');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const dates = [];
      const current = new Date(format(fromDate, 'yyyy-MM-dd'));
      const end = new Date(format(toDate, 'yyyy-MM-dd'));
      while (current <= end) {
        dates.push(current.toISOString().split('T')[0]);
        current.setDate(current.getDate() + 1);
      }
      await createAvailability({
        dates,
        shiftStart: startTime + ':00',
        shiftEnd: endTime + ':00',
        tenantKey
      }, token);
      const data = await getAvailabilities(tenantKey, token);
      setAvailabilities(Array.isArray(data) ? data : []);
      setSuccess(true);
      setFromDate(null);
      setToDate(null);
      setStartTime('');
      setEndTime('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to create availability', err);
      setError('Failed to save availability');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSlotsSort = (field) => {
    if (slotsSortField === field) {
      setSlotsSortDirection(slotsSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSlotsSortField(field);
      setSlotsSortDirection('asc');
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Availability Management
      </Typography>
      
      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Add New Availability
        </Typography>
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Availability saved successfully!
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <DatePicker
                label="From Date"
                value={fromDate}
                onChange={setFromDate}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
              <DatePicker
                label="To Date"
                value={toDate}
                onChange={setToDate}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Box>
          </LocalizationProvider>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Start Time"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputProps={{ step: 300 }} // 5 min steps
            />
            <TextField
              label="End Time"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputProps={{ step: 300 }} // 5 min steps
            />
          </Box>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Availability'}
          </Button>
        </form>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Current Availability
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={orderBy}
              onChange={(e) => setOrderBy(e.target.value)}
              label="Sort By"
            >
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="slots">Number of Slots</MenuItem>
            </Select>
          </FormControl>
          <IconButton onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}>
            {order === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
          </IconButton>
        </Box>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'date'}
                    direction={order}
                    onClick={() => handleRequestSort('date')}
                  >
                    Date
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'slots'}
                    direction={order}
                    onClick={() => handleRequestSort('slots')}
                  >
                    Total Slots
                  </TableSortLabel>
                </TableCell>
                <TableCell>Available</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAvailabilities
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((availability) => (
                  <Row 
                    key={availability.availabilityId} 
                    availability={availability}
                    slotsSortField={slotsSortField}
                    slotsSortDirection={slotsSortDirection}
                    onSlotsSort={handleSlotsSort}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredAvailabilities.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default ProfileAvailabilityList;