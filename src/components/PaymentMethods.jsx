import React, { useState } from "react";
import { Container, Card, Button, Form, Row, Col } from "react-bootstrap";
import { CreditCard, Edit3, Trash2, PlusCircle } from "lucide-react";

export default function PaymentMethods({ user, onUpdate }) {
  // Handle undefined payment methods
  const initialMethods = user?.paymentMethods || [];

  const [methods, setMethods] = useState(initialMethods);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({ brand: "", last4: "", expiry: "" });

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setFormData({ ...methods[index] });
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const updated = [...methods];
    updated[editingIndex] = { ...formData, id: methods[editingIndex].id };
    setMethods(updated);
    setEditingIndex(null);
    onUpdate && onUpdate({ ...user, paymentMethods: updated });
  };

  const handleRemove = (index) => {
    if (window.confirm("Are you sure you want to remove this payment method?")) {
      const updated = methods.filter((_, i) => i !== index);
      setMethods(updated);
      onUpdate && onUpdate({ ...user, paymentMethods: updated });
    }
  };

  const handleAddNew = () => {
    const newMethod = { id: Date.now(), brand: "", last4: "", expiry: "" };
    setMethods((prev) => [...prev, newMethod]);
    setEditingIndex(methods.length);
    setFormData(newMethod);
  };

  return (
    <Container className="py-4">
      <h3 className="fw-bold mb-3 d-flex align-items-center gap-2">
        <CreditCard size={22} className="text-primary" />
        Payment Methods
      </h3>

      {methods.length === 0 && (
        <p className="text-muted text-center mb-4">
          No payment methods added yet.
        </p>
      )}

      <Row className="g-3">
        {methods.map((method, index) => (
          <Col xs={12} md={6} key={method.id}>
            <Card className="shadow-sm rounded-4 p-3 h-100 border-0">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="d-flex align-items-center gap-2">
                  <CreditCard size={22} className="text-primary" />
                  <span className="fw-semibold">
                    {editingIndex === index
                      ? "Editing Payment"
                      : `${method.brand || "Card"} ****${method.last4 || "----"}`}
                  </span>
                </div>
                <div>
                  {editingIndex === index ? (
                    <Button
                      size="sm"
                      variant="success"
                      className="rounded-pill"
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        variant="outline-primary"
                        className="rounded-pill me-2"
                        onClick={() => handleEditClick(index)}
                      >
                        <Edit3 size={16} /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        className="rounded-pill"
                        onClick={() => handleRemove(index)}
                      >
                        <Trash2 size={16} /> Remove
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {editingIndex === index && (
                <Form className="mt-3">
                  <Form.Group className="mb-2">
                    <Form.Label className="fw-semibold">Card Brand</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.brand}
                      onChange={(e) => handleChange("brand", e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label className="fw-semibold">Last 4 Digits</Form.Label>
                    <Form.Control
                      type="text"
                      maxLength={4}
                      value={formData.last4}
                      onChange={(e) => handleChange("last4", e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label className="fw-semibold">Expiry</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={(e) => handleChange("expiry", e.target.value)}
                    />
                  </Form.Group>
                </Form>
              )}
            </Card>
          </Col>
        ))}
      </Row>

      <div className="text-center mt-4">
        <Button
          variant="primary"
          className="rounded-pill d-inline-flex align-items-center gap-2 px-4"
          onClick={handleAddNew}
        >
          <PlusCircle size={18} /> Add New Payment Method
        </Button>
      </div>

      <style>{`
        h3 {
          font-size: 1.3rem;
        }
        .form-label {
          font-weight: 600;
        }
        .card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
        }
        @media (max-width: 600px) {
          h3 {
            font-size: 1.1rem;
          }
          .card {
            padding: 14px;
          }
        }
      `}</style>
    </Container>
  );
}
