import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

interface ProtectedRoutesProps {
  adminOnly?: boolean; // Define se a rota é apenas para administradores
}

export function ProtectedRoutes({ adminOnly }: ProtectedRoutesProps) {
  const { estaLogado, isProprietario } = useAuth();

  if (!estaLogado) {
    return <Navigate to="/" />;
  }

  if (adminOnly && !isProprietario) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
}
