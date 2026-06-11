"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<any>({
    title: "",
    slug: "",
    description: "",
    price: 0,
    images: "",
    category: "",
    featured: false,
    status: "active",
    discountType: "none",
    discountValue: 0,
  });

  // LOAD PRODUCT
  useEffect(() => {
    async function fetchProduct() {
      const ref = doc(db, "products", id);
      const snap = await getDoc(ref);

      if (!snap.exists()) return;

      const data = snap.data();

      setForm({
        title: data.title || "",
        slug: data.slug || "",
        description: data.description || "",
        price: data.price || 0,
        images: (data.images || []).join(", "),
        category: data.category || "",
        featured: data.featured || false,
        status: data.status || "active",

        discountType: data.discount?.type || "none",
        discountValue: data.discount?.value || 0,
      });
    }

    fetchProduct();
  }, [id]);

  function handleChange(e: any) {
    const { name, value, type, checked } = e.target;

    setForm((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleUpdate(e: any) {
    e.preventDefault();
    setLoading(true);

    try {
      const ref = doc(db, "products", id);

      await updateDoc(ref, {
        title: form.title,
        slug: form.slug,
        description: form.description,
        price: Number(form.price),
        images: form.images.split(",").map((i: string) => i.trim()),
        category: form.category,
        featured: form.featured,
        status: form.status,

        discount:
          form.discountType === "none"
            ? null
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
    <form onSubmit={handleUpdate} className="admin-form">
      <h1>Edit Product</h1>

      <input name="title" value={form.title} onChange={handleChange} />

      <input name="slug" value={form.slug} onChange={handleChange} />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
      />

      <input
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
      />

      <input
        name="images"
        value={form.images}
        onChange={handleChange}
      />

      <input
        name="category"
        value={form.category}
        onChange={handleChange}
      />

      {/* DISCOUNT */}
      <select
        name="discountType"
        value={form.discountType}
        onChange={handleChange}
      >
        <option value="none">No Discount</option>
        <option value="percent">Percent %</option>
        <option value="fixed">Fixed</option>
      </select>

      {form.discountType !== "none" && (
        <input
          name="discountValue"
          type="number"
          value={form.discountValue}
          onChange={handleChange}
        />
      )}

      <label>
        <input
          type="checkbox"
          name="featured"
          checked={form.featured}
          onChange={handleChange}
        />
        Featured
      </label>

      <button disabled={loading}>
        {loading ? "Updating..." : "Update Product"}
      </button>
    </form>
  );
}