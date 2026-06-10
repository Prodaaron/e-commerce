import OrderTimeline from "@/components/orders/OrderTimeline";
import "@/styles/orders.css";
import ProtectedRoute from "@/components/common/ProtectedRoute";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = {
    id,
    productName: "Dior Sauvage 100ml",
    status: "In Transit",
    estimatedDelivery: "June 20, 2026",
  };

  return (
    <ProtectedRoute>
      <div className="container section">
        <h1>Order #{order.id}</h1>

        <p>{order.productName}</p>

        <p>
          Estimated Delivery:
          {" "}
          {order.estimatedDelivery}
        </p>

        <OrderTimeline
          currentStatus={order.status}
        />
      </div>
    </ProtectedRoute>
  );
}