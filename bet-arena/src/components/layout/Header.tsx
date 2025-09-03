// src/components/layout/Header.tsx
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { clearUser } from '../../store/user/userSlice';
import { signOutUser } from '../../api/authService';

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, authReady } = useAppSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      await signOutUser();
      dispatch(clearUser());
      navigate('/login');
    } catch (error) {
      console.error("Çıkış yaparken hata:", error);
    }
  };

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
          <>
            <span>{user.email}</span>
            <button onClick={handleLogout}>Çıkış Yap</button>
          </>
        ) : (
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