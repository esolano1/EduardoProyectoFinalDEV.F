import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuth } = useAuth();
  const location = useLocation();

  if (!isAuth) {
    // Guarda a dónde quería ir y manda a /login
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}
