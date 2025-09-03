// src/pages/RegisterPage.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../api/authService';
import { useAppDispatch } from '../store/hooks';
import { setUser, setAuthError } from '../store/user/userSlice';

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    try {
      const userCredential = await signUp(email, password);
      const newUser = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      };
      dispatch(setUser(newUser));
      navigate('/'); // Başarılı kayıtta anasayfaya yönlendir
    } catch (err: any) {
      setError(err.message);
      dispatch(setAuthError(err.message));
    }
  };

  return (
    <div className="form-container"> {/* Ana sarmalayıcıyı ekle */}
      <h2>Kayıt Ol</h2>
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
          placeholder="Şifre (en az 6 karakter)"
          required
        />
        {error && <p className="error-message">{error}</p>} {/* Hata mesajı için class ekle */}
        <button type="submit">Kayıt Ol</button>
      </form>
      <p className="form-footer"> {/* Footer için class ekle */}
        Zaten hesabın var mı? <Link to="/login">Giriş Yap</Link>
      </p>
    </div>
  );
};

export default RegisterPage;