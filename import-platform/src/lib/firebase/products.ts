import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

import { db } from "./config";
import { Product } from "@/types/product";

/* -----------------------------
   Helpers: Firestore ↔ Product
------------------------------ */

function fromFirestore(doc: any): Product {
  const data = doc.data();

  return {
    id: doc.id,
    sellerId: data.sellerId,

    title: data.title,
    slug: data.slug,

    description: data.description,
    price: data.price,

    images: data.images || [],

    category: data.category,
    status: data.status,
    featured: data.featured,

    createdAt: data.createdAt?.toDate?.() ?? new Date(),
    updatedAt: data.updatedAt?.toDate?.() ?? new Date(),
  };
}

function toFirestore(product: Partial<Product>) {
  return {
    ...product,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
}

/* -----------------------------
   GET ALL PRODUCTS (PUBLIC)
------------------------------ */

export async function getProducts(): Promise<Product[]> {
  const q = query(
    collection(db, "products"),
    where("status", "==", "active"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(fromFirestore);
}

/* -----------------------------
   GET PRODUCT BY SLUG
------------------------------ */

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  const q = query(
    collection(db, "products"),
    where("slug", "==", slug),
    where("status", "==", "active")
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  return fromFirestore(snapshot.docs[0]);
}

/* -----------------------------
   CREATE PRODUCT (ADMIN ONLY)
------------------------------ */

export async function createProduct(
  product: Omit<Product, "id" | "createdAt" | "updatedAt">
) {
  const ref = await addDoc(
    collection(db, "products"),
    {
      ...product,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }
  );

  return ref.id;
}

/* -----------------------------
   UPDATE PRODUCT (ADMIN ONLY)
------------------------------ */

export async function updateProduct(
  id: string,
  data: Partial<Product>
) {
  const ref = doc(db, "products", id);

  await updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/* -----------------------------
   ARCHIVE PRODUCT (ADMIN ONLY)
------------------------------ */

export async function archiveProduct(id: string) {
  const ref = doc(db, "products", id);

  await updateDoc(ref, {
    status: "archived",
    updatedAt: serverTimestamp(),
  });
}

/* -----------------------------
   RESTORE PRODUCT (ADMIN ONLY)
------------------------------ */

export async function restoreProduct(id: string) {
  const ref = doc(db, "products", id);

  await updateDoc(ref, {
    status: "active",
    updatedAt: serverTimestamp(),
  });
}

export async function getAdminProducts(): Promise<Product[]> {
  const snapshot = await getDocs(collection(db, "products"));

  return snapshot.docs.map(fromFirestore);
}