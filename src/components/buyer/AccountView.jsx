import React from "react";

export default function AccountView({ user }) {
  return (
    <div className="content-area">
      <h1 className="main-title">Account Settings</h1>
      <p className="subtitle">Manage your account preferences and login details.</p>

      <div style={{ display:"grid", gap:"1rem", maxWidth:"400px" }}>
        <div><strong>Name:</strong> {user.name}</div>
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Phone:</strong> {user.phone}</div>
        <div><strong>City:</strong> {user.city}</div>
        <div><strong>State:</strong> {user.state}</div>
        <div><strong>Country:</strong> {user.country}</div>
        <div><strong>Postal Code:</strong> {user.postal}</div>
      </div>
    </div>
  );
}
