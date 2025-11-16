// src/components/LocationInfo.jsx
import React, { useState, useEffect } from "react";
import { MapPin, Save, PlusCircle, Trash2, LocateFixed } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { fetchLocations, addLocationApi, deleteLocationApi } from "../../api/locationApi";

export default function LocationInfo() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState({
    title: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postal: "",
  });
  const [loading, setLoading] = useState(false);

  // Load saved locations
  useEffect(() => {
    const loadLocations = async () => {
      if (!user?.id) return;
      try {
        const data = await fetchLocations(user.id);
        setLocations(data);
      } catch (err) {
        console.error("Failed to fetch locations:", err);
      }
    };
    loadLocations();
  }, [user]);

  // handle input change
  const handleChange = (e) => {
    setNewLocation({ ...newLocation, [e.target.name]: e.target.value });
  };

  // enable edit
  const handleEdit = () => setIsEditing(true);

  // save new location
  const handleSave = async () => {
    if (!user?.id) {
      alert("You must be logged in to save locations!");
      return;
    }
    if (!newLocation.title || !newLocation.address) {
      alert("Please fill title and address fields.");
      return;
    }
    try {
      setLoading(true);
      const updatedLocations = await addLocationApi(user.id, newLocation);
      setLocations(updatedLocations);
      setNewLocation({
        title: "",
        address: "",
        city: "",
        state: "",
        country: "",
        postal: "",
      });
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save location.");
    } finally {
      setLoading(false);
    }
  };

  // delete location
  const handleDelete = async (id) => {
    if (!user?.id) return;
    try {
      const updatedLocations = await deleteLocationApi(user.id, id);
      setLocations(updatedLocations);
    } catch (err) {
      console.error(err);
      alert("Failed to delete location.");
    }
  };

  // fetch GPS location
const handleFetchLocation = () => {
  if (!user?.id) {
    alert("You must be logged in to use GPS location!");
    return;
  }

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

        const newLoc = {
          title: "Current Location",
          address: data.display_name || "Current Location",
          city: data.address.city || data.address.town || data.address.village || "",
          state: data.address.state || "",
          country: data.address.country || "",
          postal: data.address.postcode || "",
        };

        const updatedLocations = await addLocationApi(user.id, newLoc);
        setLocations(updatedLocations);
        alert("Current location saved successfully!");
      } catch (err) {
        console.error(err);
        alert("Failed to fetch location info.");
      }
    },
    (error) => {
      console.error(error);
      switch (error.code) {
        case error.PERMISSION_DENIED:
          alert(
            "Location access denied. Please enable location permission in your browser settings and try again."
          );
          break;
        case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          alert("The request to get your location timed out. Try again.");
          break;
        default:
          alert("Unable to access your location.");
      }
    },
    { enableHighAccuracy: true, timeout: 10000 }
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
            <div key={loc._id} className="location-item">
              <div>
                <strong>{loc.title}</strong>
                <p className="small text-muted mb-1">{loc.address}</p>
                <p className="small text-muted">
                  {loc.city}, {loc.state}, {loc.country} - {loc.postal}
                </p>
              </div>
              <button className="delete-btn" onClick={() => handleDelete(loc._id)}>
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
          <button className="save-btn" onClick={handleSave} disabled={loading}>
            <Save size={18} /> {loading ? "Saving..." : "Save"}
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
            <input type="text" placeholder="City" name="city" value={newLocation.city} onChange={handleChange} />
            <input type="text" placeholder="State" name="state" value={newLocation.state} onChange={handleChange} />
          </div>
          <div className="grid-2">
            <input type="text" placeholder="Country" name="country" value={newLocation.country} onChange={handleChange} />
            <input type="text" placeholder="Postal Code" name="postal" value={newLocation.postal} onChange={handleChange} />
          </div>
        </div>
      )}

      {/* Styles */}
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
        .location-item:hover { background: #f1f5f9; }
        .delete-btn {
          border: none;
          background: none;
          color: #ef4444;
          cursor: pointer;
        }
        .divider { margin: 20px 0; border-top: 1px solid #e2e8f0; }
        .actions { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 20px; }
        .edit-btn, .save-btn, .gps-btn { border: none; border-radius: 8px; font-weight: 600; display: inline-flex; align-items: center; gap: 8px; cursor: pointer; padding: 10px 16px; }
        .edit-btn { background: #2563eb; color: white; }
        .save-btn { background: #16a34a; color: white; }
        .gps-btn { background: #f3f4f6; color: #0f172a; }
        .gps-btn:hover { background: #e5e7eb; }
        .form-section { display: flex; flex-direction: column; gap: 12px; background: #f8fafc; border-radius: 10px; padding: 16px; }
        input, textarea { width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px; font-size: 0.95rem; color: #0f172a; background: #fff; }
        input:focus, textarea:focus { border-color: #2563eb; outline: none; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        @media (max-width: 600px) { .grid-2 { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
