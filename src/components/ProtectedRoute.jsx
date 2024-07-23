import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/utils";

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to={`/auth/login`} replace />;
};
ProtectedRoute.propTypes = {
  children: PropTypes.object,
};
export default ProtectedRoute;
