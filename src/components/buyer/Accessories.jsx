// src/components/buyer/Accessories.jsx
import React from "react";
import { Container, Row, Col, Card, Badge, Placeholder } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useProductContext } from "../../context/ProductContext";

export default function Accessories() {
  const { products, loadingProducts: loading } = useProductContext();

  const accessories = products?.filter(
    (item) => (item.category || "").toLowerCase() === "jewelery"
  ) ?? [];

  const StarRating = ({ rating = 0 }) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);

    return (
      <div className="d-flex justify-content-center mb-1">
        {[...Array(full)].map((_, i) => (
          <FaStar key={`f-${i}`} size={14} className="text-warning" />
        ))}
        {half && <FaStarHalfAlt key="half" size={14} className="text-warning" />}
        {[...Array(empty)].map((_, i) => (
          <FaRegStar key={`e-${i}`} size={14} className="text-muted" />
        ))}
      </div>
    );
  };

  return (
    <div style={{background:"#f9f9f9"}}>
      <Navbar />
      <Container className="py-4 my-5" style={{background:"#F8F9FA"}}>
        <h2 className="fw-bold fs-4 mb-4" style={{ color: "#494949" }}>
          
        </h2>

        <Row className="g-3">
          {loading
            ? [...Array(8)].map((_, idx) => (
                <Col key={idx} xs={6} sm={6} md={4} lg={3}>
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
                    </Card.Body>
                  </Card>
                </Col>
              ))
            : accessories.length > 0
            ? accessories.map((item) => (
                <Col xs={6} sm={6} md={4} lg={3} key={item.id} className="d-flex align-items-stretch m-0 p-0">
                  <Card
                    as={Link}
                    to={`/product/${item.id}`}
                    className="border-0  w-100 h-100 position-relative text-decoration-none text-dark"
                    style={{ transition: "all 0.3s ease", cursor: "pointer", zIndex: 1 ,background:"#F8F9FA" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px) scale(1.02)";
                      e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
                      e.currentTarget.style.zIndex = "5";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0) scale(1)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.zIndex = "1";
                    }}
                  >
                    <Badge bg="danger" className="position-absolute" style={{ top: "10px", left: "10px", zIndex: 10 }}>
                      Accessories
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

                    <Card.Body className="text-center d-flex flex-column">
                      <Card.Title className="fs-6 fw-bold text-truncate mb-1" title={item.title}>
                        {item.title}
                      </Card.Title>

                      {/* Multi-line description */}
                      <Card.Text
                        className="text-muted mb-2"
                        style={{
                          fontSize: "0.85rem",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        title={item.description}
                      >
                        {item.description || "No description available."}
                      </Card.Text>

                      <StarRating rating={item.rating?.rate ?? 0} />

                      <Card.Text className="fw-bold fs-5 mt-auto">
                        ${item.price?.toFixed(2) ?? item.price}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            : <Col xs={12}><p className="text-center">No Accessories found.</p></Col>
          }
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
