import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { loadState } from "../utils/states";
import { message } from "antd";

type AuthToken = string | null;

export const ProtectedRoute: React.FC = () => {
  const user: AuthToken = loadState<AuthToken>("exasoft", "");
console.log(user);

  if (!user) {
    message.error("Avtorizatsiya talab qilinadi.");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
