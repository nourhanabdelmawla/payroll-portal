
import { Navigate, useLocation } from "react-router-dom";
import { useEmployeeAuth } from "../../context/employeeAuthContext";

export default function EmployeeProtectedRoute({ children }) {
  const { employeeToken } = useEmployeeAuth();
  const location = useLocation();

  if (!employeeToken) {
    return <Navigate to="/employee/login" state={{ from: location }} replace />;
  }
  return children;
}



