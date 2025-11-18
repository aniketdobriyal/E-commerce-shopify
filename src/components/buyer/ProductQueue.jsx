import React, { useRef } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useProductContext } from "../../context/ProductContext";
import Spinner from "./Spinner";

function ProductQueue({ title = "Trending Products" }) {
  const { products, loadingProducts: loading } = useProductContext();
  const containerRef = useRef(null);

  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="d-flex align-items-center mb-1">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} size={13} className="text-warning" />
        ))}
        {halfStar && <FaStarHalfAlt size={13} className="text-warning" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} size={13} className="text-muted" />
        ))}
      </div>
    );
  };

  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -220, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 220, behavior: "smooth" });
  };

  return (
    <div className="product-queue-section"  style={{  background: " #f9f9f9"}}>
      <h4 className="product-queue-title">{title}</h4>

      {loading ? (
        // ✅ EXACT SAME STYLE AS ACCESSORIES LOADING
        <div className="product-queue-container d-flex" ref={containerRef}>
          {[...Array(10)].map((_, i) => (
            <Card key={i} className="product-card-horizontal" style={{ width: "200px", borderRadius: "14px" }}>
              <div
                style={{
                  height: "180px",
                  backgroundColor: "#f1f1f1",
                  borderTopLeftRadius: "14px",
                  borderTopRightRadius: "14px",
                }}
              ></div>

              <Card.Body>
                <div
                  style={{
                    width: "80%",
                    height: "12px",
                    backgroundColor: "#e0e0e0",
                    borderRadius: "5px",
                    marginBottom: "8px",
                  }}
                ></div>

                <div
                  style={{
                    width: "60%",
                    height: "12px",
                    backgroundColor: "#e0e0e0",
                    borderRadius: "5px",
                    marginBottom: "8px",
                  }}
                ></div>

                <div
                  style={{
                    width: "40%",
                    height: "14px",
                    backgroundColor: "#d6d6d6",
                    borderRadius: "5px",
                    marginTop: "10px",
                  }}
                ></div>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <>
          <Button className="arrow-button arrow-left" onClick={scrollLeft}>
            <FaChevronLeft />
          </Button>

          <Button className="arrow-button arrow-right" onClick={scrollRight}>
            <FaChevronRight />
          </Button>

          <div className="product-queue-container"  ref={containerRef}>
            {products.slice(0, 10).map((product) => (
              <Card
                as={Link}
                to={`/product/${product.id}`}
                key={product.id}  
                className="text-decoration-none text-dark product-card-horizontal"
              >
                <Card.Img variant="top" src={product.image} alt={product.title} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <StarRating rating={product.rating?.rate || 0} />
                  <h5>${product.price.toFixed(2)}</h5>
                </Card.Body>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* ⛔ NO CHANGES BELOW */}
      <style>{`
        .product-queue-section {
          position: relative;
          padding: 2rem 1rem;
          background: linear-gradient(180deg, #f9fafb 0%, #fff 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .product-queue-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #222;
          margin-bottom: 1.5rem;
        }

        .product-queue-container {
          display: flex;
          gap: 1.2rem;
          overflow-x: auto;
          scroll-behavior: smooth;
          width: 90%;
          padding-bottom: 0.5rem;
          cursor: grab;
          -webkit-overflow-scrolling: touch;
        }

        .product-queue-container:active {
          cursor: grabbing;
        }

        .product-card-horizontal {
          flex: 0 0 200px;
          border: none;
          border-radius: 14px;
          background: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .product-card-horizontal:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.15);
        }

        .product-card-horizontal img {
          height: 180px;
          object-fit: contain;
          padding: 15px;
          transition: transform 0.3s ease;
        }

        .product-card-horizontal:hover img {
          transform: scale(1.07);
        }

        .product-card-horizontal .card-body {
          padding: 0.7rem 0.9rem;
          text-align: left;
        }

        .product-card-horizontal .card-title {
          font-size: 0.95rem;
          font-weight: 500;
          color: #333;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 0.2rem;
        }

        .product-card-horizontal h5 {
          font-size: 1.05rem;
        
          font-weight: 700;
          margin-top: 0.3rem;
        }

        .arrow-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.9);
          color:black;
          border: none;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 10;
        }

        .arrow-button:hover {
          background: #198754;
          color: white;
          transform: translateY(-50%) scale(1.1);
        }

        .arrow-left { left: 5px; }
        .arrow-right { right: 5px; }

        @media (max-width: 576px) {
          .product-card-horizontal { flex: 0 0 160px; }
          .product-card-horizontal img { height: 150px; }
          .arrow-button { width: 35px; height: 35px; }
        }
      `}</style>
    </div>
  );
}

export default ProductQueue;
