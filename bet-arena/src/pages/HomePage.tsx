// src/pages/HomePage.tsx
import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchBulletinOdds } from '../store/bulletin/bulletinSlice';
import MatchCard from '../components/ui/MatchCard';
import { useDebounce } from '../hooks/useDebounce';

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
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

  const filteredMatches = useMemo(() => {
    if (!debouncedSearchTerm) {
      return matches;
    }
    return matches.filter((match) =>
      match.home_team.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      match.away_team.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [matches, debouncedSearchTerm]);

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

      <motion.div
        className="matches-list"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match) => (
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