// src/api/locationApi.js
import axios from "axios";

//const BASE_URL = "http://localhost:5000/api/location";
  const BASE_URL = "https://e-commerce-shopify-backend.onrender.com/api/location";                                            
// Fetch all locations for a user
export const fetchLocations = async (userId) => {
  try {
    const res = await axios.get(`${BASE_URL}/${userId}`);
    return res.data.locations || [];
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch locations");
  }
};

// Add a new location
export const addLocationApi = async (userId, locationData) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/add`,
      { userId, ...locationData },
      { headers: { "Content-Type": "application/json" } }
    );
    return res.data.locations || [];
  } catch (error) {
    console.error("Error adding location:", error);
    throw new Error(error.response?.data?.message || "Failed to add location");
  }
};

// Delete a location
export const deleteLocationApi = async (userId, locationId) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${userId}/${locationId}`);
    return res.data.locations || [];
  } catch (error) {
    console.error("Error deleting location:", error);
    throw new Error(error.response?.data?.message || "Failed to delete location");
  }
};
