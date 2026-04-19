import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminLayout() {
  const { logout } = useAuth();

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{ width: 240, background: "#1e293b", color: "#fff", padding: 20 }}>
        <h3>Salary System</h3>

        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <Link to="/app/dashboard" style={{ color: "#fff"}}>
              Dashboard</Link>

            </li>
            <li>
              <Link to="/app/upload_employees" style={{ color: "#fff" }}>
                Upload Employees
              </Link>
            </li>
            <li>
              <Link to="/app/upload_salaries" style={{ color: "#fff" }}>
                Upload Salaries
              </Link>
            </li>
          </ul>
        </nav>

        <button onClick={logout}>Logout</button>
      </aside>

      <main style={{ flex: 1, padding: 20 }}>
        <Outlet />
      </main>
    </div>
  );
}



