// src/router/PublicRoutes.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

const PublicRoutes = () => {
  // Redux store'dan kullanıcı ve authReady durumunu al
  const { user, authReady } = useAppSelector((state) => state.user);

  // Eğer Firebase'in ilk kontrolü henüz bitmediyse, bir şey gösterme
  // Bu, sayfa yenilendiğinde anasayfaya erken yönlendirmeyi önler
  if (!authReady) {
    return <div>Yükleniyor...</div>; // veya null
  }

  // Eğer kontrol bittiyse ve kullanıcı giriş yapmışsa, anasayfaya yönlendir
  if (user) {
    return <Navigate to="/" />;
  }

  // Eğer kullanıcı giriş yapmamışsa, altındaki rotanın (örn: LoginPage) render edilmesine izin ver
  return <Outlet />;
};

export default PublicRoutes;