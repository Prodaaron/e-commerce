import "@/styles/products.css";
import { getProductBySlug } from "@/lib/firebase/products";
import { notFound } from "next/navigation";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  console.log("RAW SLUG FROM URL:", slug);

  if (!slug) return notFound();

  const product = await getProductBySlug(slug);

  if (!product) return notFound();

  // -------------------------
  // DISCOUNT LOGIC
  // -------------------------
  const discount = product.discount;

  const hasDiscount =
    discount !== undefined &&
    discount !== null &&
    discount.value > 0;

  let finalPrice = product.price;

  if (hasDiscount) {
    if (discount.type === "percent") {
      finalPrice =
        product.price -
        (product.price * discount.value) / 100;
    }

    if (discount.type === "fixed") {
      finalPrice = product.price - discount.value;
    }
  }

  return (
    <div className="container section">
      <div className="product-details">
        <div className="product-details-image">
          <img
            src={
              product.images?.[0] ||
              "https://via.placeholder.com/600"
            }
            alt={product.title}
          />
        </div>

        <div className="product-details-info">
          <h1 className="product-details-title">
            {product.title}
          </h1>

          {/* DISCOUNT BADGE */}
          {hasDiscount && (
            <div className="discount-badge">
              {discount.type === "percent"
                ? `-${discount.value}% OFF`
                : `- ${discount.value} ETB OFF`}
            </div>
          )}

          {/* PRICE */}
          <div className="product-details-price">
            {hasDiscount ? (
              <>
                <span className="old-price">
                  {product.price.toLocaleString()} ETB
                </span>

                <span className="new-price">
                  {finalPrice.toLocaleString()} ETB
                </span>
              </>
            ) : (
              <span>
                {product.price.toLocaleString()} ETB
              </span>
            )}
          </div>

          <div className="product-delivery">
            <strong>Estimated Delivery:</strong> 10–18 Days
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <button className="buy-button">
            Order Now
          </button>

          <p className="product-slug">
            Product ID: {product.slug}
          </p>
        </div>
      </div>
    </div>
  );
}