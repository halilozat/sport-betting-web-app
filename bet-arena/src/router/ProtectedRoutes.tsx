// src/router/ProtectedRoutes.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

const ProtectedRoutes = () => {
  const { user, authReady } = useAppSelector((state) => state.user);

  if (!authReady) {
    return <div>Yükleniyor...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;