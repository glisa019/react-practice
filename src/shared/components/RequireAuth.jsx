import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useAuth } from '../../features/auth/context/AuthContext';

const RequireAuth = () => {
  const { user } = useAuth();
  const { tenantKey } = useParams();

  if (!user) {
    const redirectPath = tenantKey ? `/tenant/${tenantKey}/login` : '/login';
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
