import React, { useState } from "react";
import { Container, Card, Button, Form, Row, Col } from "react-bootstrap";
import { CreditCard, Edit3, Trash2 } from "lucide-react";

export default function PaymentMethods({ user, onUpdate }) {
  // Fallback in case user.paymentMethods is undefined
  const initialMethods = user.paymentMethods || [];

  const [methods, setMethods] = useState(initialMethods);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({ brand: "", last4: "", expiry: "" });

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setFormData({ ...methods[index] });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const updated = [...methods];
    updated[editingIndex] = { ...formData, id: methods[editingIndex].id };
    setMethods(updated);
    setEditingIndex(null);
    onUpdate && onUpdate({ ...user, paymentMethods: updated });
  };

  const handleRemove = (index) => {
    const updated = methods.filter((_, i) => i !== index);
    setMethods(updated);
    onUpdate && onUpdate({ ...user, paymentMethods: updated });
  };

  const handleAddNew = () => {
    const newMethod = { id: Date.now(), brand: "", last4: "", expiry: "" };
    setMethods(prev => [...prev, newMethod]);
    setEditingIndex(methods.length);
    setFormData(newMethod);
  };

  return (
    <Container className="py-4">


      {methods.length === 0 && (
        <p className="text-muted text-center">No payment methods added yet.</p>
      )}

      <Row className="g-3">
        {methods.map((method, index) => (
          <Col xs={12} md={6} key={method.id}>
            <Card className="shadow-sm rounded-4 p-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="d-flex align-items-center gap-2">
                  <CreditCard size={24} />
                  {editingIndex === index ? "Editing Payment" : `${method.brand} ****${method.last4}`}
                </div>
                <div>
                  {editingIndex === index ? (
                    <Button size="sm" variant="success" onClick={handleSave}>Save</Button>
                  ) : (
                    <>
                      <Button size="sm" variant="outline-primary" className="me-2" onClick={() => handleEditClick(index)}>
                        <Edit3 size={16} /> Edit
                      </Button>
                      <Button size="sm" variant="outline-danger" onClick={() => handleRemove(index)}>
                        <Trash2 size={16} /> Remove
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {editingIndex === index && (
                <Form>
                  <Form.Group className="mb-2">
                    <Form.Label>Card Brand</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.brand}
                      onChange={(e) => handleChange("brand", e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Last 4 Digits</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.last4}
                      onChange={(e) => handleChange("last4", e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Expiry</Form.Label>
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
        <Button variant="primary" onClick={handleAddNew}>Add New Payment Method</Button>
      </div>
    </Container>
  );
}
