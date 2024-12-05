import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roleRequired }) => {
  const { token, role } = useSelector((state) => state.user);

  if (!token) {
    return <Navigate to="/sigin" />;
  }

  if (role !== roleRequired) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
