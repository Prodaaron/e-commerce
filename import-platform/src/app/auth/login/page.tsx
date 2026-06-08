import Link from "next/link";
import "@/styles/auth.css";

export default function LoginPage() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">
          Welcome Back
        </h1>

        <p className="auth-subtitle">
          Sign in to your account.
        </p>

        <form className="auth-form">
          <div className="auth-group">
            <label>Email</label>

            <input
              type="email"
              className="auth-input"
              placeholder="Enter your email"
            />
          </div>

          <div className="auth-group">
            <label>Password</label>

            <input
              type="password"
              className="auth-input"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="auth-button"
          >
            Login
          </button>
        </form>

        <div className="auth-divider">
          OR
        </div>

        <button className="auth-google">
          Continue with Google
        </button>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link
            href="/auth/register"
            className="auth-link"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}