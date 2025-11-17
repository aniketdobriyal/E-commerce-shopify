import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, Button, Container, Row, Col, Modal } from "react-bootstrap";
import { FaStar, FaMapMarkerAlt, FaShieldAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";
import Spinner from "./Spinner";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ProductQueue from "./ProductQueue";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useProductContext } from "../../context/ProductContext";
import { fetchLocations } from "../../api/locationApi";
import { createOrder } from "../../api/orderApi";

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { products, loading: productLoading } = useProductContext();

  // Product & UI state
  const [product, setProduct] = useState(null);
  const [localLoading, setLocalLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showQuantity, setShowQuantity] = useState(false);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showLocationModal, setShowLocationModal] = useState(false);

  // Load product from context
  useEffect(() => {
    if (!productLoading && Array.isArray(products) && products.length > 0) {
      const found = products.find((p) => String(p._id || p.id) === String(id));
      setProduct(found || null);
      setTimeout(() => setLocalLoading(false), 400);
    }
  }, [productLoading, products, id]);

  // Load saved locations
  useEffect(() => {
    const loadLocations = async () => {
      if (!user?.id) return;
      try {
        const saved = await fetchLocations(user.id);
        setLocations(saved);
        if (saved.length > 0) {
          const latest = saved[saved.length - 1];
          setSelectedLocation(`${latest.address}, ${latest.city}, ${latest.state}, ${latest.postal}, ${latest.country}`);
        }
      } catch (err) {
        console.error("Failed to fetch locations:", err);
      }
    };
    loadLocations();
  }, [user]);

  // ✅ Handle Buy Now after login
  useEffect(() => {
    if (!product || !user?.id) return;

    const buyNowData = location.state?.buyNowData;
    if (buyNowData && buyNowData.productId === (product._id || product.id)) {
      setQuantity(buyNowData.quantity || 1);
      setTimeout(() => {
        handleBuyNow();
      }, 100); // ensure user is ready
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state, product, user]);

  if (productLoading || localLoading) {
    return (
      <>
        <Navbar />
        <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
          <Spinner />
        </div>
      </>
    );
  }

  if (!product) return <Container className="py-5">Product not found.</Container>;

  const currency = "$";

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login", { state: { from: `/product/${id}` } });
      return;
    }
    addToCart(product, quantity);
  };

  const handleBuyNow = async () => {
    if (!user || !user.id) {
      navigate("/login", {
        state: {
          from: `/product/${id}`,
          buyNowData: { productId: product._id || product.id, quantity },
        },
      });
      return;
    }

    try {
      const data = await createOrder({
        productId: product._id || product.id,
        quantity,
        amount: product.price * 100,
        userId: user.id,
      });

      if (!data.key_id) throw new Error("No key_id received from backend");

      const options = {
        key: data.key_id,
        amount: data.amount,
        currency: data.currency,
        name: "Demo Store",
        description: product.title,
        order_id: data.order_id,
        handler: function (response) {
          alert("Payment successful!");
          console.log("Payment details:", response);
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone || "",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment failed:", err);
      alert("Payment failed. Try again.");
    }
  };

  return (
    <>
      <Navbar />
      <Container className="my-5 overflow-hidden ">
        <Row className="gx-5">
          {/* Product Image */}
          <Col xs={12} lg={5} className="d-flex justify-content-center mb-4 mb-lg-0">
            <Card className="border-0 shadow-sm" style={{ width: "100%", maxWidth: "450px", borderRadius: "10px" }}>
              <div style={{ height: "400px", padding: "1.5rem", backgroundColor: "#f9f9f9" }} className="d-flex align-items-center justify-content-center">
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.title}
                  style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                />
              </div>
            </Card>
          </Col>

          {/* Product Details */}
          <Col xs={12} lg={4} className="p-4 p-lg-0">
            <h1 className="fw-bolder mb-3">{product.title}</h1>
            <div className="d-flex align-items-center mb-3">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  size={14}
                  className={i < Math.floor(product.rating?.rate ?? 0) ? "text-warning me-1" : "text-muted opacity-50 me-1"}
                />
              ))}
              <span className="text-muted ms-3">| {product.rating?.count ?? 0} reviews</span>
            </div>

            <hr className="my-3" />
            <h2 className="text-danger fw-bold mb-3">
              {currency} {product.price.toFixed(2)}
            </h2>
            <p className="text-muted small">Inclusive of all taxes & free shipping</p>

            <hr className="my-3" />
            <h5 className="fw-bold mb-2">Description</h5>
            <p className="text-secondary">{product.description}</p>

            <div className="mt-4">
              <span className="text-primary fw-bold">Category:</span>
              <span className="ms-2 text-capitalize">{product.category}</span>
            </div>
          </Col>

          {/* Purchase Section */}
          <Col xs={12} lg={3}>
            <div className="p-4 border shadow-sm" style={{ borderRadius: "10px" }}>
              <h3 className="text-success fw-bolder mb-3">
                {currency} {product.price.toFixed(2)}
              </h3>

              {/* Location */}
              <div className="d-flex align-items-center text-secondary mb-3" style={{ cursor: "pointer" }} onClick={() => setShowLocationModal(true)}>
                <FaMapMarkerAlt className="me-2" />
                <span className="small">Delivering to {selectedLocation || "Select location"}</span>
              </div>

              <p className="text-danger fw-bold fs-6">
                Only {product.rating?.count > 10 ? 10 : product.rating?.count} left in stock.
              </p>

              {/* Quantity */}
              <div className="my-3 border rounded shadow-sm">
                <div className="d-flex justify-content-between align-items-center p-2" style={{ cursor: "pointer" }} onClick={() => setShowQuantity(!showQuantity)}>
                  <span>Quantity: {quantity}</span>
                  {showQuantity ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                <div style={{ maxHeight: showQuantity ? "200px" : "0", overflow: "hidden", transition: "max-height 0.3s ease" }}>
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="p-2 border-top" style={{ cursor: "pointer" }} onClick={() => { setQuantity(i + 1); setShowQuantity(false); }}>
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>

              <Button variant="success" className="w-100 text-uppercase fw-bold mb-3 rounded-5" style={{ padding: "10px 0", fontSize: "12px" }} onClick={handleAddToCart}>
                Add to Cart ({quantity})
              </Button>

              <Button variant="danger" className="w-100 text-uppercase fw-bold rounded-5" style={{ padding: "10px 0", fontSize: "12px" }} onClick={handleBuyNow}>
                Buy Now
              </Button>

              <div className="d-flex align-items-center mt-3 small text-muted">
                <FaShieldAlt className="me-2" />
                Secure transaction guaranteed
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Location Modal */}
      <Modal show={showLocationModal} onHide={() => setShowLocationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select Delivery Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {locations.length > 0 ? (
            locations.map((loc) => (
              <div key={loc._id} className="p-2 border-bottom" style={{ cursor: "pointer" }} onClick={() => { setSelectedLocation(`${loc.address}, ${loc.city}, ${loc.state}, ${loc.postal}, ${loc.country}`); setShowLocationModal(false); }}>
                {loc.address}, {loc.city}, {loc.state}, {loc.postal}, {loc.country}
              </div>
            ))
          ) : (
            <p>No saved locations. Please add one in your profile.</p>
          )}
        </Modal.Body>
      </Modal>

      <ProductQueue />
      <Footer />
    </>
  );
}
