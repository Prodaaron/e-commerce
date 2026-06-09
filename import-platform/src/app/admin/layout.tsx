import AdminSidebar from "@/components/admin/adminSidebar";
import "@/styles/admin.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-content">
        {children}
      </main>
    </div>
  );
}