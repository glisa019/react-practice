import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import LandingLayout from '../layouts/LandingLayout';
import TenantShell from '../features/tenant/pages/tenant-shell/TenantShell';
import TenantForm from '../features/tenant/pages/tenant-form/TenantForm';
import TenantList from '../features/tenant/pages/tenant-list/TenantList';
import TenantView from '../features/tenant/pages/tenant-view/TenantView';
import TenantViewShell from '../features/tenant/pages/tenant-view/TenantViewShell';
import TenantSettings from '../features/tenant/pages/tenant-settings/TenantSettings';
import LoadingSpinner from '../shared/components/LoadingSpinner';
import LandingPage from '../shared/components/landing-pages/LandingPage';
import EmployeesList from '../features/tenant/pages/tenant-list/employees-list/EmployeesList';
import EmployeeServicesList from '../features/tenant/pages/tenant-list/employee-services-list/EmployeeServicesList';
import EmployeeCalendar from '../features/tenant/pages/tenant-list/employee-calendar/EmployeeCalendar';
import BookingSuccess from '../features/tenant/pages/tenant-list/booking-success/BookingSuccess';
import ProfileShell from '../features/profile/profile-shell/ProfileShell';
import ProfileGeneralDetails from '../features/profile/profile-general-details/ProfileGeneralDetails';
import ProfileAvailabilityList from '../features/profile/profile-employee-availability/ProfileEmployeeAvailability';
import ProfileReservationList from '../features/profile/profile-reservation-list/ProfileReservationList';
import ProfileSettings from '../features/profile/profile-settings/ProfileSettings';
import TenantSettingsServices from '../features/tenant/pages/tenant-settings/TenantSettingsServices';
import TenantSettingsEmployees from '../features/tenant/pages/tenant-settings/TenantSettingsEmployees';
import TenantSettingsGeneralDetails from '../features/tenant/pages/tenant-settings/TenantSettingsGeneralDetails';

const Login = lazy(() => import('../features/auth/pages/Login'));
const Register = lazy(() => import('../features/auth/pages/Register'));
const SetPassword = lazy(() => import('../features/auth/pages/SetPassword'));
const ResetPassword = lazy(() => import('../features/auth/pages/ResetPassword'));
const EmployeeAvailability = lazy(() => import('../features/auth/pages/EmployeeAvailability'));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<LandingLayout />}>
            <Route path="/" element={<LandingPage />} />
          </Route>


                <Route element={<MainLayout />}>
                            <Route path="/tenant" element={<TenantShell />}>
                              <Route path="form" element={<TenantForm />} />
                              <Route path="list" element={<TenantList />} />
                              {/* Tenant View */}
                              <Route path=":tenantKey" element={<TenantViewShell />}>
                              {/* <Route path="login" element={<Login />} />
                              <Route path="register" element={<Register />} />
                              <Route path="reset-password" element={<ResetPassword />} /> */}
                              <Route path="employee-availability" element={<EmployeeAvailability />} />
                              <Route path="view" element={<TenantView />} />
                              <Route path="settings" element={<TenantSettings />} >
                                <Route path="general-details" element={<TenantSettingsGeneralDetails />} />
                                <Route path="employees" element={<TenantSettingsEmployees />} />
                                <Route path="services" element={<TenantSettingsServices />} />
                              </Route>
                              <Route path="employees-list" element={<EmployeesList />} />
                              <Route path="employee/:employeeId/services-list" element={<EmployeeServicesList />} />
                                <Route path="employee/:employeeId/service/:serviceId/calendar" element={<EmployeeCalendar />} />
                                <Route path="employee/:employeeId/service/:serviceId/success" element={<BookingSuccess />} />

                              {/* Profile */}
                              <Route path="profile/:profileId" element={<ProfileShell />}>
                                <Route path="general-details" element={<ProfileGeneralDetails />} />
                                <Route path="employee-availability" element={<ProfileAvailabilityList />} />
                                <Route path="reservations" element={<ProfileReservationList />} />
                                <Route path="settings" element={<ProfileSettings />} />
                              </Route>
                              </Route>
                            </Route>
                            </Route>

          {/* Login withoutMainLayout based on tenanKey */}
          <Route path="/tenant/:tenantKey/login" element={<Login />} />
          <Route path="/tenant/:tenantKey/register" element={<Register />} />
          <Route path="/tenant/:tenantKey/reset-password" element={<ResetPassword />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/set-password" element={<SetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/employee-availability" element={<EmployeeAvailability />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;