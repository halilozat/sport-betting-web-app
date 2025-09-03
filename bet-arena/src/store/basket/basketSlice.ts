// src/store/basket/basketSlice.ts
import type { BasketState, Selection } from './types.ts';
import { createSlice } from '@reduxjs/toolkit'

const initialState: BasketState = {
  selections: [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    // Sepete bir seçim ekler veya günceller
    toggleSelection: (state, action: any) => {
      const newSelection = action.payload;
      const existingSelectionIndex = state.selections.findIndex(
        (selection) => selection.matchId === newSelection.matchId
      );

      // 1. Kural: Aynı maça ait farklı bir bahis zaten varsa, onu yenisiyle değiştir.
      if (existingSelectionIndex !== -1) {
        // Eğer tıklanan bahis zaten seçili olanla aynıysa, onu kaldır (toggle).
        if (state.selections[existingSelectionIndex].outcomeName === newSelection.outcomeName) {
          state.selections.splice(existingSelectionIndex, 1);
        } else {
          // Değilse, o maç için yapılmış seçimi yenisiyle güncelle.
          state.selections[existingSelectionIndex] = newSelection;
        }
      } else {
        // 2. Kural: Maça ait bahis yoksa, direkt ekle.
        state.selections.push(newSelection);
      }
    },
    // Belirli bir seçimi sepetten kaldırır
    removeSelection: (state, action: any) => {
      state.selections = state.selections.filter(
        (selection) => selection.matchId !== action.payload.matchId
      );
    },
    // Sepeti tamamen temizler
    clearBasket: (state) => {
      state.selections = [];
    },
  },
});

export const { toggleSelection, removeSelection, clearBasket } = basketSlice.actions;

export default basketSlice.reducer;