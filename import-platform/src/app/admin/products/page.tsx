import "@/styles/admin.css";
import AdminRoute from "@/components/common/AdminRoute";
import { getAdminProducts } from "@/lib/firebase/products";
import Link from "next/link";
import ProductActions from "@/components/admin/ProductActions";

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

          {products.map((product) => {
            const discount = product.discount;

            const hasDiscount =
              discount !== undefined &&
              discount !== null &&
              discount.value > 0;

            let discountLabel = null;

            if (hasDiscount) {
              discountLabel =
                discount.type === "percent"
                  ? `-${discount.value}% OFF`
                  : `- ${discount.value} ETB OFF`;
            }

            return (
              <div key={product.id} className="admin-table-row">
                <span>
                  {product.title}

                  {hasDiscount && (
                    <span className="admin-discount-badge">
                      {discountLabel}
                    </span>
                  )}
                </span>

                <span>
                  {product.price.toLocaleString()} ETB
                </span>

                <span>{product.status}</span>

                <ProductActions product={product} />
              </div>
            );
          })}
        </div>
      </>
    </AdminRoute>
  );
}