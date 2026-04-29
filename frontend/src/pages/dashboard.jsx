import { useEffect, useState } from "react";
import api from "../services/api";

export default function EmployeesTable() {
  const [employees, setEmployees] = useState([]);
  const [searchId, setSearchId] = useState(""); 
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/auth/list");
      setEmployees(res.data);
    } catch (err) {
      console.error("Error fetching employees", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("do you sure delete this employee")) return;
    try {
      await api.delete(`/employees/${id}`);
      fetchEmployees();
    } catch (err) {
      alert("error whiele deleting");
    }
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.employeeId.toString().includes(searchId)
  );

  return (
    <div style={containerStyle}>
     <div style={headerStyle}>
        <h2 style={{ color: "#1e293b", margin: 0 }}>👥 Employee Management</h2>
      </div>

      <div style={searchContainerStyle}>
        <div style={{ position: 'relative', width: '300px' }}>
          <span style={searchIconStyle}>🔍</span>
          <input
            type="text"
            placeholder="Search by Employee ID..."
            style={searchInputStyle}
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </div>
        <div style={{ color: '#94a3b8', fontSize: '13px' }}>
          Total: {filteredEmployees.length} employees
        </div>
      </div>

      <div style={tableWrapperStyle}>
        <table style={tableStyle}>
          <thead>
            <tr style={theadTrStyle}>
              <th style={thStyle}>Employee ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Employee Link</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <tr key={emp._id} style={trStyle}>
                  <td style={tdStyle}>
                    <span style={idBadgeStyle}>{emp.employeeId}</span>
                  </td>
                  <td style={{ ...tdStyle, fontWeight: "500", color: "#334155" }}>{emp.name}</td>
                  <td style={tdStyle}>
                    <a
                      href={`http://localhost:5173/employee?token=${emp.token}`}
                      target="_blank"
                      rel="noreferrer"
                      style={linkButtonStyle}
                    >
                      🔗 Open Profile
                    </a>
                  </td>
                  <td style={tdStyle}>
                    <button onClick={() => handleDelete(emp._id)} style={deleteButtonStyle}>
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ padding: "40px", textAlign: "center", color: "#94a3b8" }}>
                  {loading ? "Loading..." : "No employees found matching this ID."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- Styles (Light Modern) ---

const containerStyle = {
  maxWidth: "1000px",
  margin: "0 auto",
};

const headerStyle = {
  marginBottom: "25px",
};

const searchContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
  gap: '15px'
};

const searchInputStyle = {
  width: '100%',
  padding: '10px 15px 10px 40px',
  borderRadius: '8px',
  border: '1px solid #cbd5e1',
  backgroundColor: '#fff',
  fontSize: '14px',
  outline: 'none',
  transition: 'border 0.2s',
};

const searchIconStyle = {
  position: 'absolute',
  left: '12px',
  top: '50%',
  transform: 'translateY(-50%)',
  fontSize: '16px'
};

const tableWrapperStyle = {
  backgroundColor: "#fff",
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  overflow: "hidden",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  textAlign: "left",
};

const theadTrStyle = {
  backgroundColor: "#f8fafc",
  borderBottom: "2px solid #e2e8f0",
};

const thStyle = {
  padding: "15px 20px",
  fontSize: "13px",
  fontWeight: "600",
  color: "#475569",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const trStyle = {
  borderBottom: "1px solid #f1f5f9",
  transition: "background 0.2s",
};

const tdStyle = {
  padding: "15px 20px",
  fontSize: "14px",
  color: "#64748b",
};

const idBadgeStyle = {
  backgroundColor: "#eff6ff",
  color: "#2563eb",
  padding: "4px 8px",
  borderRadius: "6px",
  fontWeight: "bold",
  fontSize: "12px",
};

const linkButtonStyle = {
  textDecoration: "none",
  color: "#2563eb",
  fontSize: "13px",
  fontWeight: "600",
  padding: "6px 12px",
  borderRadius: "6px",
  backgroundColor: "rgba(37, 99, 235, 0.05)",
  transition: "0.2s",
};

const deleteButtonStyle = {
  backgroundColor: "transparent",
  color: "#ef4444",
  border: "1px solid #fee2e2",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "500",
  transition: "0.2s",
};