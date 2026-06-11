"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  archiveProduct,
  restoreProduct,
} from "@/lib/firebase/products";

export default function ProductActions({ product }: any) {
  const router = useRouter();

  async function handleArchive() {
    await archiveProduct(product.id);
    router.refresh();
  }

  async function handleRestore() {
    await restoreProduct(product.id);
    router.refresh();
  }

  return (
    <div className="admin-actions">
      <Link href={`/admin/products/edit/${product.id}`}>
        <button>Edit</button>
      </Link>

      {product.status === "active" ? (
        <button onClick={handleArchive}>
          Archive
        </button>
      ) : (
        <button onClick={handleRestore}>
          Restore
        </button>
      )}
    </div>
  );
}