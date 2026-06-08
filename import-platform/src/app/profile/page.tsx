import "@/styles/profile.css";

export default function ProfilePage() {
  const user = {
    name: "Aron Mesfin",
    email: "aron@example.com",
    phone: "+251912345678",
    role: "Customer",
    totalOrders: 4,
    memberSince: "June 2026",
  };

  return (
    <div className="container section">
      <h1 className="page-title">
        My Profile
      </h1>

      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.name.charAt(0)}
          </div>

          <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="profile-info">
          <div className="profile-row">
            <span>Phone Number</span>
            <span>{user.phone}</span>
          </div>

          <div className="profile-row">
            <span>Account Type</span>
            <span>{user.role}</span>
          </div>

          <div className="profile-row">
            <span>Total Orders</span>
            <span>{user.totalOrders}</span>
          </div>

          <div className="profile-row">
            <span>Member Since</span>
            <span>{user.memberSince}</span>
          </div>
        </div>

        <button className="profile-button">
          Edit Profile
        </button>
      </div>
    </div>
  );
}