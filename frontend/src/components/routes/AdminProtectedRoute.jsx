import { Navigate , useLocation} from "react-router-dom";
import { useAuth } from "../../context/adminAuthContext";

export default function ProtectedRoute({ children }) {
  const { token } = useAuth();
  const location = useLocation();


  if (!token) return <Navigate to="/"  state={{ from: location }} replace />;
  return children;
}

