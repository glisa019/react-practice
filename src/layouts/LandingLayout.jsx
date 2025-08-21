import { Outlet } from 'react-router-dom';
import LandingToolbar from '../shared/components/toolbars/LandingToolbar';
import Footer from '../shared/components/Footer';

const LandingLayout = ({ children }) => {
  return (
    <div className="h-full">
      <LandingToolbar />
      <main>
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
};

export default LandingLayout;