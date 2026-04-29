import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/adminLogin";
import UploadEmployees from "./pages/uploadEmployees";
import UploadSalaries from "./pages/uploadSalarySlips";
import AdminLayout from "./layout/adminLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import EmployeesTable from "./pages/dashboard";

import EmployeeLogin from "./pages/employeeLogin"; 
import EmployeeDashboard from "./pages/employeeDashboard";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/employee-login" element={<EmployeeLogin />} />

      <Route path="/employee-dashboard" element={<EmployeeDashboard />} />

      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<EmployeesTable />} />
        <Route path="upload_employees" element={<UploadEmployees />} />
        <Route path="upload_salaries" element={<UploadSalaries />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;



