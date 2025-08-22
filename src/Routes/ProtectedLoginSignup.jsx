import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedLoginSignup  = () => {
  return !localStorage.getItem("userId") ? <Outlet /> : <Navigate to="/dashboard" />;
};
