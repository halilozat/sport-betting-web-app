// src/pages/HomePage.tsx
import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion'; // motion'ı import et
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchBulletinOdds } from '../store/bulletin/bulletinSlice';
import MatchCard from '../components/ui/MatchCard';
import { useDebounce } from '../hooks/useDebounce';

// Animasyon varyantlarını (animasyonun başlangıç ve bitiş durumları) tanımlayalım
const containerVariants = {
  hidden: { opacity: 1 }, // Başlangıçta görünmez olmasına gerek yok, sadece çocukları yönetiyoruz
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Her bir çocuk elemanın 0.1 saniye arayla animasyona başlamasını sağla
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 }, // Başlangıçta 20px aşağıda ve görünmez
  visible: { y: 0, opacity: 1 }, // Bitişte kendi pozisyonunda ve görünür
};


const HomePage = () => {
  const dispatch = useAppDispatch();
  const { matches, loading, error } = useAppSelector((state) => state.bulletin);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

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
      <input
        type="text"
        placeholder="Takım ara..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Maç listesini `motion.div` ile sarmala ve varyantları uygula */}
      <motion.div
        className="matches-list"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match) => (
            // Her bir MatchCard'ı da motion.div ile sarmala
            <motion.div key={match.id} variants={itemVariants}>
              <MatchCard match={match} />
            </motion.div>
          ))
        ) : (
          <p>Arama kriterlerinize uygun maç bulunamadı.</p>
        )}
      </motion.div>
    </div>
  );
};

export default HomePage;