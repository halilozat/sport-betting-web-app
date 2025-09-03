// src/router/index.tsx
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import PublicRoutes from './PublicRoutes';
import ProtectedRoutes from './ProtectedRoutes'; // ProtectedRoutes'ı import ettiğinden emin ol

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, // MainLayout hala ana iskeletimiz
    children: [
      {
        // Bu sarmalayıcı, altındaki tüm rotaların sadece giriş yapmış
        // kullanıcılar tarafından görülmesini sağlar.
        element: <ProtectedRoutes />,
        children: [
          {
            index: true, // Anasayfa ('/') artık korumalı
            element: <HomePage />,
          },
          // Gelecekte eklenecek "Profilim", "Bahislerim" gibi diğer korumalı
          // sayfalar da buraya, ProtectedRoutes'un altına gelecek.
          // { path: 'profile', element: <ProfilePage /> }
        ]
      }
    ]
  },
  // Public rotalar (MainLayout dışında, kendi başlarına)
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