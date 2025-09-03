// src/api/authService.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../lib/firebase"; // Firebase initialize dosyamızdan auth'u alıyoruz

// Kayıt olma fonksiyonu
export const signUp = async (email: string, password: string): Promise<any> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error: any) {
    // Firebase'den gelen hatayı daha anlaşılır bir mesaja çevirebiliriz
    throw new Error(error.message);
  }
};

// Giriş yapma fonksiyonu
export const signIn = async (email: string, password: string): Promise<any> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Çıkış yapma fonksiyonu
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
};