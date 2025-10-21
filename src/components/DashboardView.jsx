import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { MapPin } from "lucide-react";

export default function DashboardView({ user, handleNavClick }) {
  const [editSection, setEditSection] = useState(null);
  const [formData, setFormData] = useState({
    name: user.name,
    gender: user.gender || "",
    email: user.email,
    phone: user.phone,
    address: `${user.city}, ${user.state}, ${user.country} - ${user.postal}`
  });

  const handleEditClick = (section) => setEditSection(section);

  const handleSave = (section) => {
    console.log(`Saved ${section}:`, formData[section] || formData);
    setEditSection(null);
  };

  const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const renderPersonalInfo = () => (
    <>
      <Form.Group className="mb-3 d-flex align-items-center">
        <Form.Label className="text-muted fw-semibold" style={{ width: "25%" }}>Name</Form.Label>
        <Form.Control
          type="text"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          disabled={editSection !== "personal"}
          style={{ width: "60%" }}
        />
           {editSection === "personal" && (
        <Button variant="primary" className="mx-2" onClick={() => handleSave("personal")}>Save</Button>
      )}
      </Form.Group>
      <Form.Group className="mb-3 d-flex align-items-center">
        
        <Form.Label className="text-muted fw-semibold" style={{ width: "25%" }}>Gender</Form.Label>
        <div style={{ width: "60%" }} className="d-flex gap-3">
          {["Male", "Female", "Other"].map(g => (
            <Form.Check
              key={g}
              type="radio"
              name="gender"
              label={g}
              value={g}
              checked={formData.gender === g}
              onChange={(e) => handleChange("gender", e.target.value)}
              disabled={editSection !== "personal"}
            />
          ))}
          
        </div>
      </Form.Group>
   
    </>
  );

  const sectionRow = (label, field, isTextarea = false) => (
    <Form.Group className="mb-3 d-flex align-items-center">
      <Form.Label className="text-muted fw-semibold" style={{ width: "25%" }}>{label}</Form.Label>
      <div style={{ width: "60%" }}>
        <Form.Control
          as={isTextarea ? "textarea" : "input"}
          rows={isTextarea ? 2 : undefined}
          value={formData[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          disabled={editSection !== field}
        />
      </div>
      {editSection === field && (
        <Button variant="primary" className="ms-2" onClick={() => handleSave(field)}>Save</Button>
      )}
    </Form.Group>
  );

  return (
    <Container className="py-4">


      <Card className="shadow-sm rounded-4 mb-5 p-4" style={{ backgroundColor: "#fff" }}>
        <Row className="align-items-start">
          <Col xs={12} md={2} className="text-center mb-3 mb-md-0">
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "#d1d5db",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "32px",
                color: "#fff",
                fontWeight: "700",
              }}
            >
              {user.name.charAt(0)}
            </div>
          </Col>

          <Col xs={12} md={10}>
            {/* Personal Information */}
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="fw-bold mb-0">Personal Information</h5>
              <Button
                variant="link"
                className="p-0 fw-bold text-decoration-none"
                onClick={() => handleEditClick("personal")}
              >
                Edit
              </Button>
            </div>
            {renderPersonalInfo()}

            {/* Email */}
            <div className="d-flex justify-content-between align-items-center mt-4 mb-2">
              <h5 className="fw-bold mb-0">Email Address</h5>
              <Button
                variant="link"
                className="p-0 fw-bold text-decoration-none"
                onClick={() => handleEditClick("email")}
              >
                Edit
              </Button>
            </div>
            {sectionRow("Email", "email")}

            {/* Phone */}
            <div className="d-flex justify-content-between align-items-center mt-4 mb-2">
              <h5 className="fw-bold mb-0">Mobile Number</h5>
              <Button
                variant="link"
                className="p-0 fw-bold text-decoration-none"
                onClick={() => handleEditClick("phone")}
              >
                Edit
              </Button>
            </div>
            {sectionRow("Phone", "phone")}

            {/* Address */}
         
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
