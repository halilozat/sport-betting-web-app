// src/components/features/basket/BetBasket.tsx
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { removeSelection, clearBasket } from '../../../store/basket/basketSlice';
import { trackRemoveFromCart } from '../../../api/analyticsService';
import type { Selection } from '../../../store/basket/types';
import { motion, AnimatePresence } from 'framer-motion'; // AnimatePresence'ı da import et

const BetBasket = () => {
  const dispatch = useAppDispatch();
  const { selections } = useAppSelector((state) => state.basket);

  // Toplam oranı hesapla: tüm oranları birbiriyle çarp
  const totalOdds = selections.reduce((accumulator, current) => {
    return accumulator * current.outcomePrice;
  }, 1);

  const handleRemove = (selection: Selection) => {
    trackRemoveFromCart(selection);
    dispatch(removeSelection({ matchId: selection.matchId }));
  };

  return (
    <aside className="bet-basket">
      <h2>Bahis Sepeti</h2>
      {selections.length === 0 ? (
        <p>Sepetiniz boş.</p>
      ) : (
        <>
          <ul className="basket-list">
            <AnimatePresence>
              {selections.map((selection) => (
                <motion.li
                  key={selection.matchId}
                  layout
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50, transition: {duration: 0.2} }}
                >
                  <div className="selection-info">
                    <span>{selection.matchHomeTeam} - {selection.matchAwayTeam}</span>
                    <strong>Tahmin: {selection.outcomeName}</strong>
                  </div>
                  <div className="selection-details">
                    <span>Oran: {selection.outcomePrice}</span>
                    <button
                      onClick={() => handleRemove(selection)}
                      className="remove-btn"
                    >
                      ×
                    </button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          <div className="basket-summary">
            <p>Toplam Maç: {selections.length}</p>
            <h3>Toplam Oran: {totalOdds.toFixed(2)}</h3>
            <button onClick={() => dispatch(clearBasket())} className="clear-btn">
              Sepeti Temizle
            </button>
          </div>
        </>
      )}
    </aside>
  );
};

export default BetBasket;