import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const registerUser = (
  email: string,
  password: string
) => {
  return createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
};

export const loginUser = (
  email: string,
  password: string
) => {
  return signInWithEmailAndPassword(
    auth,
    email,
    password
  );
};

export const loginWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

export const logoutUser = () => {
  return signOut(auth);
};

export const resetPassword = (
  email: string
) => {
  return sendPasswordResetEmail(auth, email);
};