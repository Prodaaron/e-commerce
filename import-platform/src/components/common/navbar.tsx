import Link from "next/link";
import "@/styles/navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <div className="logo">
          ImportHub
        </div>

        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/about">About</Link>
          <Link href="/contacts">Contacts</Link>
        </div>

        <div className="nav-actions">
          <Link href="/cart">Cart</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/profile">Profile</Link>
        </div>

        <div className="nav-auth">
          <Link href="/auth/login">Login</Link>
          <Link href="/auth/register">Register</Link>
        </div>
      </div>
    </nav>
  );
}