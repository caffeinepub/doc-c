import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import AppLayout from './components/layout/AppLayout';
import DoctorRegisterPage from './pages/doctor/DoctorRegisterPage';
import DoctorLoginPage from './pages/doctor/DoctorLoginPage';
import DoctorDashboardPage from './pages/doctor/DoctorDashboardPage';
import HospitalRegisterPage from './pages/hospital/HospitalRegisterPage';
import HospitalDashboardPage from './pages/hospital/HospitalDashboardPage';
import HospitalAnalyticsPage from './pages/hospital/HospitalAnalyticsPage';
import HospitalSubscriptionPaymentsPage from './pages/hospital/HospitalSubscriptionPaymentsPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminDoctorsPage from './pages/admin/AdminDoctorsPage';
import AdminHospitalsPage from './pages/admin/AdminHospitalsPage';
import AdminSubscriptionsPage from './pages/admin/AdminSubscriptionsPage';
import AdminPaymentsPage from './pages/admin/AdminPaymentsPage';
import LandingPage from './pages/LandingPage';

const rootRoute = createRootRoute({
  component: AppLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const doctorRegisterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/doctor/register',
  component: DoctorRegisterPage,
});

const doctorLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/doctor/login',
  component: DoctorLoginPage,
});

const doctorDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/doctor/dashboard',
  component: DoctorDashboardPage,
});

const hospitalRegisterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/hospital/register',
  component: HospitalRegisterPage,
});

const hospitalDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/hospital/dashboard',
  component: HospitalDashboardPage,
});

const hospitalAnalyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/hospital/analytics',
  component: HospitalAnalyticsPage,
});

const hospitalSubscriptionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/hospital/subscription',
  component: HospitalSubscriptionPaymentsPage,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/dashboard',
  component: AdminDashboardPage,
});

const adminDoctorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/doctors',
  component: AdminDoctorsPage,
});

const adminHospitalsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/hospitals',
  component: AdminHospitalsPage,
});

const adminSubscriptionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/subscriptions',
  component: AdminSubscriptionsPage,
});

const adminPaymentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/payments',
  component: AdminPaymentsPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  doctorRegisterRoute,
  doctorLoginRoute,
  doctorDashboardRoute,
  hospitalRegisterRoute,
  hospitalDashboardRoute,
  hospitalAnalyticsRoute,
  hospitalSubscriptionRoute,
  adminDashboardRoute,
  adminDoctorsRoute,
  adminHospitalsRoute,
  adminSubscriptionsRoute,
  adminPaymentsRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
