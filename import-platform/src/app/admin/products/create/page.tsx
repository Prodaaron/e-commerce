"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/lib/firebase/products";

export default function CreateProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    price: "",
    category: "",
    image: "",
    featured: false,
  });

  function generateSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setForm((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      // auto-generate slug from title
      if (name === "title") {
        updated.slug = generateSlug(value);
      }

      return updated;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await createProduct({
        sellerId: "admin",

        title: form.title,
        slug: form.slug || generateSlug(form.title),

        description: form.description,
        price: Number(form.price),

        images: form.image ? [form.image] : [],

        category: form.category,
        featured: form.featured,

        status: "active",
      });

      router.push("/admin/products");
    } catch (err) {
      console.error("Failed to create product:", err);
    }

    setLoading(false);
  }

  return (
    <div className="admin-form-container">
      <h1>Create Product</h1>

      <form onSubmit={handleSubmit} className="admin-form">

        <input
          name="title"
          placeholder="Product Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          name="slug"
          placeholder="Slug (auto-generated)"
          value={form.slug}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />

        <input
          name="image"
          placeholder="Image URL (temporary)"
          value={form.image}
          onChange={handleChange}
        />

        <label className="admin-checkbox">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                featured: e.target.checked,
              }))
            }
          />
          Featured Product
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}