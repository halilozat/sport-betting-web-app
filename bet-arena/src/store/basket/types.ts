// src/store/basket/types.ts

// Sepete eklenen tek bir bahsi temsil eder
export type Selection = {
  matchId: string;
  matchHomeTeam: string;
  matchAwayTeam:string;
  marketKey: string;
  outcomeName: string; // Bahis yapılan taraf (Örn: 'Arsenal', 'Draw')
  outcomePrice: number; // Bahsin oranı
};

// Sepet slice'ının state yapısını tanımlar
export type BasketState = {
  selections: Selection[];
};