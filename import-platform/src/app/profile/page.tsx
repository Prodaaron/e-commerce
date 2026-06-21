"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import "@/styles/profile.css";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import { getUserOrders } from "@/lib/firebase/getUserOrders";
import { updateUserProfile } from "@/lib/firebase/user";

export default function ProfilePage() {
  const { user, loading } = useAuth();

  const [totalOrders, setTotalOrders] = useState(0);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
  });

  useEffect(() => {
    if (!user) return;

    setForm({
      fullName: user.fullName || "",
      phone: user.phone || "",
    });

    const fetchOrders = async () => {
      try {
        const orders = await getUserOrders(user.uid);
        setTotalOrders(orders.length);
      } catch (err) {
        console.error("Failed to load profile orders:", err);
      }
    };

    fetchOrders();
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!user) return;

    setSaving(true);

    try {
      await updateUserProfile(user.uid, {
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
      });

      setEditing(false);
      alert("Profile updated successfully");
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const displayName = form.fullName || user?.email || "Customer";
  const memberSince = "Active customer";

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="container section">
          <h1 className="page-title">My Profile</h1>
          <p>Loading profile...</p>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="container section">
        <h1 className="page-title">
          My Profile
        </h1>

        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {displayName.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2>{displayName}</h2>
              <p>{user?.email}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="profile-info">
            {editing && (
              <>
                <label className="profile-field">
                  Full Name
                  <input
                    value={form.fullName}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }))
                    }
                  />
                </label>

                <label className="profile-field">
                  Phone Number
                  <input
                    value={form.phone}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                </label>
              </>
            )}

            <div className="profile-row">
              <span>Phone Number</span>
              <span>{form.phone || "Not set"}</span>
            </div>

            <div className="profile-row">
              <span>Account Type</span>
              <span>{user?.role || "customer"}</span>
            </div>

            <div className="profile-row">
              <span>Total Orders</span>
              <span>{totalOrders}</span>
            </div>

            <div className="profile-row">
              <span>Status</span>
              <span>{memberSince}</span>
            </div>

            {editing ? (
              <div className="profile-actions">
                <button
                  type="submit"
                  className="profile-button"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Profile"}
                </button>

                <button
                  type="button"
                  className="profile-secondary-button"
                  onClick={() => {
                    setEditing(false);
                    setForm({
                      fullName: user?.fullName || "",
                      phone: user?.phone || "",
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="profile-button"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>
            )}
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
