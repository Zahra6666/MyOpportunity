import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function ProtectedRoute() {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
