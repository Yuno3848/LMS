import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  if (loading) {
    return <Loading />;
  }
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
