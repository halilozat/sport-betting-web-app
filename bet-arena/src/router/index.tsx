// src/router/index.tsx
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import PublicRoutes from './PublicRoutes';
import ProtectedRoutes from './ProtectedRoutes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        element: <ProtectedRoutes />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
        ]
      }
    ]
  },
  {
    element: <PublicRoutes />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);