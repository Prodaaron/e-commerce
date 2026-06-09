export type UserRole =
  | "customer"
  | "seller"
  | "admin"
  | "super_admin";

export interface User {
  id: string;

  fullName: string;
  email: string;
  phone?: string;

  role: UserRole;

  createdAt: Date;
  updatedAt: Date;
}