import "@/styles/orders.css";
import Link from "next/link";

export default function OrdersPage() {
  const orders = [
    {
      id: "1001",
      productName: "Dior Sauvage 100ml",
      status: "In Transit",
      expectedDelivery: "June 20, 2026",
    },
    {
      id: "1002",
      productName: "Women's Fashion Bag",
      status: "Payment Verified",
      expectedDelivery: "June 28, 2026",
    },
  ];

  return (
    <div className="container section">
      <h1 className="page-title">My Orders</h1>

      <div className="orders-list">
        {orders.map((order) => (
          <div
            key={order.id}
            className="order-card"
          >
            <div className="order-card-header">
              <h3>Order #{order.id}</h3>

              <span className="order-status">
                {order.status}
              </span>
            </div>

            <p className="order-product">
              {order.productName}
            </p>

            <p className="order-delivery">
              Expected Delivery: {order.expectedDelivery}
            </p>

            <Link
              href={`/orders/${order.id}`}
              className="order-link"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}