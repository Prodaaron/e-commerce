export type OrderStatus =
  | "pending_payment"
  | "payment_verified"
  | "sourcing"
  | "order_filled"
  | "in_transit"
  | "arrived_ethiopia"
  | "ready_for_pickup"
  | "delivered"
  | "cancelled"
  | "refunded";

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;

  discount?: {
    type: "percent" | "fixed";
    value: number;
  };
}

export interface OrderTimelineEvent {
  status: OrderStatus;
  createdAt: Date;
  updatedBy: string;
}

export interface Order {
  id: string;

  customerId: string;

  items: OrderItem[];

  totalAmount: number;

  status: OrderStatus;

  paymentId?: string;

  estimatedDelivery?: string;

  timeline: OrderTimelineEvent[];

  createdAt: Date;

  updatedAt: Date;
}