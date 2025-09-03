// src/router/PublicRoutes.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

const PublicRoutes = () => {
  const { user, authReady } = useAppSelector((state) => state.user);

  if (!authReady) {
    return <div>Yükleniyor...</div>;
  }

  if (user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PublicRoutes;