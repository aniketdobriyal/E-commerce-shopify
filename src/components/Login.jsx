import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import { Form, Button, Row, Container, Col } from "react-bootstrap";
import { FaUser, FaLock } from "react-icons/fa";
import Footer from "./Footer";

export default function Login() {
  const emailRef = useRef(null);
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
      setHighlight(true);
      const timer = setTimeout(() => setHighlight(false), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <Navbar />

      <Container fluid className="p-0 ">
              {/* LEFT PANEL */}
        
        <Row
          className="
            g-0 
            min-vh-100 
            d-flex 
            justify-content-center 
            align-items-start align-items-lg-center
            p-4
          "
          style={{ backgroundColor: "#efefefff" , }}
        >
          <Col xs={12} sm={10} md={8} lg={5} xl={4}>
            <div style={{ width: "100%" }}>
              <h3
                className="mb-5 fw-bold text-center"
                style={{ color: "#4b0082" }}
              >
                User Login
              </h3>

              <Form>
                {/* Email/Username Input */}
                <Form.Group className="mb-4 position-relative">
                  <span className="position-absolute ps-3 pt-2 text-muted">
                    <FaUser />
                  </span>
                  <Form.Control
                    ref={emailRef}
                    type="email"
                    placeholder="Email or Username"
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
                    style={{
                      paddingLeft: "40px",
                      height: "45px",
                    }}
                  />
                </Form.Group>

                {/* Remember Me / Forgot Password */}
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
                  style={{
                    backgroundColor: "#5D3FD3",
                    borderColor: "#5D3FD3",
                  }}
                  className="w-100 py-2 fw-bold mb-4"
                >
                  LOG IN
                </Button>

                {/* Register Link */}
                <div className="text-center">
                  <span className="text-muted me-2">
                    Don't have an account?
                  </span>
                  <a
                    href="/register"
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
