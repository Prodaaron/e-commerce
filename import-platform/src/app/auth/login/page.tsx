"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import "@/styles/auth.css";

import {
  loginUser,
  loginWithGoogle,
} from "@/lib/firebase/auth";

import { getFirebaseAuthErrorMessage } from "@/lib/firebase/authErrors";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      await loginUser(email, password);

      router.push("/");

    } catch (err: any) {
      setError(getFirebaseAuthErrorMessage(err));
    }

    setLoading(false);
  };

  const handleGoogle = async () => {
    try {
      setLoading(true);

      await loginWithGoogle();

      router.push("/");

    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1 className="auth-title">Welcome Back</h1>

        <p className="auth-subtitle">
          Login to continue shopping.
        </p>

        

        <form className="auth-form" onSubmit={handleLogin}>

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
            <label>Password</label>
            <input
              type="password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p style={{ color: "red", fontSize: "14px" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
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
          Don't have an account?{" "}
          <Link href="/auth/register" className="auth-link">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}