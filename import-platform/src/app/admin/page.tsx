import AdminSidebar from "@/components/admin/adminSidebar";
import "@/styles/admin.css";
import AdminRoute from "@/components/common/AdminRoute";


export default function AdminDashboardPage() {
  return (
    <AdminRoute>
      <div className="admin-layout">

          <div className="admin-content">
              <h1>Dashboard</h1>

              <div className="admin-stats">
                  <div className="admin-stat-card">
                  <h3>Products</h3>
                  <p>25</p>
                  </div>

                  <div className="admin-stat-card">
                  <h3>Orders</h3>
                  <p>12</p>
                  </div>

                  <div className="admin-stat-card">
                  <h3>Pending Payments</h3>
                  <p>3</p>
                  </div>

                  <div className="admin-stat-card">
                  <h3>Customers</h3>
                  <p>18</p>
                  </div>
              </div>
          </div>
      </div> 
    </AdminRoute>
  );
}