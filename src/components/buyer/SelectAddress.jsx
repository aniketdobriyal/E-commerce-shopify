import React from "react";
import { useParams } from "react-router-dom";

export default function SelectAddress() {
  const { id } = useParams(); // This gets the product ID from the URL
  console.log("Product ID:", id);

  return (
    <div>
      <h2>Select Address for Product ID: {id}</h2>
      {/* Your address selection UI goes here */}
    </div>
  );
}
