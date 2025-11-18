import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Placeholder
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useProductContext } from "../../context/ProductContext";

export default function NewArrival() {
  const { products, loadingProducts: loading } = useProductContext();

  const StarRating = ({ rating }) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);

    return (
      <div className="d-flex align-items-center justify-content-center mb-1">
        {[...Array(full)].map((_, i) => (
          <FaStar key={`full-${i}`} size={14} className="text-warning" />
        ))}
        {half && <FaStarHalfAlt size={14} className="text-warning" />}
        {[...Array(empty)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} size={14} className="text-muted" />
        ))}
      </div>
    );
  };

  return (
    <div style={{background:"#f9f9f9"}}>
      <Navbar />

      <Container className="py-4 my-5" style={{ background: "#F8F9FA" }}>
       

        <Row className="g-2">
          {loading
            ? [...Array(8)].map((_, idx) => (
                <Col key={idx} xs={6} sm={6} md={4} lg={3}>
                  <Card
                    className="rounded-4 w-100 h-100 position-relative"
                    style={{
                      background: "#fff",
                      overflow: "hidden",
                      border: "1px solid transparent"
                    }}
                  >
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
                        backgroundColor: "#f8f9fa"
                      }}
                    >
                      <Placeholder animation="glow" className="w-100 h-100">
                        <Placeholder xs={12} style={{ height: "150px" }} />
                      </Placeholder>
                    </div>

                    <Card.Body className="text-center">
                      <Card.Title>
                        <Placeholder animation="glow">
                          <Placeholder xs={6} />
                        </Placeholder>
                      </Card.Title>

                      <div className="d-flex justify-content-center mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Placeholder key={i} animation="glow">
                            <Placeholder xs={1} />
                          </Placeholder>
                        ))}
                      </div>

                      <Card.Text className="fw-bold fs-5">
                        <Placeholder animation="glow">
                          <Placeholder xs={4} />
                        </Placeholder>
                      </Card.Text>

                      <Button
                        variant="dark"
                        size="sm"
                        className="rounded-4 px-3 mt-auto"
                        disabled
                      >
                        View Item
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            : products.slice(0, 8).map((item) => (
                <Col
                  key={item.id}
                  xs={6}
                  sm={6}
                  md={4}
                  lg={3}
                  style={{ padding: "0", margin: "0" }}
                >
                  <Card
                    as={Link}
                    to={`/product/${item.id}`}
                    className="w-100 h-100 text-decoration-none text-dark"
                    style={{
                      cursor: "pointer",
                      background: "#F8F9FA",
                      border: "1px solid transparent",
                      transition: "all 0.25s ease",
                      borderRadius: "0px",
                      zIndex: 1
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(-5px) scale(1.02)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 20px rgba(0,0,0,0.15)";
                      e.currentTarget.style.border = "1px solid #ddd";
                      e.currentTarget.style.borderRadius = "12px";
                      e.currentTarget.style.zIndex = "5";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0) scale(1)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.border = "1px solid transparent";
                      e.currentTarget.style.borderRadius = "0px";
                      e.currentTarget.style.zIndex = "1";
                    }}
                  >
                    <Badge
                      bg="success"
                      text="light"
                      className="position-absolute"
                      style={{ top: "10px", left: "10px", zIndex: 10 }}
                    >
                      New
                    </Badge>

                    <div
                      style={{
                        height: "200px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#f8f9fa",
                        padding: "15px",
                        overflow: "hidden"
                      }}
                    >
                      <Card.Img
                        variant="top"
                        src={item.image}
                        alt={item.title}
                        style={{
                          maxHeight: "150px",
                          maxWidth: "100%",
                          objectFit: "contain"
                        }}
                      />
                    </div>

                    <Card.Body className="text-center d-flex flex-column">
                      {/* Title */}
                      <Card.Title
                        className="fs-6 fw-semibold text-truncate mb-1"
                        title={item.title}
                      >
                        {item.title}
                      </Card.Title>

                      {/* Multi-line description (2–3 lines) */}
                      <Card.Text
                        className="text-muted mb-2"
                        style={{
                          fontSize: "0.85rem",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis"
                        }}
                        title={item.description}
                      >
                        {item.description || "No description available."}
                      </Card.Text>

                      {/* Star rating */}
                      <StarRating rating={item.rating?.rate || 0} />

                      {/* Price */}
                      <Card.Text className="fw-bold fs-5 mt-auto">
                        ${item.price.toFixed(2)}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
        </Row>
      </Container>

      <Footer />
    </div>
  );
}
