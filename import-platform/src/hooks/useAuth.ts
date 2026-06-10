"use client";

import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  User,
  signOut,
} from "firebase/auth";

import { auth, db } from "@/lib/firebase/config";
import { doc, getDoc } from "firebase/firestore";

type AppUser = {
  uid: string;
  email: string | null;
  fullName?: string;
  phone?: string;
  role?: string;
};

export function useAuth() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser: User | null) => {
        if (!firebaseUser) {
          setUser(null);
          setLoading(false);
          return;
        }

        // Get Firestore profile
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            ...userSnap.data(),
          } as AppUser);
        } else {
          // fallback if Firestore doc missing
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
          });
        }

        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return {
    user,
    loading,
    logout,
    isAuthenticated: !!user,
  };
}