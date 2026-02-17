import React from "react";
import { Navigate } from "react-router-dom";
import { AUTH_DISABLED } from "../config/auth";

const PrivateRoute = ({ children, allowedRoles }) => {
  if (AUTH_DISABLED) {
    return children;
  }

  const userData = JSON.parse(localStorage.getItem("user"));

  if (!userData || !userData.token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userData.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
