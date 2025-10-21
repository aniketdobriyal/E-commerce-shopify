import React, { useEffect, useState, useRef } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

function ProductQueue({ title = "Trending Products" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  // ⭐ Star Rating
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

  // 📦 Fetch Products
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products?limit=10");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // 🡸 Scroll Left
  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -220, behavior: "smooth" });
  };

  // 🡺 Scroll Right
  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 220, behavior: "smooth" });
  };

  // 🔹 Dragging support for desktop and touch
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isDown = false;
    let startX;
    let scrollLeftStart;

    const startDrag = (x) => {
      isDown = true;
      startX = x - container.offsetLeft;
      scrollLeftStart = container.scrollLeft;
    };

    const moveDrag = (x) => {
      if (!isDown) return;
      const walk = startX - x;
      container.scrollLeft = scrollLeftStart + walk;
    };

    const stopDrag = () => {
      isDown = false;
    };

    // Mouse events
    container.addEventListener("mousedown", (e) => startDrag(e.pageX));
    container.addEventListener("mousemove", (e) => moveDrag(e.pageX));
    container.addEventListener("mouseleave", stopDrag);
    container.addEventListener("mouseup", stopDrag);

    // Touch events
    container.addEventListener("touchstart", (e) => startDrag(e.touches[0].clientX), { passive: true });
    container.addEventListener("touchmove", (e) => moveDrag(e.touches[0].clientX), { passive: false });
    container.addEventListener("touchend", stopDrag);
    container.addEventListener("touchcancel", stopDrag);

    return () => {
      container.removeEventListener("mousedown", (e) => startDrag(e.pageX));
      container.removeEventListener("mousemove", (e) => moveDrag(e.pageX));
      container.removeEventListener("mouseleave", stopDrag);
      container.removeEventListener("mouseup", stopDrag);

      container.removeEventListener("touchstart", (e) => startDrag(e.touches[0].clientX));
      container.removeEventListener("touchmove", (e) => moveDrag(e.touches[0].clientX));
      container.removeEventListener("touchend", stopDrag);
      container.removeEventListener("touchcancel", stopDrag);
    };
  }, []);

  return (
    <div className="product-queue-section">
      <h4 className="product-queue-title">{title}</h4>

      {loading ? (
        <p className="text-muted">Loading products...</p>
      ) : (
        <>
          {/* Left Arrow */}
          <Button className="arrow-button arrow-left" onClick={scrollLeft}>
            <FaChevronLeft />
          </Button>

          {/* Right Arrow */}
          <Button className="arrow-button arrow-right" onClick={scrollRight}>
            <FaChevronRight />
          </Button>

          {/* Product Queue */}
          <div className="product-queue-container" ref={containerRef}>
            {products.map((product) => (
              <Card
                as={Link}
                to={`/product/${product.id}`}
                key={product.id}
                className="text-decoration-none text-dark product-card-horizontal"
              >
                <Card.Img variant="top" src={product.image} alt={product.title} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <StarRating rating={product.rating.rate} />
                  <h5>${product.price.toFixed(2)}</h5>
                </Card.Body>
              </Card>
            ))}
          </div>
        </>
      )}

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
          color: #0d6efd;
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
