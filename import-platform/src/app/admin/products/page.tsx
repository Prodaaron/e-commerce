import "@/styles/admin.css";
import AdminRoute from "@/components/common/AdminRoute";
import { getProducts } from "@/lib/firebase/products";
import { getAdminProducts } from "@/lib/firebase/products";
import Link from "next/link";

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <AdminRoute>
      <>
        <div className="admin-page-header">
          <h1>Products</h1>

          <Link href="/admin/products/create">
            <button className="admin-primary-button">
              Add Product
            </button>
          </Link>
        </div>

        <div className="admin-table">
          <div className="admin-table-head">
            <span>Product</span>
            <span>Price</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          {products.map((product) => (
            <div
              key={product.id}
              className="admin-table-row"
            >
              <span>{product.title}</span>

              <span>
                {product.price.toLocaleString()} ETB
              </span>

              <span>
                {product.status}
              </span>

              <div className="admin-actions">
                <button>Edit</button>
                <button>Change Status</button>
              </div>
            </div>
          ))}
        </div>
      </>
    </AdminRoute>
  );
}