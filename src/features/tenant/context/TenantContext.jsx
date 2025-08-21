import { createContext, useContext, useEffect, useState } from 'react';
import { getTenants } from '../services/tenantService';
import { useAuth } from '../../auth/context/AuthContext';

const TenantContext = createContext();

export const TenantProvider = ({ children }) => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const {token} = useAuth();

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const data = await getTenants(token);
        if (Array.isArray(data)) {
          setTenants(data);
        } else if (data) {
          // sometimes API might return object with property
          setTenants([data]);
        }
      } catch (err) {
        console.error('Failed to fetch tenants', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTenants();
  }, []);

  const getTenantByKey = (tenantKey) =>
    tenants.find(
      (t) =>
        t.id === tenantKey ||
        t.schemaName === tenantKey ||
        t.username === tenantKey
    );

  return (
    <TenantContext.Provider value={{ tenants, getTenantByKey, loading }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenants = () => useContext(TenantContext);
