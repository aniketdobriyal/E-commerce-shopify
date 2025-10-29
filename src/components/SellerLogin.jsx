import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Row, Container, Col } from "react-bootstrap";
import { FaUser, FaLock, FaStore } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function SellerLogin() {
  const emailRef = useRef(null);
  const [highlight, setHighlight] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Focus on email input and animate border
  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
      setHighlight(true);
      const timer = setTimeout(() => setHighlight(false), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Handle Seller Login
  const handleLogin = (e) => {
    e.preventDefault();

    // Demo credentials (you can replace this with backend logic later)
    if (email === "seller@demo.com" && password === "seller123") {
      localStorage.setItem("sellerLoggedIn", "true");
      localStorage.setItem("sellerEmail", email);

      navigate("/profile?section=seller");
    } else {
      alert("Invalid seller credentials! Try: seller@demo.com / seller123");
    }
  };

  return (
    <>
      <Navbar />

      <Container fluid className="p-0">
        <Row
          className="
            g-0 
            min-vh-100 
            d-flex 
            justify-content-center 
            align-items-start align-items-lg-center
            p-4
          "
          style={{ backgroundColor: "#efefef" }}
        >
          <Col xs={12} sm={10} md={8} lg={5} xl={4}>
            <div
              className="p-4 bg-white shadow-lg rounded-4"
              style={{ width: "100%" }}
            >
              <div className="text-center mb-4">
                <FaStore size={40} color="#5D3FD3" className="mb-2" />
                <h3 className="fw-bold" style={{ color: "#4b0082" }}>
                  Seller Login
                </h3>
                <p className="text-muted small">
                  Access your seller dashboard and manage your store
                </p>
              </div>

              <Form onSubmit={handleLogin}>
                {/* Email Input */}
                <Form.Group className="mb-4 position-relative">
                  <span className="position-absolute ps-3 pt-2 text-muted">
                    <FaUser />
                  </span>
                  <Form.Control
                    ref={emailRef}
                    type="email"
                    placeholder="Seller Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      paddingLeft: "40px",
                      height: "45px",
                      border: highlight
                        ? "2px solid #5D3FD3"
                        : "1px solid #ccc",
                      transition: "border 0.3s",
                    }}
                  />
                </Form.Group>

                {/* Password Input */}
                <Form.Group className="mb-3 position-relative">
                  <span className="position-absolute ps-3 pt-2 text-muted">
                    <FaLock />
                  </span>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      paddingLeft: "40px",
                      height: "45px",
                    }}
                  />
                </Form.Group>

                {/* Remember / Forgot */}
                <Row className="mb-4 d-flex align-items-center">
                  <Col xs={6}>
                    <Form.Check
                      type="checkbox"
                      label="Remember Me"
                      className="text-muted"
                    />
                  </Col>
                  <Col xs={6} className="text-end">
                    <a
                      href="/forgot-password"
                      className="text-decoration-none small"
                      style={{ color: "#5D3FD3" }}
                    >
                      Forgot Password?
                    </a>
                  </Col>
                </Row>

                {/* Login Button */}
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#5D3FD3",
                    borderColor: "#5D3FD3",
                  }}
                  className="w-100 py-2 fw-bold mb-4"
                >
                  LOG IN
                </Button>

                {/* Seller Registration */}
                <div className="text-center">
                  <span className="text-muted me-2">
                    Not a seller yet?
                  </span>
                  <a
                    href="/seller-register"
                    className="text-decoration-none fw-bold"
                    style={{ color: "#5D3FD3" }}
                  >
                    Register Now
                  </a>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}
