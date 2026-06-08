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

export default function OrderTimeline({
  currentStatus,
}: OrderTimelineProps) {
  const currentIndex =
    statuses.indexOf(currentStatus);

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