// src/store/user/types.ts

// Giriş yapmış bir kullanıcıyı temsil eden veri yapısı
export type User = {
  uid: string;
  email: string | null;
};

// User slice'ının state yapısı
export type UserState = {
  user: User | null;
  loading: 'idle' | 'pending';
  error: string | null;
  authReady: boolean; // Bu yeni durumu ekle
};