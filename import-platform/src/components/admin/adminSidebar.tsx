import Link from "next/link";

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <h2 className="admin-logo">
        Admin Panel
      </h2>

      <nav className="admin-nav">
        <Link href="/admin">
          Dashboard
        </Link>

        <Link href="/admin/products">
          Products
        </Link>

        <Link href="/admin/orders">
          Orders
        </Link>

        <Link href="/admin/payments">
          Payments
        </Link>

        <Link href="/admin/customers">
          Customers
        </Link>

        <Link href="/admin/settings">
          Settings
        </Link>
      </nav>
    </aside>
  );
}