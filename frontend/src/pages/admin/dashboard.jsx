import { useEffect, useState } from "react";
import api from "../../services/api";

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

  const handleOpenProfile = async (id) => {
    try {
      const res = await api.get(`/admin/auth/employee-link/${id}`);
      if (res.data.ok && res.data.link) {
        window.open(res.data.link, '_blank');
      } else {
        alert("Failed to generate profile link");
      }
    } catch (err) {
      console.error("Error generating link", err);
      alert("Error generating direct login link");
    }
  };

  const handleCopyLink = async (id) => {
    try {
      const res = await api.get(`/admin/auth/employee-link/${id}`);
      if (res.data.ok && res.data.link) {
        await navigator.clipboard.writeText(res.data.link);
        alert("🗐 Link copied to clipboard successfully!");
      } else {
        alert("Failed to copy link");
      }
    } catch (err) {
      console.error("Error copying link", err);
      alert("Error copying link");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;

    try {
      await api.delete(`/admin/auth/deleteEmployee/${id}`);
      fetchEmployees();
    } catch (err) {
      alert("Error while deleting");
    }
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.employeeId.toString().includes(searchId)
  );

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
          👥 Employee Management
        </h2>
      </div>

      {/* Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
        <div className="relative w-full md:w-[320px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search by Employee ID..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div className="text-sm text-slate-500">
          Total: {filteredEmployees.length} employees
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Employee ID
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Name
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Employee Link
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp) => (
                  <tr
                    key={emp._id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-4">
                      <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
                        {emp.employeeId}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">
                      {emp.name}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenProfile(emp._id)}
                          className="inline-flex items-center gap-2 rounded-lg bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-100"
                        >
                          🔗 Open Profile
                        </button>

                        <button
                          onClick={() => handleCopyLink(emp._id)}
                          title="Copy Link"
                          className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition duration-200 transform hover:-translate-y-0.5 text-lg"
                        >
                          🗐
                        </button>
                      </div>
                    </td>

                    {/* Delete */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(emp._id)}
                        className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-12 text-center text-slate-400"
                  >
                    {loading
                      ? "Loading..."
                      : "No employees found matching this ID."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}