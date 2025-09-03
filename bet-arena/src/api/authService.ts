// src/api/authService.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../lib/firebase";

// vite firebaseden gelen type'ı tanıyamadığı için any kullandım
export const signUp = async (email: string, password: string): Promise<any> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// vite firebaseden gelen type'ı tanıyamadığı için any kullandım
export const signIn = async (email: string, password: string): Promise<any> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
};