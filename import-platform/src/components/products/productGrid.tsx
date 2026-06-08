import ProductCard from "./productCard";
import "@/styles/products.css";

const products = [
  {
    id: "1",
    title: "Dior Sauvage",
    priceETB: 8500,
    slug: "dior-sauvage",
    image: "https://via.placeholder.com/250",
  },
  {
    id: "2",
    title: "Nike Air Force 1",
    priceETB: 7000,
    slug: "nike-air-force-1",
    image: "https://via.placeholder.com/250",
  },
];

export default function ProductGrid() {
  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
        />
      ))}
    </div>
  );
}