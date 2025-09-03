// src/components/layout/MainLayout.tsx
import { Outlet } from 'react-router-dom';
import BetBasket from '../features/basket/BetBasket';
import Header from './Header';
import Footer from './Footer';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useAppDispatch } from '../../store/hooks';
import { setUser, setAuthReady } from '../../store/user/userSlice';
import { useEffect } from 'react'

const MainLayout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // onAuthStateChanged, Firebase oturum durumundaki her değişikliği dinler
    // ve bir "unsubscribe" fonksiyonu döndürür.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Eğer kullanıcı varsa (giriş yapmışsa), Redux'taki user state'ini güncelle
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
        }));
      }
      // Her durumda (kullanıcı olsun ya da olmasın), ilk kontrolün bittiğini
      // belirtmek için authReady state'ini true yap.
      dispatch(setAuthReady());
    });

    // Component DOM'dan kaldırıldığında (cleanup), dinleyiciyi sonlandır.
    // Bu, memory leak'leri (bellek sızıntılarını) önler.
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <div className="layout-container">
      <Header />
      <div className="main-content">
        <main>
          <Outlet />
        </main>
        <BetBasket />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;