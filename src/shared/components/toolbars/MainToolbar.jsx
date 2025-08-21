
import AccountMenu from './AccountMenu';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../../../features/auth/context/AuthContext';

export const hasRole = (user, role) => {
  return user?.role === role; // Optional chaining handles null/undefined
};

const MainToolbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tenantKey } = useParams();
  const { user } = useAuth();

  // Show Settings button only on /tenant/test/view... routes
  const showSettings = 
  user &&
  location.pathname.startsWith(`/tenant/${tenantKey}/view`) && 
  hasRole(user, "TENANT_ADMIN");


  return (
    <div className="h-16 w-full border-b border-b-gray-200 flex items-center justify-end p-2">
      {showSettings && (
        <Tooltip title="Tenant Settings">
          <IconButton onClick={() => navigate(`/tenant/${tenantKey}/settings`)} color="primary">
            <SettingsIcon />
          </IconButton>
        </Tooltip>
      )}
      <AccountMenu />
    </div>
  );
};

export default MainToolbar;