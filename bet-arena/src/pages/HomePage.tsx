// src/pages/HomePage.tsx
import { useEffect, useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchBulletinOdds } from '../store/bulletin/bulletinSlice';
import MatchCard from '../components/ui/MatchCard';
import { useDebounce } from '../hooks/useDebounce'; // Yeni hook'umuzu import et

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { matches, loading, error } = useAppSelector((state) => state.bulletin);

  // 1. Arama metni için local state
  const [searchTerm, setSearchTerm] = useState('');

  // 2. Arama metninin geciktirilmiş (debounced) halini al
  const debouncedSearchTerm = useDebounce(searchTerm, 300); // 300ms gecikme

  useEffect(() => {
    if (loading === 'idle') {
      dispatch(fetchBulletinOdds());
    }
  }, [loading, dispatch]);

  // 3. Filtreleme işlemini useMemo ile optimize et
  const filteredMatches = useMemo(() => {
    if (!debouncedSearchTerm) {
      return matches; // Arama metni yoksa tüm maçları döndür
    }
    return matches.filter((match) =>
      // Ev sahibi veya deplasman takımı adında arama metni geçiyor mu kontrol et (küçük/büyük harf duyarsız)
      match.home_team.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      match.away_team.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [matches, debouncedSearchTerm]); // Sadece maçlar veya arama metni değiştiğinde yeniden çalışır

  if (loading === 'pending') {
    return <div>Yükleniyor...</div>;
  }

  if (loading === 'failed') {
    return <div>Hata: {error}</div>;
  }

  return (
    <div>
      <h1>Bahis Bülteni</h1>

      {/* 4. Arama kutusunu ekle */}
      <input
        type="text"
        placeholder="Takım ara..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div>
        {/* 5. Ekrana filtrelenmiş maçları bas */}
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match) => <MatchCard key={match.id} match={match} />)
        ) : (
          <p>Arama kriterlerinize uygun maç bulunamadı.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;