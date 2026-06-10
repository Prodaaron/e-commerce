import Link from "next/link";
import "@/styles/admin.css";
import AdminRoute from "@/components/common/AdminRoute";


export default function AdminOrdersPage() {
  const orders = [
    {
      id: "1001",
      customer: "Aron Mesfin",
      product: "Dior Sauvage 100ml",
      status: "In Transit",
    },
    {
      id: "1002",
      customer: "John Doe",
      product: "Women's Fashion Bag",
      status: "Payment Verified",
    },
    {
      id: "1003",
      customer: "Jane Smith",
      product: "Nike Air Force 1",
      status: "Sourcing",
    },
  ];

  return (
    <AdminRoute>
      <>
        <div className="admin-page-header">
          <h1>Orders</h1>
        </div>

        <div className="admin-table">
          <div className="admin-table-head admin-orders-grid">
            <span>Order ID</span>
            <span>Customer</span>
            <span>Product</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          {orders.map((order) => (
            <div
              key={order.id}
              className="admin-table-row admin-orders-grid"
            >
              <span>#{order.id}</span>

              <span>{order.customer}</span>

              <span>{order.product}</span>

              <span>
                <span className="status-badge">
                  {order.status}
                </span>
              </span>

              <Link
                href={`/admin/orders/${order.id}`}
                className="admin-secondary-button"
              >
                View
              </Link>
            </div>
          ))}
        </div>
      </>
    </AdminRoute>
  );
}