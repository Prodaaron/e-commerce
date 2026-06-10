import ProductGrid from "@/components/products/productGrid";
import "@/styles/products.css";
import { getProducts } from "@/lib/firebase/products";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <h1>Products</h1>
      <ProductGrid products={products} />
    </div>
  );
}