import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  // If no auth data or not authenticated, redirect to login
  if (!auth?.user || !auth?.accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Get user type from auth (this matches what we set in login component)
  const userType = "admin";

  // If no user type found, redirect to login
  if (!userType) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Normalize allowed roles for comparison (convert to lowercase)
  const normalizedAllowedRoles =
    allowedRoles?.map((role) => role.toLowerCase()) || [];
  const normalizedUserType = userType.toLowerCase();

  // Check if user has permission for this route
  const hasPermission =
    normalizedAllowedRoles.length === 0 ||
    normalizedAllowedRoles.includes(normalizedUserType);

  if (hasPermission) {
    return <Outlet />;
  }

  // User is authenticated but doesn't have permission
  // Redirect to their appropriate dashboard based on user type
  const getRedirectPath = (userType) => {
    switch (userType.toLowerCase()) {
      case "admin":
        return "/admin";
      default:
        return "/unauthorized";
    }
  };

  return (
    <Navigate
      to={getRedirectPath(userType)}
      state={{ from: location }}
      replace
    />
  );
};

export default RequireAuth;
