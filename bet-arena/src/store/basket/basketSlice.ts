// src/store/basket/basketSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { BasketState, Selection } from './types';

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

      // Kural 1: Aynı maça ait bir bahis zaten varsa...
      if (existingSelectionIndex !== -1) {
        // ...ve tıklanan bahis, seçili olanla aynıysa, onu sepetten kaldır (toggle).
        if (state.selections[existingSelectionIndex].outcomeName === newSelection.outcomeName) {
          state.selections.splice(existingSelectionIndex, 1);
        } else {
          // ...ama tıklanan bahis farklıysa, o maç için yapılmış seçimi yenisiyle güncelle.
          state.selections[existingSelectionIndex] = newSelection;
        }
      } else {
        // Kural 2: Maça ait bahis yoksa, direkt sepete ekle.
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