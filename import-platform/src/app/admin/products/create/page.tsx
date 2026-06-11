"use client";

import { useState } from "react";
import { createProduct } from "@/lib/firebase/products";
import { useRouter } from "next/navigation";
import { generateSlug } from "@/utils/generateSlug";


export default function CreateProductPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    price: 0,
    images: "",
    category: "",
    featured: false,
    status: "active" as "active" | "draft",
    discountType: "none" as "none" | "percent" | "fixed",
    discountValue: 0,
  });

  function handleChange(e: any) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    try {
      await createProduct({
        sellerId: "admin",
        title: form.title,
        slug: generateSlug(form.title), 
        description: form.description,
        price: Number(form.price),
        images: form.images.split(",").map((img) => img.trim()),
        category: form.category,
        featured: form.featured,
        status: form.status,

        discount:
          form.discountType === "none"
            ? undefined
            : {
                type: form.discountType,
                value: Number(form.discountValue),
              },
      });

      router.push("/admin/products");
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <h1>Create Product</h1>

      <input
        name="title"
        placeholder="Title"
        onChange={handleChange}
      />

      <input
        name="slug"
        placeholder="Slug"
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
      />

      <input
        name="price"
        type="number"
        placeholder="Price"
        onChange={handleChange}
      />

      <input
        name="images"
        placeholder="Images (comma separated)"
        onChange={handleChange}
      />

      <input
        name="category"
        placeholder="Category"
        onChange={handleChange}
      />

      {/* DISCOUNT SYSTEM */}
      <select
        name="discountType"
        onChange={handleChange}
      >
        <option value="none">No Discount</option>
        <option value="percent">Percent %</option>
        <option value="fixed">Fixed Amount</option>
      </select>

      {form.discountType !== "none" && (
        <input
          name="discountValue"
          type="number"
          placeholder="Discount Value"
          onChange={handleChange}
        />
      )}

      <label>
        <input
          type="checkbox"
          name="featured"
          onChange={handleChange}
        />
        Featured
      </label>

      <button disabled={loading}>
        {loading ? "Creating..." : "Create Product"}
      </button>
    </form>
  );
}