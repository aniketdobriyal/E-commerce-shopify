import React from "react";
import { Mail, Phone, MapPin, User, Edit3 } from "lucide-react";

export default function DashboardView({ user, onEdit }) {
  return (
    <div className="personal-info-container">
      <div className="info-header"></div>

      <div className="info-grid">
        <div className="info-card">
          <User className="info-icon text-primary" />
          <div>
            <p className="info-label">Full Name</p>
            <p className="info-value">{user?.name || "John Doe"}</p>
          </div>
        </div>

        <div className="info-card">
          <Mail className="info-icon text-danger" />
          <div>
            <p className="info-label">Email Address</p>
            <p className="info-value">{user?.email || "user@example.com"}</p>
          </div>
        </div>

        <div className="info-card">
          <Phone className="info-icon text-success" />
          <div>
            <p className="info-label">Phone Number</p>
            <p className="info-value">{user?.phone || "+91 9876543210"}</p>
          </div>
        </div>

        <div className="info-card">
          <MapPin className="info-icon text-warning" />
          <div>
            <p className="info-label">Address</p>
            <p className="info-value">
              {user?.locations || "123, City Center, New Delhi, India"}
            </p>
          </div>
        </div>
      </div>

      <button className="edit-btn my-4" onClick={onEdit}>
        <Edit3 size={16} /> Edit
      </button>

      <style>{`
        .personal-info-container {
          background: linear-gradient(120deg, #f8fafc, #ffffff);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.05);
          border: 1px solid #e2e8f0;
          max-width: 900px;
          margin: 20px auto;
          transition: all 0.3s ease;
        }
        .info-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .edit-btn { display: flex; align-items: center; gap: 6px; background: #2563eb; color: white; border: none; border-radius: 8px; padding: 6px 12px; font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: background 0.25s ease; }
        .edit-btn:hover { background: #1d4ed8; }
        .info-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 18px; }
        .info-card { display: flex; align-items: center; gap: 14px; padding: 14px 16px; border-radius: 12px; background: #f9fafb; border: 1px solid #e2e8f0; transition: all 0.25s ease; cursor: default; }
        .info-card:hover { background: #eef6ff; box-shadow: 0 4px 12px rgba(37,99,235,0.08); transform: translateY(-2px); }
        .info-icon { flex-shrink: 0; opacity: 0.9; }
        .info-label { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; margin: 0; font-weight: 600; }
        .info-value { font-size: 0.95rem; color: #1e293b; margin: 2px 0 0; font-weight: 600; }
        @media (max-width: 768px) {
          .personal-info-container { padding: 18px; }
          .edit-btn { font-size: 0.85rem; padding: 5px 10px; }
        }
      `}</style>
    </div>
  );
}
