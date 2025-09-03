// src/pages/LoginPage.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from '../api/authService';
import { useAppDispatch } from '../store/hooks';
import { setUser, setAuthError } from '../store/user/userSlice';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    try {
      const userCredential = await signIn(email, password);
      const loggedInUser = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      };
      dispatch(setUser(loggedInUser));
      navigate('/');
    } catch (err: any) {
      setError(err.message);
      dispatch(setAuthError(err.message));
    }
  };

  return (
    <div className="form-container">
      <h2>Giriş Yap</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-posta"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Şifre"
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Giriş Yap</button>
      </form>
      <p className="form-footer">
        Hesabın yok mu? <Link to="/register">Kayıt Ol</Link>
      </p>
    </div>
  );
};

export default LoginPage;