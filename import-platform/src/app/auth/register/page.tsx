import Link from "next/link";
import "@/styles/auth.css";

export default function RegisterPage() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">
          Create Account
        </h1>

        <p className="auth-subtitle">
          Start shopping with confidence.
        </p>

        <form className="auth-form">
          <div className="auth-group">
            <label>Full Name</label>

            <input
              type="text"
              className="auth-input"
              placeholder="Enter your name"
            />
          </div>

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
              placeholder="Create a password"
            />
          </div>

          <div className="auth-group">
            <label>Confirm Password</label>

            <input
              type="password"
              className="auth-input"
              placeholder="Confirm password"
            />
          </div>

          <button
            type="submit"
            className="auth-button"
          >
            Create Account
          </button>
        </form>

        <div className="auth-divider">
          OR
        </div>

        <button className="auth-google">
          Continue with Google
        </button>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="auth-link"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}