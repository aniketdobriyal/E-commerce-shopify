// src/components/seller/SellerLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../buyer/Navbar";

export default function SellerLayout() {
  return (
    <div className="seller-layout">
      {/* ✅ Keep only Navbar at top */}
      <Navbar />

      {/* ✅ Render nested seller pages like Dashboard, Orders, etc. */}
      <div className="seller-content">
        <Outlet />
      </div>

      <style>{`
        .seller-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background: #f8fafc;
        }

        .seller-content {
          flex: 1;
          padding: 0;
        }
      `}</style>
    </div>
  );
}
