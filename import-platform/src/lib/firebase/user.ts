import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase/config";
import { User } from "@/types/user";

function fromFirestore(docSnap: any): User {
  const data = docSnap.data();

  return {
    id: docSnap.id,
    fullName: data.fullName || "",
    email: data.email || "",
    phone: data.phone || "",
    role: data.role || "customer",
    createdAt: data.createdAt?.toDate?.() ?? new Date(),
    updatedAt: data.updatedAt?.toDate?.() ?? new Date(),
  };
}

export async function getAllUsers(): Promise<User[]> {
  const q = query(
    collection(db, "users"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(fromFirestore);
}

export async function updateUserProfile(
  userId: string,
  data: Pick<User, "fullName" | "phone">
) {
  const ref = doc(db, "users", userId);

  await updateDoc(ref, {
    fullName: data.fullName,
    phone: data.phone || "",
    updatedAt: serverTimestamp(),
  });
}
