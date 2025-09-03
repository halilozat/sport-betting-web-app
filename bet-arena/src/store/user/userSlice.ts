// src/store/user/userSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { User, UserState } from './types';

const initialState: UserState = {
  user: null,
  loading: 'idle',
  error: null,
  authReady: false, // Başlangıç değeri false olsun
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Auth işlemleri başladığında loading durumunu ayarlar
    setAuthLoading: (state) => {
      state.loading = 'pending';
      state.error = null;
    },
    // Kullanıcı başarıyla giriş/kayıt yaptığında state'i günceller
    setUser: (state, action: any) => {
      state.user = action.payload;
      state.loading = 'idle';
    },
    // Kullanıcı çıkış yaptığında veya oturum yoksa state'i temizler
    clearUser: (state) => {
      state.user = null;
      state.loading = 'idle';
    },
    // Auth işlemlerinde hata oluşursa error state'ini ayarlar
    setAuthError: (state, action: any) => {
      state.error = action.payload;
      state.loading = 'idle';
    },
    setAuthReady: (state) => {
      state.authReady = true;
    },
  },
});

export const { setAuthLoading, setUser, clearUser, setAuthError, setAuthReady } = userSlice.actions;

export default userSlice.reducer;