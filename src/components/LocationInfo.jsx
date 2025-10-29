// src/components/LocationInfo.jsx
import React, { useState } from "react";
import { MapPin, Edit3, Save, PlusCircle, Trash2, LocateFixed } from "lucide-react";

export default function LocationInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [locations, setLocations] = useState([
    {
      id: 1,
      title: "Home",
      address: "123 Hill Road, Dehradun, Uttarakhand, India - 248001",
      city: "Dehradun",
      state: "Uttarakhand",
      country: "India",
      postal: "248001",
    },
  ]);
  const [newLocation, setNewLocation] = useState({
    title: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postal: "",
  });

  // handle input change
  const handleChange = (e) => {
    setNewLocation({ ...newLocation, [e.target.name]: e.target.value });
  };

  // enable edit
  const handleEdit = () => setIsEditing(true);

  // save new location
  const handleSave = () => {
    if (!newLocation.title || !newLocation.address) {
      alert("Please fill title and address fields.");
      return;
    }
    const newEntry = { ...newLocation, id: Date.now() };
    setLocations([...locations, newEntry]);
    setNewLocation({
      title: "",
      address: "",
      city: "",
      state: "",
      country: "",
      postal: "",
    });
    setIsEditing(false);
  };

  // delete saved location
  const handleDelete = (id) => {
    setLocations(locations.filter((loc) => loc.id !== id));
  };

  // fetch current location
  const handleFetchLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported in your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          const address = data.display_name || "Current Location";
          const city = data.address.city || data.address.town || data.address.village || "";
          const state = data.address.state || "";
          const country = data.address.country || "";
          const postal = data.address.postcode || "";

          const newLoc = {
            id: Date.now(),
            title: "Current Location",
            address,
            city,
            state,
            country,
            postal,
          };

          setLocations([...locations, newLoc]);
          alert("Current location saved successfully!");
        } catch (error) {
          console.error(error);
          alert("Failed to fetch location info.");
        }
      },
      (error) => {
        console.error(error);
        alert("Unable to access your location.");
      }
    );
  };

  return (
    <div className="location-card">
      <div className="header">
        <MapPin size={22} className="text-primary" />
        <h3 className="title">Saved Locations</h3>
      </div>

      {/* Saved locations list */}
      <div className="saved-locations">
        {locations.length === 0 ? (
          <p className="text-muted">No saved locations yet.</p>
        ) : (
          locations.map((loc) => (
            <div key={loc.id} className="location-item">
              <div>
                <strong>{loc.title}</strong>
                <p className="small text-muted mb-1">{loc.address}</p>
                <p className="small text-muted">
                  {loc.city}, {loc.state}, {loc.country} - {loc.postal}
                </p>
              </div>
              <button className="delete-btn" onClick={() => handleDelete(loc.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="divider" />

      {/* Add new or GPS fetch */}
      <div className="actions">
        <button className="gps-btn" onClick={handleFetchLocation}>
          <LocateFixed size={18} /> Use My Current Location
        </button>
        {!isEditing ? (
          <button className="edit-btn" onClick={handleEdit}>
            <PlusCircle size={18} /> Add New
          </button>
        ) : (
          <button className="save-btn" onClick={handleSave}>
            <Save size={18} /> Save
          </button>
        )}
      </div>

      {/* Add location form */}
      {isEditing && (
        <div className="form-section">
          <input
            type="text"
            placeholder="Title (e.g., Home, Office)"
            name="title"
            value={newLocation.title}
            onChange={handleChange}
          />
          <textarea
            placeholder="Full address"
            name="address"
            value={newLocation.address}
            onChange={handleChange}
          />
          <div className="grid-2">
            <input
              type="text"
              placeholder="City"
              name="city"
              value={newLocation.city}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="State"
              name="state"
              value={newLocation.state}
              onChange={handleChange}
            />
          </div>
          <div className="grid-2">
            <input
              type="text"
              placeholder="Country"
              name="country"
              value={newLocation.country}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Postal Code"
              name="postal"
              value={newLocation.postal}
              onChange={handleChange}
            />
          </div>
        </div>
      )}

      <style>{`
        .location-card {
          background: #fff;
          border-radius: 14px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.07);
          padding: 24px;
          max-width: 700px;
          margin: auto;
        }
        .header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
        }
        .title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #1e293b;
        }
        .saved-locations {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .location-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 12px 14px;
          transition: 0.2s;
        }
        .location-item:hover {
          background: #f1f5f9;
        }
        .delete-btn {
          border: none;
          background: none;
          color: #ef4444;
          cursor: pointer;
          transition: 0.2s;
        }
        .delete-btn:hover {
          color: #dc2626;
        }
        .divider {
          margin: 20px 0;
          border-top: 1px solid #e2e8f0;
        }
        .actions {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 20px;
        }
        .edit-btn, .save-btn, .gps-btn {
          border: none;
          border-radius: 8px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          padding: 10px 16px;
          transition: background 0.2s;
        }
        .edit-btn {
          background: #2563eb;
          color: white;
        }
        .save-btn {
          background: #16a34a;
          color: white;
        }
        .gps-btn {
          background: #f3f4f6;
          color: #0f172a;
        }
        .gps-btn:hover {
          background: #e5e7eb;
        }
        .form-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #f8fafc;
          border-radius: 10px;
          padding: 16px;
        }
        input, textarea {
          width: 100%;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 10px;
          font-size: 0.95rem;
          color: #0f172a;
          background: #fff;
          transition: border 0.2s;
        }
        input:focus, textarea:focus {
          border-color: #2563eb;
          outline: none;
        }
        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 600px) {
          .grid-2 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
