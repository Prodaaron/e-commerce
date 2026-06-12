import "@/styles/products.css";
import { getProductBySlug } from "@/lib/firebase/products";
import { notFound } from "next/navigation";
import ProductActions from "@/components/products/ProductActions";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) return notFound();

  return (
    <div className="container section">
      <div className="product-details">
        <div className="product-details-image">
          <img
            src={product.images?.[0] || "https://via.placeholder.com/600"}
            alt={product.title}
          />
        </div>

        <div className="product-details-info">
          <h1 className="product-details-title">{product.title}</h1>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {/* ALL ACTIONS MOVED HERE */}
          <ProductActions product={product} />
        </div>
      </div>
    </div>
  );
}