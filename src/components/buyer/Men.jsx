// src/components/buyer/Men.jsx
import React, { useMemo } from "react";
import { Container, Row, Col, Card, Button, Placeholder, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useProductContext } from "../../context/ProductContext";

export default function Men() {
  const ctx = useProductContext?.() || {};
  const productsFromContext = ctx.products ?? ctx.items ?? [];
  const loadingProductsFlag = ctx.loadingProducts;
  const loadingFlag = ctx.loading;

  const isLoading = loadingProductsFlag ?? loadingFlag ?? false;

  const navigate = useNavigate();

  const StarRating = ({ rating = 0 }) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return (
      <div className="d-flex align-items-center justify-content-center mb-1">
        {[...Array(full)].map((_, i) => <FaStar key={`f-${i}`} size={14} className="text-warning" />)}
        {half && <FaStarHalfAlt key="half" size={14} className="text-warning" />}
        {[...Array(empty)].map((_, i) => <FaRegStar key={`e-${i}`} size={14} className="text-muted" />)}
      </div>
    );
  };

  // Filter men's products
  const mensProducts = useMemo(() => {
    if (!Array.isArray(productsFromContext)) return [];
    return productsFromContext.filter((item) => {
      const cat = (item?.category || "").toString().toLowerCase();
      return cat === "men" || cat === "men's clothing"; // adjust based on your API
    });
  }, [productsFromContext]);

  return (
    <>
      <Navbar />
      <Container className="py-4">
          <h2 className="fw-bold fs-4 mb-4" style={{ color: "#494949" }}>Men's Collection</h2>

        <Row className="g-3">
          {isLoading
            ? [...Array(8)].map((_, idx) => (
                <Col xs={6} sm={6} md={4} lg={3} key={idx}>
                  <Card className="shadow-sm border-0 rounded-4 w-100 h-100 position-relative">
                    <Badge
                      bg="secondary"
                      text="light"
                      className="position-absolute"
                      style={{ top: "10px", left: "10px", zIndex: 10 }}
                    >
                      Loading
                    </Badge>
                    <div
                      style={{
                        height: "200px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#f8f9fa",
                        borderTopLeftRadius: "12px",
                        borderTopRightRadius: "12px",
                        overflow: "hidden",
                      }}
                    >
                      <Placeholder animation="glow" className="w-100 h-100">
                        <Placeholder xs={12} style={{ height: "150px", borderRadius: "8px" }} />
                      </Placeholder>
                    </div>
                    <Card.Body className="text-center d-flex flex-column justify-content-between">
                      <Card.Title className="mb-2">
                        <Placeholder animation="glow">
                          <Placeholder xs={6} />
                        </Placeholder>
                      </Card.Title>
                      <div className="d-flex justify-content-center mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Placeholder key={i} animation="glow" className="mx-1">
                            <Placeholder xs={1} />
                          </Placeholder>
                        ))}
                      </div>
                      <Card.Text className="fw-bold fs-5 mb-2">
                        <Placeholder animation="glow">
                          <Placeholder xs={4} />
                        </Placeholder>
                      </Card.Text>
                      <Button variant="dark" size="sm" className="rounded-4 mt-auto" disabled>
                        View Item
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            : mensProducts.length > 0
            ? mensProducts.map((item) => (
                <Col xs={6} sm={6} md={4} lg={3} key={item.id} className="d-flex align-items-stretch">
                  <Card
                    as={Link}
                    to={`/product/${item.id}`}
                    className="shadow-sm border-0 rounded-4 w-100 h-100 position-relative text-decoration-none text-dark"
                    style={{ transition: "0.3s", cursor: "pointer" }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                  >
                    <Badge
                      bg="primary"
                      className="position-absolute"
                      style={{ top: "10px", left: "10px", zIndex: 10 }}
                    >
                      Men
                    </Badge>

                    <div
                      style={{
                        height: "200px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#f8f9fa",
                        padding: "15px",
                        borderTopLeftRadius: "12px",
                        borderTopRightRadius: "12px",
                        overflow: "hidden",
                      }}
                    >
                      <Card.Img
                        src={item.image}
                        alt={item.title}
                        style={{ maxHeight: "150px", maxWidth: "100%", objectFit: "contain" }}
                      />
                    </div>

                    <Card.Body className="text-center d-flex flex-column justify-content-between">
                      <Card.Title className="fs-6 fw-bold text-truncate mb-1" title={item.title} style={{ minHeight: "38px" }}>
                        {item.title}
                      </Card.Title>

                      <StarRating rating={item.rating?.rate ?? 0} />

                      <Card.Text className="fw-bold fs-5 mb-2">
                        ${item.price?.toFixed(2) ?? item.price}
                      </Card.Text>

                      <Button variant="dark" size="sm" className="rounded-4 mt-auto">
                        View Item
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            : <Col xs={12}><p className="text-center">No Men's items found.</p></Col>
          }
        </Row>
      </Container>
      <Footer />
    </>
  );
}
