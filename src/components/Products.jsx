import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Spinner from './Spinner';

function Products() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  // ⭐ Star Rating Component
  function StarRating({ rating }) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className='d-flex align-items-center mb-1'>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} size={14} className="text-warning" />
        ))}
        {halfStar && <FaStarHalfAlt key="half" size={14} className="text-warning" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} size={14} className="text-muted" />
        ))}
      </div>
    );
  }

  // 📦 Fetch all products
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch('https://fakestoreapi.com/products'); // fetch all products
        const parsedData = await data.json();
        setCards(parsedData);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {/* Embedded CSS for hover + layout consistency */}
      <style>{`
        .product-card {
          transition: all 0.3s ease;
          border-radius: 10px;
          overflow: hidden;
          background-color: #fff;
        }
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
        }
        .product-card img {
          transition: transform 0.3s ease;
        }
        .product-card:hover img {
          transform: scale(1.05);
        }
        .product-card .card-body {
          padding: 12px 15px !important;
        }
        .product-card .card-title {
          font-size: 0.95rem;
          line-height: 1.3;
          font-weight: 500;
        }
        .product-card h4 {
          font-size: 1.1rem;
        }
        .product-container {
          padding-left: 1rem;
          padding-right: 1rem;
        }
        @media (max-width: 576px) {
          .product-card {
            margin-bottom: 0.8rem;
          }
        }
      `}</style>

      <Container className="pt-3 pb-5 px-3 px-sm-4 product-container">
        <h2 className="mb-2 fw-bold text-dark">Shop Now</h2>
        <hr className="mb-4" style={{ width: '50px', borderTop: '3px solid #198754' }} />

        {loading ? (
          <div className="text-center py-5"><Spinner /></div>
        ) : (
          <Row className="g-3 g-md-4">
            {cards.map((card) => (
              <Col xs={6} md={4} lg={3} key={card.id}>
                {/* Entire card clickable */}
                <Card

                  as={Link}
                  to={`/product/${card.id}`}
                  className="border-0 shadow-sm h-100 text-decoration-none text-dark product-card"
                >
                  {/* Image Section */}
                  <div
                    className="p-3 d-flex align-items-center justify-content-center"
                    style={{
                      height: '200px',
                      backgroundColor: '#f9f9f9',
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={card.image}
                      alt={card.title}
                      style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        objectFit: 'contain'
                      }}
                    />
                  </div>

                  {/* Content Section */}
                  <Card.Body className="d-flex flex-column bg-white">
                    <Card.Title className="text-dark text-truncate mb-1">
                      {card.title}
                    </Card.Title>

                    <StarRating rating={card.rating.rate} />

                    <h4 className="fw-bolder text-dark mt-auto mb-1">
                      ${card.price.toFixed(2)}
                    </h4>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
}

export default Products;
