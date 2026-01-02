import React, { useEffect } from 'react';
import { 
  createBrowserRouter, 
  RouterProvider, 
  Navigate, 
  Outlet 
} from 'react-router-dom';
import { NotificationsProvider } from '@/components/ui/notification-system';
import { TechSpinner } from '@/components/ui/loading-spinner';
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';
import HomePage from '@/pages/HomePage';
import DetectPage from '@/pages/DetectPage';
import VerifyPage from '@/pages/VerifyPage';
import AboutPage from '@/pages/AboutPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/ResetPasswordPage';
import DashboardPage from '@/pages/DashboardPage';
import ProfilePage from '@/pages/ProfilePage';
import SettingsPage from '@/pages/SettingsPage';
import useAuthStore from '@/stores/authStore';
import { Button } from '@/components/ui/button';

// Auth guard component for protected routes
const ProtectedRoute = ({ redirectPath = '/login' }) => {
  const { user } = useAuthStore();
  
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

const App = () => {
  const { user, isLoading, checkAuth } = useAuthStore();

  useEffect(() => {
    // Check if user is authenticated when the app loads
    checkAuth();
  }, [checkAuth]);

  // Create router with React Router v7
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "detect", element: <DetectPage /> },
        { path: "verify", element: <VerifyPage /> },
        { path: "about", element: <AboutPage /> }
      ]
    },
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { 
          path: "login", 
          element: user ? <Navigate to="/dashboard" replace /> : <LoginPage /> 
        },
        { 
          path: "register", 
          element: user ? <Navigate to="/dashboard" replace /> : <RegisterPage /> 
        },
        { path: "forgot-password", element: <ForgotPasswordPage /> },
        { path: "reset-password/:token", element: <ResetPasswordPage /> }
      ]
    },
    {
      path: "/",
      element: <ProtectedRoute redirectPath="/login" />,
      children: [
        {
          path: "/",
          element: <MainLayout />,
          children: [
            { path: "dashboard", element: <DashboardPage /> },
            { path: "profile", element: <ProfilePage /> },
            { path: "settings", element: <SettingsPage /> }
            // Add more protected routes here
          ]
        }
      ]
    },
    {
      path: "*",
      element: <MainLayout />,
      children: [
        {
          path: "*",
          element: (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
              <h1 className="text-4xl font-bold mb-4 tech-gradient-text">404</h1>
              <p className="text-xl text-muted-foreground mb-6">Page not found</p>
              <Button 
                variant="tech" 
                onClick={() => window.history.back()}
              >
                Go Back
              </Button>
            </div>
          )
        }
      ]
    }
  ]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
        <div className="flex flex-col items-center">
          <TechSpinner size="xl" />
          <p className="mt-4 text-blue-600 dark:text-blue-400 animate-pulse">Loading RealShield...</p>
        </div>
      </div>
    );
  }

  return (
    <NotificationsProvider>
      <RouterProvider router={router} />
    </NotificationsProvider>
  );
};

export default App;
