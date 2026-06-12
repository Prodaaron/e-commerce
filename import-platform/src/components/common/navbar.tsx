"use client";

import Link from "next/link";
import "@/styles/navbar.css";
import { SITE_NAME } from "@/constants/site";
import { useAuth } from "@/hooks/useAuth";
import CartIcon from "@/components/common/CartIcon";

export default function Navbar() {
  const { user, logout, loading } = useAuth();

  return (
    <nav className="navbar">
      <div className="container navbar-container">

        {/* Logo */}
        <div className="logo">
          <Link href="/">{SITE_NAME}</Link>
        </div>

        {/* Main Links */}
        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/about">About</Link>
          <Link href="/contacts">Contacts</Link>
        </div>

        {/* User Links */}
        <div className="nav-actions">
          <Link href="/cart">
            <CartIcon />
          </Link>
          <Link href="/orders">Orders</Link>
          <Link href="/profile">Profile</Link>
        </div>

        {/* Auth Section */}
        <div className="nav-auth">

          {loading ? (
            <span>Loading...</span>
          ) : user ? (
            <>
              <span className="nav-user">
                Hello, {user.fullName || user.email}
              </span>

              <button
                onClick={logout}
                className="nav-logout"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login">Login</Link>
              <Link href="/auth/register">Register</Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}