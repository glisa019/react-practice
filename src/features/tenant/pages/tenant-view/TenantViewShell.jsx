import { Outlet, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useTheme } from '../../../../shared/contexts/ThemeContext';
import { getTenantByKey, activateTenant } from '../../services/tenantService';
import { useAuth } from '../../../auth/context/AuthContext';

const TenantViewShell = () => {

  const { tenantKey } = useParams();
  const location = useLocation();
  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(true);
  const { updateTheme } = useTheme();
  const { token } = useAuth();

  useEffect(() => {
    if (!tenantKey) return;

    const fetchTenant = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams(location.search);
        if (params.get('activateTenant') === 'true') {
          await activateTenant(tenantKey, token);
        }

        const data = await getTenantByKey(tenantKey, token);
        setTenant(data);
        if (data && data.textColour) {
          updateTheme({
            textColor: data.textColour,
            backgroundColor: data.backgroundColour,
            borderColor: data.borderColour,
            fontFamily: data.font,
          });
        }
      } catch (err) {
        console.error('Failed to fetch tenant', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTenant();
  }, [tenantKey, location.search, updateTheme]);

  return (
    <Box sx={{ position: 'relative', minHeight: 'calc(100vh - 4rem)' }}>
      {loading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(255, 255, 255, 0.7)',
            zIndex: 1300,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Outlet context={{ tenant, loading }} />
    </Box>
  );
};

export default TenantViewShell;
