// src/components/features/basket/BetBasket.tsx
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { removeSelection, clearBasket } from '../../../store/basket/basketSlice';

const BetBasket = () => {
  const dispatch = useAppDispatch();
  const { selections } = useAppSelector((state) => state.basket);

  // Toplam oranı hesapla: tüm oranları birbiriyle çarp
  const totalOdds = selections.reduce((accumulator, current) => {
    return accumulator * current.outcomePrice;
  }, 1);

  return (
    <aside className="bet-basket">
      <h2>Bahis Sepeti</h2>
      {selections.length === 0 ? (
        <p>Sepetiniz boş.</p>
      ) : (
        <>
          <ul className="basket-list">
            {selections.map((selection) => (
              <li key={selection.matchId}>
                <div className="selection-info">
                  <span>{selection.matchHomeTeam} - {selection.matchAwayTeam}</span>
                  <strong>Tahmin: {selection.outcomeName}</strong>
                </div>
                <div className="selection-details">
                  <span>Oran: {selection.outcomePrice}</span>
                  <button
                    onClick={() => dispatch(removeSelection({ matchId: selection.matchId }))}
                    className="remove-btn"
                  >
                    ×
                  </button>
                </div>
              </li>
            ))}
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