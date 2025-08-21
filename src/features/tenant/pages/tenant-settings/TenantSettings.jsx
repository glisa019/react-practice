import React, { useState, useEffect } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Paper,
  Button
} from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import TenantSettingsGeneralDetails from './TenantSettingsGeneralDetails';
import TenantSettingsEmployees from './TenantSettingsEmployees';
import TenantSettingsServices from './TenantSettingsServices';

const tabRoutes = [
  'general-details',
  'employees',
  'services',
];

const tabComponents = [
  <TenantSettingsGeneralDetails key="general" />,
  <TenantSettingsEmployees key="employees" />,
  <TenantSettingsServices key="services" />,
];

const TenantSettings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tenantKey } = useParams(); // get tenantId from route params

  // Get the last part of the path (e.g. 'general-details')
  const getTabIndex = () => {
    const lastSegment = location.pathname.split('/').pop();
    const idx = tabRoutes.findIndex((route) => route === lastSegment);
    return idx === -1 ? 0 : idx;
  };

  const [tab, setTab] = useState(getTabIndex());

  useEffect(() => {
    setTab(getTabIndex());
    // eslint-disable-next-line
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setTab(newValue);
    // Build the new route using tenantId and tabRoutes
    navigate(`/tenant/${tenantKey}/settings/${tabRoutes[newValue]}`);
  };

  return (
    <div>
      <div class="w-full px-3 h-16 flex justify-end items-center">
        <Button
          variant="outlined"
          startIcon={<PreviewIcon />}
          onClick={() => navigate(`/tenant/${tenantKey}/view`)}
        >
          Preview Tenant
        </Button>
      </div>
      <Box sx={{ display: 'flex', minHeight: 400, bgcolor: '#f5f5f5', p: 3 }}>
      <Paper elevation={2} sx={{ minWidth: 200, mr: 3 }}>
        <Tabs
          orientation="vertical"
          value={tab}
          onChange={handleChange}
          variant="scrollable"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label="General Details" />
          <Tab label="Employees" />
          <Tab label="Services" />
        </Tabs>
      </Paper>
      <Paper elevation={2} sx={{ flex: 1, p: 2 }}>
        {tabComponents[tab]}
      </Paper>
    </Box>
    </div>
  );
};

export default TenantSettings;