import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import { Heart } from "lucide-react";

export default function Wishlist({ wishlistItems = [], removeFromWishlist }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(wishlistItems);
  }, [wishlistItems]);

  const handleRemove = (id) => {
    // Update local state
    setItems((prev) => prev.filter((item) => item.id !== id));
    // Notify parent
    removeFromWishlist && removeFromWishlist(id);
  };

  if (items.length === 0) {
    return (
      <Container className="py-5">
        <div className="text-center py-5 mt-4 bg-white rounded-4 shadow-sm" style={{ minHeight: "200px" }}>
          <Heart size={60} color="#e5e7eb" />
          <h3 className="fw-semibold mt-3">Your Wishlist is Empty!</h3>
          <p className="text-muted mt-1">Looks like you haven't saved any items yet.</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="">
      <h2 className="fw-bold mb-4 text-center d-flex justify-content-center align-items-center">
        <Heart size={28} color="#ef4444" className="me-2" />
        Your Wishlist
      </h2>
      <p className="text-center text-muted mb-4">{items.length} items</p>

      <Row className="gy-3">
        {items.map((item) => (
          <Col key={item.id} xs={12}>
            <Card className="shadow-sm border-0 rounded-4 d-flex flex-row align-items-center" style={{ minHeight: "120px", backgroundColor: "#fff" }}>
              {/* Image */}
              <div
                style={{
                  width: "110px",
                  height: "110px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#f0f0f0",
                  flexShrink: 0,
                  borderTopLeftRadius: "14px",
                  borderBottomLeftRadius: "14px",
                }}
              >
                <Image src={item.image} alt={item.title} fluid style={{ maxHeight: "90px", objectFit: "contain" }} />
              </div>

              {/* Info */}
              <Card.Body className="d-flex flex-row justify-content-between align-items-center w-100 py-2 px-3">
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h6 className="fw-semibold mb-1 text-truncate" style={{ maxWidth: "80%" }}>
                    {item.title}
                  </h6>
                  <p className="text-success fw-bold mb-1">${item.price.toFixed(2)}</p>
                </div>

                {/* Actions */}
                <div className="d-flex flex-column gap-2">
                  <Button size="sm" className="rounded-5 btn-primary px-3 py-1">
                    Add to Cart
                  </Button>
                  <Button size="sm" variant="outline-danger" className="rounded-5 px-3 py-1" onClick={() => handleRemove(item.id)}>
                    Remove
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
