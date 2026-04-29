import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminLayout() {
  const { logout } = useAuth();
  const location = useLocation();

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      <aside style={sidebarStyle}>
        <div>
          <div style={logoContainerStyle}>
            <div style={logoIconStyle}>S</div>
            <h6 style={logoTextStyle}>Salary System</h6>
          </div>

          <nav>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <SidebarLink 
                to="/app/dashboard" 
                label="Dashboard" 
                icon="📊" 
                active={location.pathname === "/app/dashboard"} 
              />
              <SidebarLink 
                to="/app/upload_employees" 
                label="Employees" 
                icon="👥" 
                active={location.pathname === "/app/upload_employees"} 
              />
              <SidebarLink 
                to="/app/upload_salaries" 
                label="Salaries" 
                icon="💰" 
                active={location.pathname === "/app/upload_salaries"} 
              />
              
              <li style={{ marginTop: "10px" }}>
                <button onClick={logout} style={logoutButtonStyle}>
                  <span style={{ fontSize: "18px" }}>🚪</span>
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      
      <main style={{ flex: 1, padding: "30px", backgroundColor: "#f1f5f9" }}>
        <Outlet />
      </main>
    </div>
  );
}

function SidebarLink({ to, label, icon, active }) {
  return (
    <li style={{ marginBottom: "4px" }}>
      <Link to={to} style={{
        ...linkStyle,
        backgroundColor: active ? "#334155" : "transparent", 
        color: active ? "#3b82f6" : "#fff",
        borderLeft: active ? "4px solid #3b82f6" : "4px solid transparent",
      }}>
        <span style={{ fontSize: "18px", width: "25px" }}>{icon}</span>
        {label}
      </Link>
    </li>
  );
}

// --- Styles (The Original Dark Navy) ---

const sidebarStyle = {
  width: "160px", 
  background: "#1e293b", 
  color: "#fff",
  padding: "30px 0",
  display: "flex",
  flexDirection: "column",
  position: "sticky",
  top: 0,
  height: "100vh",
};

const logoContainerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "0 20px",
  marginBottom: "35px",
};

const logoIconStyle = {
  backgroundColor: "#3b82f6",
  color: "white",
  padding: "4px 8px",
  borderRadius: "6px",
  fontWeight: "bold",
  fontSize: "14px"
};

const logoTextStyle = {
  fontSize: "18px",
  margin: 0,
  color: "#fff",
};

const linkStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  textDecoration: "none",
  padding: "12px 20px",
  fontSize: "15px",
  fontWeight: "400",
  transition: "0.2s",
};

const logoutButtonStyle = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px 20px",
  backgroundColor: "transparent",
  color: "#f87171", 
  border: "none",
  cursor: "pointer",
  fontSize: "15px",
  fontWeight: "400",
  textAlign: "left",
  transition: "0.2s",
};