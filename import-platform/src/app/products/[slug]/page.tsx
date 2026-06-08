export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div>
      <h1>Product Details</h1>
      <p>Slug: {slug}</p>
    </div>
  );
}