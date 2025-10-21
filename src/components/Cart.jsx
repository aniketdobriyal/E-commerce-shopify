import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Cart({ cartItems = [], removeFromCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const itemsToDisplay =
    cartItems.length > 0
      ? cartItems
      : products.slice(0, 5).map((p) => ({ ...p, quantity: 1 }));

  const totalPrice = itemsToDisplay.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  if (loading) {
    return (
      <div>
        <Navbar />
        <Container className="py-5 text-center">
          <h4>Loading products...</h4>
        </Container>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#f7f8fa", minHeight: "100vh" }}>
      <Navbar />

      <Container className="py-5">
        <h2 className="fw-bold mb-4 text-center">Your Shopping Cart</h2>

        <Row className="gy-3">
          {itemsToDisplay.map((item) => (
            <Col key={item.id} xs={12}>
              <Card
                className="shadow-sm border-0 rounded-4 d-flex flex-row align-items-center"
                style={{
                  minHeight: "120px",
                  overflow: "hidden",
                  backgroundColor: "#fff",
                }}
              >
                {/* Image section */}
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
                  <Image
                    src={item.image}
                    alt={item.title}
                    fluid
                    style={{
                      maxHeight: "90px",
                      width: "auto",
                      objectFit: "contain",
                    }}
                  />
                </div>

                {/* Content */}
                <Card.Body
                  className="d-flex flex-row justify-content-between align-items-center w-100 py-2 px-3"
                  style={{ overflow: "hidden" }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h6
                      className="fw-semibold mb-1 text-truncate"
                      style={{
                        maxWidth: "80%",
                        fontSize: "1rem",
                      }}
                    >
                      {item.title}
                    </h6>
                    <p
                      className="text-success fw-bold mb-1"
                      style={{ fontSize: "1.1rem" }}
                    >
                      ${item.price.toFixed(2)}
                    </p>
                    <p className="text-muted mb-0 small">
                      Qty: {item.quantity || 1}
                    </p>
                  </div>

                  <div>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="rounded-5 px-3 py-1"
                      onClick={() =>
                        removeFromCart && removeFromCart(item.id)
                      }
                    >
                      Remove
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Total Section */}
        <div className="mt-4 text-end pe-2">
          <h5 className="fw-bold mb-2">Total: ${totalPrice.toFixed(2)}</h5>
          <Button
            variant="dark"
            className="mt-2 rounded-4 px-4 py-2 fw-semibold"
          >
            Proceed to Checkout
          </Button>
        </div>
      </Container>

      <Footer />
    </div>
  );
}
