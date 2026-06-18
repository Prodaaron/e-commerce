export type PaymentStatus =
  | "pending"
  | "verified"
  | "rejected";

export type PaymentProofProvider =
  | "imagekit"
  | "google_drive"
  | "cloudflare_r2"
  | "firebase_storage"
  | "local_archive"
  | "external";

export interface PaymentProofStorageRef {
  provider: PaymentProofProvider;

  url?: string;

  fileId?: string;
  path?: string;
  bucket?: string;

  originalFileName?: string;
  mimeType?: string;
  size?: number;

  archived?: boolean;
  archivedAt?: Date;

  uploadedAt: Date;
}

export interface Payment {
  id: string;

  orderId: string;

  customerId: string;

  amount: number;

  proof: PaymentProofStorageRef;

  proofImageUrl?: string;

  status: PaymentStatus;

  verifiedBy?: string;

  createdAt: Date;
  updatedAt: Date;
}