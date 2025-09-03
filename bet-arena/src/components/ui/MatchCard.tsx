// src/components/ui/MatchCard.tsx
import type { Match } from '../../store/bulletin/types'; // Selection'ı import etmeye gerek yok, alttaki daha iyi
import { toggleSelection } from '../../store/basket/basketSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { trackAddToCart, trackRemoveFromCart } from '../../api/analyticsService.ts'

interface MatchCardProps {
  match: Match;
}

const MatchCard = ({ match }: MatchCardProps) => {
  const dispatch = useAppDispatch();
  const { selections } = useAppSelector((state) => state.basket);

  // Bu karttaki maç için sepette bir seçim var mı kontrol et
  const currentSelection = selections.find(
    (selection) => selection.matchId === match.id
  );

  const bookmaker = match.bookmakers[0];
  const h2hMarket = bookmaker?.markets.find((m) => m.key === 'h2h');

  const outcomes = {
    home: h2hMarket?.outcomes.find((o) => o.name === match.home_team),
    away: h2hMarket?.outcomes.find((o) => o.name === match.away_team),
    draw: h2hMarket?.outcomes.find((o) => o.name === 'Draw'),
  };

  const handleToggleSelection = (outcomeName: string, outcomePrice: number) => {
    // Bu payload hem Redux'a hem Analytics'e gönderilecek
    const selectionPayload = {
      matchId: match.id,
      matchHomeTeam: match.home_team,
      matchAwayTeam: match.away_team,
      marketKey: 'h2h',
      outcomeName: outcomeName,
      outcomePrice: outcomePrice,
    };

    // Kullanıcının tıkladığı oran zaten sepette mi?
    const isAlreadySelected = currentSelection && currentSelection.outcomeName === outcomeName;

    // Duruma göre ilgili analitik olayını gönder
    if (isAlreadySelected) {
      // Eğer zaten seçiliyse ve tekrar tıklandıysa, bu bir "sepetten çıkarma" eylemidir
      trackRemoveFromCart(selectionPayload);
    } else {
      // Eğer seçili değilse, bu bir "sepete ekleme" eylemidir
      trackAddToCart(selectionPayload);
    }

    // Son olarak Redux state'ini güncelle
    dispatch(toggleSelection(selectionPayload));
  };
  return (
    <div className="match-card">
      <div className="match-info">
        <span>{new Date(match.commence_time).toLocaleString()}</span>
        <h3>
          {match.home_team} vs {match.away_team}
        </h3>
      </div>
      <div className="odds">
        {outcomes.home && (
          <button
            className={currentSelection?.outcomeName === outcomes.home.name ? 'selected' : ''}
            onClick={() => handleToggleSelection(outcomes.home!.name, outcomes.home!.price)}
          >
            1: {outcomes.home.price}
          </button>
        )}
        {outcomes.draw && (
          <button
            className={currentSelection?.outcomeName === outcomes.draw.name ? 'selected' : ''}
            onClick={() => handleToggleSelection(outcomes.draw!.name, outcomes.draw!.price)}
          >
            X: {outcomes.draw.price}
          </button>
        )}
        {outcomes.away && (
          <button
            className={currentSelection?.outcomeName === outcomes.away.name ? 'selected' : ''}
            onClick={() => handleToggleSelection(outcomes.away!.name, outcomes.away!.price)}
          >
            2: {outcomes.away.price}
          </button>
        )}
      </div>
    </div>
  );
};

export default MatchCard;