interface OrderTimelineProps {
  currentStatus: string;
}

const statuses = [
  "Pending Payment",
  "Payment Verified",
  "Sourcing",
  "Order Filled",
  "In Transit",
  "Arrived Ethiopia",
  "Ready for Pickup",
  "Delivered",
];

const statusMap: Record<string, string> = {
  pending_payment: "Pending Payment",
  payment_verified: "Payment Verified",
  sourcing: "Sourcing",
  order_filled: "Order Filled",
  in_transit: "In Transit",
  arrived_ethiopia: "Arrived Ethiopia",
  ready_for_pickup: "Ready for Pickup",
  delivered: "Delivered",
};

export default function OrderTimeline({
  currentStatus,
}: OrderTimelineProps) {
  const normalizedStatus =
    statusMap[currentStatus] || "";

  const currentIndex =
    statuses.indexOf(normalizedStatus);

  return (
    <div className="order-timeline">
      {statuses.map((status, index) => {
        const completed =
          index < currentIndex;

        const active =
          index === currentIndex;

        return (
          <div
            key={status}
            className="timeline-item"
          >
            <div
              className={`timeline-indicator
                ${completed ? "completed" : ""}
                ${active ? "active" : ""}
              `}
            />

            <div className="timeline-content">
              <p>{status}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}