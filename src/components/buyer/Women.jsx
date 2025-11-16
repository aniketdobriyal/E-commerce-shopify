import React from "react";
import { Container, Row, Col, Card, Button, Placeholder, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useProductContext } from "../../context/ProductContext";

export default function Women() {
  const { products, loadingProducts: loading } = useProductContext();

  const womenProducts = products.filter(
    (item) => item.category === "women's clothing"
  );

  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="d-flex align-items-center mb-1 justify-content-center">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} size={14} className="text-warning" />
        ))}
        {halfStar && <FaStarHalfAlt key="half" size={14} className="text-warning" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} size={14} className="text-muted" />
        ))}
      </div>
    );
  };

  return (
    <>
      <Navbar />

      <Container className="py-4">
        <h2 className="fw-bold fs-4 mb-4" style={{ color: "#494949" }}>
          Women's Collection
        </h2>

        <Row className="g-3">
          {loading
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
                          <Placeholder key={i} animation="glow" className="mx-0.5">
                            <Placeholder xs={1} />
                          </Placeholder>
                        ))}
                      </div>

                      <Card.Text className="fw-bold fs-5 mb-2">
                        <Placeholder animation="glow">
                          <Placeholder xs={4} />
                        </Placeholder>
                      </Card.Text>

                      <Button variant="dark" size="sm" className="rounded-4 px-3 mt-auto" disabled>
                        Add to Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            : womenProducts.map((item) => (
                <Col xs={6} sm={6} md={4} lg={3} key={item.id} className="d-flex align-items-stretch">
                  <Card
                    as={Link}
                    to={`/product/${item.id}`}
                    className="shadow-sm border-0 rounded-4 w-100 h-100 position-relative text-decoration-none text-dark"
                    style={{ transition: "transform 0.3s ease", cursor: "pointer" }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                  >
                    <Badge
                      bg="warning"
                      text="dark"
                      className="position-absolute"
                      style={{ top: "10px", left: "10px", zIndex: 10 }}
                    >
                      Women
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
                        variant="top"
                        src={item.image}
                        alt={item.title}
                        style={{ maxHeight: "150px", maxWidth: "100%", objectFit: "contain" }}
                      />
                    </div>

                    <Card.Body className="text-center d-flex flex-column justify-content-between">
                      <Card.Title 
                      className="fs-6 fw-bold text-truncate mb-1" title={item.title}
                      
                        style={{ minHeight: "38px" }}
                      >

                        {item.title}
                       
                      </Card.Title>

                      <StarRating rating={item.rating?.rate || 0} />

                      <Card.Text className=" fw-bold fs-5 mb-2">
                        ${item.price.toFixed(2)}
                      </Card.Text>

                      <Button variant="dark" size="sm" className="rounded-4 px-3 mt-auto">
                        Add to Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
        </Row>
      </Container>

      <Footer />
    </>
  );
}
