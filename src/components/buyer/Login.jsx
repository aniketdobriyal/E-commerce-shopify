import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import { Form, Button, Row, Container, Col, Spinner } from "react-bootstrap";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Footer from "./Footer";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const emailRef = useRef(null);
  const [highlight, setHighlight] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 added
  const [error, setError] = useState("");

  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/dashboard";
  const buyNowData = location.state?.buyNowData || null;

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
      setHighlight(true);
      const timer = setTimeout(() => setHighlight(false), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const res = await login(email, password);
    if (!res.success) {
      setError(res.message || "Login failed");
      return;
    }

    navigate(from, {
      replace: true,
      state: buyNowData ? { buyNowData } : undefined,
    });
  };

  return (
    <>
      <Navbar />

      <Container fluid className="p-0">
        <Row
          className="min-vh-100 d-flex justify-content-center align-items-center p-4"
          style={{ backgroundColor: "#efefef" }}
        >
          <Col xs={12} sm={10} md={8} lg={5} xl={4}>
            <h3 className="mb-5 fw-bold text-center" style={{ color: "#4b0082" }}>
              User Login
            </h3>

            <Form onSubmit={handleLogin}>
              {/* EMAIL */}
              <Form.Group className="mb-4 position-relative">
                <span className="position-absolute ps-3 pt-2 text-muted">
                  <FaUser />
                </span>
                <Form.Control
                  ref={emailRef}
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    paddingLeft: "40px",
                    height: "45px",
                    border: highlight ? "2px solid #5D3FD3" : "1px solid #ccc",
                  }}
                  required
                />
              </Form.Group>

              {/* PASSWORD WITH EYE ICON */}
              <Form.Group className="mb-4 position-relative">
                <span className="position-absolute ps-3 pt-2 text-muted">
                  <FaLock />
                </span>

                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: "40px", height: "45px" }}
                  required
                />

                {/* Eye icon */}
                <span
                  className="position-absolute"
                  style={{
                    right: "15px",
                    top: "12px",
                    cursor: "pointer",
                    color: "#777",
                    userSelect: "none",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </Form.Group>

              {error && <div className="text-danger mb-3">{error}</div>}

              <Button
                type="submit"
                className="w-100 py-2 fw-bold mb-4 d-flex justify-content-center align-items-center"
                style={{ backgroundColor: "#5D3FD3", borderColor: "#5D3FD3" }}
                disabled={loading}
              >
                {loading ? <Spinner animation="border" size="sm" /> : "LOG IN"}
              </Button>

              <div className="text-center">
                <span className="text-muted me-2">Don't have an account?</span>
                <a href="/register" className="fw-bold" style={{ color: "#5D3FD3" }}>
                  Register Now
                </a>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}
