"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import "@/styles/auth.css";

import { registerUser, loginWithGoogle } from "@/lib/firebase/auth";
import { db } from "@/lib/firebase/config";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      // 1. Create auth user
      const userCredential = await registerUser(email, password);
      const user = userCredential.user;

      // 2. Save user in Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullName,
        email,
        phone,
        role: "customer", // FORCE ROLE
        createdAt: serverTimestamp(),
      });

      router.push("/");

    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  const handleGoogle = async () => {
    try {
      const result = await loginWithGoogle();
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        fullName: user.displayName || "",
        email: user.email,
        phone: "",
        role: "customer",
        createdAt: serverTimestamp(),
      });

      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1 className="auth-title">Create Account</h1>

        <p className="auth-subtitle">
          Start shopping with confidence.
        </p>

        {error && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {error}
          </p>
        )}

        <form className="auth-form" onSubmit={handleRegister}>

          <div className="auth-group">
            <label>Full Name</label>
            <input
              type="text"
              className="auth-input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="auth-group">
            <label>Email</label>
            <input
              type="email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-group">
            <label>Phone</label>
            <input
              type="text"
              className="auth-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="auth-group">
            <label>Password</label>
            <input
              type="password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="auth-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="auth-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <div className="auth-divider">OR</div>

        <button
          className="auth-google"
          onClick={handleGoogle}
          type="button"
        >
          Continue with Google
        </button>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link href="/auth/login" className="auth-link">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}