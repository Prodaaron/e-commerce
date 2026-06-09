import "@/styles/admin.css";

export default async function AdminOrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <div className="admin-page-header">
        <h1>Order #{id}</h1>
      </div>

      <div className="admin-card">
        <h3>Customer Information</h3>

        <p>Name: Aron Mesfin</p>

        <p>Email: aron@example.com</p>
      </div>

      <div className="admin-card">
        <h3>Product</h3>

        <p>Dior Sauvage 100ml</p>
      </div>

      <div className="admin-card">
        <h3>Update Status</h3>

        <select className="admin-select">
          <option>Pending Payment</option>
          <option>Payment Verified</option>
          <option>Sourcing</option>
          <option>Order Filled</option>
          <option>In Transit</option>
          <option>Arrived Ethiopia</option>
          <option>Ready for Pickup</option>
          <option>Delivered</option>
          <option>Cancelled</option>
          <option>Refunded</option>
        </select>

        <button className="admin-primary-button">
          Save Status
        </button>
      </div>
    </>
  );
}