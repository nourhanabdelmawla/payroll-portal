import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/notFound";
import DirectLogin from './pages/directLogin';



// Admin
import Login from "./pages/admin/adminLogin";
import UploadEmployees from "./pages/admin/uploadEmployees";
import UploadSalaries from "./pages/admin/uploadSalarySlips";
import EmployeesTable from "./pages/admin/dashboard";

// Employee
import EmployeeLogin from "./pages/employee/employeeLogin";
import EmployeeDashboard from "./pages/employee/employeeDashboard";
import History from "./pages/employee/history";

// Layouts
import AdminLayout from "./layout/adminLayout";
import EmployeeLayout from "./layout/employeeLayout";

// Routes Protection
import ProtectedRoute from "./components/routes/AdminProtectedRoute";
import EmployeeProtectedRoute from "./components/routes/EmployeeProtectedRoute";

export default function App() {
  return (
    <Routes>

      {/* ADMIN LOGIN */}
      <Route path="/" element={<Login />} />

      {/* EMPLOYEE LOGIN */}
      <Route
        path="/employee/login"
        element={<EmployeeLogin />}
      />

      {/* ADMIN ROUTES */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={<Navigate to="dashboard" />}
        />

        <Route
          path="dashboard"
          element={<EmployeesTable />}
        />

        <Route
          path="upload_employees"
          element={<UploadEmployees />}
        />

        <Route
          path="upload_salaries"
          element={<UploadSalaries />}
        />
      </Route>

      {/* EMPLOYEE ROUTES */}
      <Route
        path="/employee"
        element={

          <EmployeeProtectedRoute>
            <EmployeeLayout />
          </EmployeeProtectedRoute>

        }
      >
        <Route
          index
          element={<Navigate to="dashboard" />}
        />

        <Route
          path="dashboard"
          element={<EmployeeDashboard />}
        />

        <Route
          path="history"
          element={<History />}
        />
      </Route>

      {/* directLogin */}
      <Route path="/direct-login" element={<DirectLogin />} />

      {/* FALLBACK */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}