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

      if (existingSelectionIndex !== -1) {
        if (state.selections[existingSelectionIndex].outcomeName === newSelection.outcomeName) {
          state.selections.splice(existingSelectionIndex, 1);
        } else {
          state.selections[existingSelectionIndex] = newSelection;
        }
      } else {
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