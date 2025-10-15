import React from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  if (loading) {
    return <Loading text="Verifying your session..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
