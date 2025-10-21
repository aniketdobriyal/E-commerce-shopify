import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // ✅ Required for star ratings

export default function Accessories() {
  const [accessoryProducts, setAccessoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const accessoriesRes = await fetch(
          "https://fakestoreapi.com/products/category/jewelery"
        );
        const accessoriesData = await accessoriesRes.json();
        setAccessoryProducts(accessoriesData);
      } catch (error) {
        console.error("Error fetching accessories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
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
        <h2 className="fw-bold text-center mb-4 text-uppercase">Accessories Collection</h2>

        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="success" />
          </div>
        ) : (
          <Row className="g-3">
            {accessoryProducts.map((item) => (
              <Col key={item.id} xs={6} sm={6} md={4} lg={3} className="d-flex align-items-stretch">
                <Card
                  as={Link}
                  to={`/product/${item.id}`}
                  className="shadow-sm border-0 rounded-4 w-100 h-100 text-decoration-none text-dark"
                  style={{
                    transition: "transform 0.3s ease",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  {/* IMAGE */}
                  <div
                    style={{
                      width: "100%",
                      height: "200px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#f8f9fa",
                      padding: "15px",
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={item.image}
                      alt={item.title}
                      style={{ maxWidth: "150px", maxHeight: "150px", objectFit: "contain" }}
                    />
                  </div>

                  {/* CARD BODY */}
                  <Card.Body className="text-center d-flex flex-column justify-content-between">
                    <Card.Title
                      className="fs-6 fw-bold mb-2 text-truncate"
                      title={item.title}
                    >
                      {item.title}
                    </Card.Title>

                    <StarRating rating={item.rating.rate} />

                    <Card.Text className="text-success fw-semibold fs-5 mb-2">
                      ${item.price}
                    </Card.Text>

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
