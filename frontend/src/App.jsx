
import {  Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import UploadEmployees from "./pages/uploadEmployees";
import UploadSalaries from "./pages/uploadSalarySlips";
import AdminLayout from "./layout/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import EmployeesTable from "./pages/dashboard";

function App() {
  return (
    //<BrowserRouter>
      <Routes>
        <Route path ="/" element={<Login />} />

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
    //</BrowserRouter>
  );
}
export default App;



