import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Paper, CircularProgress, Button } from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthContext';

// Components
import ProfileGeneralDetails from '../profile-general-details/ProfileGeneralDetails';
import ProfileAvailabilityList from '../profile-employee-availability/ProfileEmployeeAvailability';
import ProfileReservationList from '../profile-reservation-list/ProfileReservationList';
import ProfileSettings from '../profile-settings/ProfileSettings';

// All possible tabs (order must match tab indexes)
const ALL_TABS = [
  { id: 'general-details', label: 'General Details', component: ProfileGeneralDetails },
  { id: 'employee-availability', label: 'Availability', component: ProfileAvailabilityList, roles: ['EMPLOYEE'] },
  {
    id: 'reservations',
    label: 'Reservations',
    component: ProfileReservationList,
    hideForRoles: ['TENANT_ADMIN', 'ADMIN']
  },
  { id: 'settings', label: 'Settings', component: ProfileSettings }
];

const ProfileShell = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { tenantKey, profileId } = useParams();
  const [loading, setLoading] = useState(false);

  // Filter tabs based on user role
  const availableTabs = ALL_TABS.filter(
    (tab) =>
      (!tab.roles || tab.roles.includes(user?.role)) &&
      (!tab.hideForRoles || !tab.hideForRoles.includes(user?.role))
  );

  // Find current tab index
  const currentPath = location.pathname.split('/').pop();
  const activeTabIndex = availableTabs.findIndex(tab => 
    currentPath === tab.id
  ) || 0;

  const [tab, setTab] = useState(activeTabIndex);

  // Sync tab with route changes
  useEffect(() => {
    const newIndex = availableTabs.findIndex(tab => 
      location.pathname.endsWith(tab.id)
    );
    if (newIndex !== -1 && newIndex !== tab) {
      setTab(newIndex);
    }
  }, [location.pathname]);

  const handleChange = async (_, newValue) => {
    setLoading(true);
    setTab(newValue);
    await navigate(`/tenant/${tenantKey}/profile/${profileId}/${availableTabs[newValue].id}`);
    setLoading(false);
  };

  return (
    <div>
      <div className="w-full px-3 h-16 flex justify-end items-center">
              <Button
                variant="outlined"
                startIcon={<PreviewIcon />}
                onClick={() => navigate(`/tenant/${tenantKey}/view`)}
              >
                Preview Tenant
              </Button>
            </div>
    <Box sx={{ display: 'flex', minHeight: 400, bgcolor: '#f5f5f5', p: 3 }}>
      <Paper elevation={2} sx={{ minWidth: 220, mr: 3 }}>
        <Tabs
          orientation="vertical"
          value={tab}
          onChange={handleChange}
          variant="scrollable"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          {availableTabs.map((tabItem) => (
            <Tab key={tabItem.id} label={tabItem.label} />
          ))}
        </Tabs>
      </Paper>

      <Paper elevation={2} sx={{ flex: 1, p: 2, position: 'relative' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          availableTabs[tab]?.component && React.createElement(availableTabs[tab].component)
        )}
      </Paper>
    </Box>
    </div>
  );
};

export default ProfileShell;