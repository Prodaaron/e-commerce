import AdminSidebar from "@/components/admin/adminSidebar";
import "@/styles/admin.css";
import AdminRoute from "@/components/common/AdminRoute";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminRoute>
      <div className="admin-layout">
        <AdminSidebar />

        <main className="admin-content">
          {children}
        </main>
      </div>
    </AdminRoute>
  );
}