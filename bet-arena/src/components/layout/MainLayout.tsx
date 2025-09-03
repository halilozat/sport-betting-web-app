// src/components/layout/MainLayout.tsx
import { useEffect } from 'react'; // useEffect'i import et
import { Outlet } from 'react-router-dom';
import BetBasket from '../features/basket/BetBasket';
import Header from './Header';
import { onAuthStateChanged } from 'firebase/auth'; // Firebase'den onAuthStateChanged'ı import et
import { auth } from '../../lib/firebase'; // Firebase config'imizi import et
import { useAppDispatch } from '../../store/hooks'; // dispatch'i import et
import { setUser, setAuthReady } from '../../store/user/userSlice'; // action'ları import et

const MainLayout = () => {
  const dispatch = useAppDispatch();

  // Bu useEffect, component ilk render edildiğinde sadece bir kez çalışır
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
  }, [dispatch]); // dispatch bağımlılığını ekle

  return (
    // JSX kısmı aynı kalacak
    <div>
      <Header />
      <div className="main-content">
        <main>
          <Outlet />
        </main>
        <BetBasket />
      </div>
      <footer>Footer Alanı</footer>
    </div>
  );
};

export default MainLayout;