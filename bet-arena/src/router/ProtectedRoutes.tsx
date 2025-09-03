// src/router/ProtectedRoutes.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

const ProtectedRoutes = () => {
  const { user, authReady } = useAppSelector((state) => state.user);

  if (!authReady) {
    return <div>Yükleniyor...</div>; // veya null
  }

  // Eğer kontrol bittiyse ve kullanıcı GİRİŞ YAPMAMIŞSA, login sayfasına yönlendir
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Eğer kullanıcı giriş yapmışsa, altındaki rotanın (örn: ProfilePage) render edilmesine izin ver
  return <Outlet />;
};

export default ProtectedRoutes;