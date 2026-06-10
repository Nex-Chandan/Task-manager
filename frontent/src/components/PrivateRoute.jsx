import { Navigate } from "react-router-dom";
import { userAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = userAuth();
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;