// src/api/analyticsService.ts
import { analytics } from "../lib/firebase";
import { logEvent } from "firebase/analytics";
import type { Selection } from "../store/basket/types";

// Firebase'in önerdiği standart e-ticaret olaylarını kullanacağız.

/**
 * Bir bahis sepete eklendiğinde veya detayları görüntülendiğinde bu olayı tetikler.
 * @param selection Sepete eklenen bahis bilgisi
 */
export const trackAddToCart = (selection: Selection) => {
  if (!analytics) return;

  logEvent(analytics, 'add_to_cart', {
    currency: 'TRY', // Para birimi (isteğe bağlı)
    value: selection.outcomePrice, // Bahsin değeri/oranı
    items: [
      {
        item_id: selection.matchId,
        item_name: `${selection.matchHomeTeam} vs ${selection.matchAwayTeam}`,
        item_category: 'Match Odds',
        price: selection.outcomePrice,
        quantity: 1
      }
    ]
  });
};

/**
 * Bir bahis sepetten çıkarıldığında bu olayı tetikler.
 * @param selection Sepetten çıkarılan bahis bilgisi
 */
export const trackRemoveFromCart = (selection: Selection) => {
  if (!analytics) return;

  logEvent(analytics, 'remove_from_cart', {
    currency: 'TRY',
    value: selection.outcomePrice,
    items: [
      {
        item_id: selection.matchId,
        item_name: `${selection.matchHomeTeam} vs ${selection.matchAwayTeam}`,
        item_category: 'Match Odds',
        price: selection.outcomePrice,
        quantity: 1
      }
    ]
  });
};