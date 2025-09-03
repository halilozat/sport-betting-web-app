// src/pages/NotFoundPage.tsx
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div>
      <h1>404 - Sayfa Bulunamadı</h1>
      <p>Aradığınız sayfa mevcut değil.</p>
      <Link to="/">Ana Sayfa'ya Dön</Link>
    </div>
  )
}

export default NotFoundPage