import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function Sale() {
  const [saleProducts, setSaleProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSaleProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products?limit=8");
        const data = await res.json();

        const saleData = data.map((item) => ({
          ...item,
          discount: Math.floor(Math.random() * 40) + 10, // 10% to 50% off
        }));

        setSaleProducts(saleData);
      } catch (error) {
        console.error("Error fetching sale products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSaleProducts();
  }, []);

  // ⭐ Star Rating Component
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
        <h2 className="fw-bold fs-4  mb-4  " style={{fontFamily:"font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",color:'#494949ff'}}>Flash Sale</h2>

        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="danger" />
          </div>
        ) : (
          <Row className="g-3">
            {saleProducts.map((item) => (
              <Col key={item.id} xs={6} sm={6} md={4} lg={3} className="d-flex align-items-stretch">
                <Card
                  as={Link}
                  to={`/product/${item.id}`}
                  className="shadow-sm border-0 rounded-4 w-100 h-100 text-decoration-none text-dark position-relative"
                  style={{ transition: "transform 0.3s ease", cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  {/* Stylish Discount Badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "-30px",
                      backgroundColor: "#ff4d4f",
                      color: "#fff",
                      padding: "10px 40px",
                      fontWeight: "700",
                      fontSize: "0.9rem",
                      transform: "rotate(-25deg)",
                      zIndex: 10,
                      boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
                    }}
                  >
                    {item.discount}% OFF
                  </div>

                  {/* Image Container */}
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
                      style={{ maxHeight: "150px", width: "auto", objectFit: "contain" }}
                    />
                  </div>

                  {/* Card Body */}
                  <Card.Body className="text-center d-flex flex-column justify-content-between">
                    <Card.Title
                      className="fs-6 fw-bold text-truncate mb-1"
                      title={item.title}
                      style={{ minHeight: "38px" }}
                    >
                      {item.title}
                    </Card.Title>

                    <StarRating rating={item.rating?.rate || 0} />

                    <div className="mb-2">
                      <span className="text-muted text-decoration-line-through me-2">
                        ${item.price.toFixed(2)}
                      </span>
                      <span className="text-success fw-bold fs-5">
                        ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                      </span>
                    </div>

                    <Button variant="dark" size="sm" className="rounded-4 px-3 mt-auto">
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      <Footer />
    </>
  );
}
