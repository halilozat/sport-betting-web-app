// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import bulletinReducer from './bulletin/bulletinSlice';
import basketReducer from './basket/basketSlice';
import userReducer from './user/userSlice'; // User reducer'ı import et

export const store = configureStore({
  reducer: {
    bulletin: bulletinReducer,
    basket: basketReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;