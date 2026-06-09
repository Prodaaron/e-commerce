export type PaymentStatus =
  | "pending"
  | "verified"
  | "rejected";

export interface Payment {
  id: string;

  orderId: string;

  customerId: string;

  amount: number;

  proofImageUrl: string;

  status: PaymentStatus;

  verifiedBy?: string;

  createdAt: Date;
  updatedAt: Date;
}