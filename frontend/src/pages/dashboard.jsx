import { useEffect, useState } from "react";
import api from "../services/api";

export default function EmployeesTable() {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    const res = await api.get("/admin/employees/list");
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete employee?")) return;

    await api.delete(`/employees/${id}`);
    fetchEmployees();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Employees</h2>

      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Employee Link</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.employeeId}</td>
              <td>{emp.name}</td>

              <td>
                <a
                  href={`http://localhost:5173/employee?token=${emp.token}`}
                  target="_blank"
                >
                  Open
                </a>
              </td>

              <td>
                <button onClick={() => handleDelete(emp._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
