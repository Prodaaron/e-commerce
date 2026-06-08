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
          <Link href="/orders">Orders</Link>
          <Link href="/profile">Profile</Link>
        </div>
      </div>
    </nav>
  );
}