import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedSellerRoute({ children }) {
  const token = localStorage.getItem("sellerToken");
  return token ? children : <Navigate to="/seller/login" />;
}
