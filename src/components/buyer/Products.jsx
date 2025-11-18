import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useProductContext } from "../../context/ProductContext";
import { Link } from "react-router-dom";
import Spinner from './Spinner';

function Products() {
  const { products, loadingProducts: loading } = useProductContext();

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

  return (
    <>
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
        
        /* ⭐ Add 2-line description truncation */
        .text-truncate-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
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
            {products.map((card) => (
              <Col xs={6} md={4} lg={3} key={card.id} className='m-0 p-0' style={{background:"#F8F9FA"}}>
                <Card
                  as={Link}
                  to={`/product/${card.id}`}
                  className="border-0 h-100 text-decoration-none text-dark product-card"
                >
                  <div className="p-3 d-flex align-items-center justify-content-center"
                    style={{ height: '200px', backgroundColor: '#f9f9f9' }}>
                    <Card.Img
                      variant="top"
                      src={card.image}
                      alt={card.title}
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                    />
                  </div>

                  <Card.Body className="d-flex flex-column" style={{background:"#F8F9FA"}}>
                    <Card.Title className="text-dark text-truncate mb-1">
                      {card.title}
                    </Card.Title>

                    {/* ⭐ ADDED DESCRIPTION (2 lines only) */}
                    <p className="text-muted small text-truncate-2 mb-1">
                      {card.description}
                    </p>

                    <StarRating rating={card.rating?.rate || 0} />

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
