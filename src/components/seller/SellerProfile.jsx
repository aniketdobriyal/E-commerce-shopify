import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";

export default function SellerProfile() {
  const [seller, setSeller] = useState({
    name: "Aniket Traders",
    email: "anikettraders@example.com",
    phone: "+91 9876543210",
    address: "Dehradun, Uttarakhand",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <Card className="shadow p-3" style={{ maxWidth: "600px" }}>
      <Card.Body>
        <h4>Seller Profile</h4>
        <Form>
          {Object.keys(seller).map((key) => (
            <Form.Group className="mb-2" key={key}>
              <Form.Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Form.Label>
              <Form.Control
                type="text"
                value={seller[key]}
                disabled={!isEditing}
                onChange={(e) => setSeller({ ...seller, [key]: e.target.value })}
              />
            </Form.Group>
          ))}
        </Form>
        <Button
          variant={isEditing ? "success" : "dark"}
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </Card.Body>
    </Card>
  );
}
