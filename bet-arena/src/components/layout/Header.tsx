// src/components/layout/Header.tsx
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { clearUser } from '../../store/user/userSlice';
import { signOutUser } from '../../api/authService';

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // user state'ine ek olarak authReady'yi de al
  const { user, authReady } = useAppSelector((state) => state.user);

  const handleLogout = async () => { /* ... */ };

  // Eğer Firebase'in ilk kontrolü henüz bitmediyse, hiçbir şey render etme (veya bir yüklenme animasyonu)
  if (!authReady) {
    return null;
  }

  return (
    <header className="main-header">
      <Link to="/" className="logo">
        <h1>BET ARENA</h1>
      </Link>
      <nav>
        {user ? (
          // Kullanıcı giriş yapmışsa gösterilecekler
          <>
            <span>{user.email}</span>
            <button onClick={handleLogout}>Çıkış Yap</button>
          </>
        ) : (
          // Kullanıcı giriş yapmamışsa gösterilecekler
          <>
            <Link to="/login">Giriş Yap</Link>
            <Link to="/register">Kayıt Ol</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;