import { Outlet } from 'react-router-dom';
import MainToolbar from '../shared/components/toolbars/MainToolbar';

const MainLayout = ({ children }) => {
  // const { user } = useAuth();

  // if (!user) return null;

  return (
    <div>
      <MainToolbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;