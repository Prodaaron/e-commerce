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

    // ✅ SAFE discount mapping
    discount: data.discount
      ? {
          type: data.discount.type,
          value: data.discount.value,
        }
      : undefined,
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
  slug?: string
): Promise<Product | null> {
  if (!slug || typeof slug !== "string") {
    console.warn("getProductBySlug called with invalid slug:", slug);
    return null;
  }

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
  const ref = await addDoc(collection(db, "products"), {
    ...product,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

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

/* -----------------------------
   ADMIN PRODUCTS
------------------------------ */

export async function getAdminProducts(): Promise<Product[]> {
  const snapshot = await getDocs(collection(db, "products"));

  return snapshot.docs.map(fromFirestore);
}