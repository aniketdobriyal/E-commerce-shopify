import { useState, useRef, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Form, Button, Row, Container, Col } from "react-bootstrap";
import { FaUser, FaLock, FaPhone } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const nameRef = useRef(null);
  const [highlight, setHighlight] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
      setHighlight(true);
      const timer = setTimeout(() => setHighlight(false), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setMessage("");
  const result = await register(name, email, password, phone);
  if (result.success) {
    setMessage("Registered successfully! Check your email for the verification code.");
    // Redirect to verify page with email
    navigate("/verify", { state: { email } });
  } else {
    setError(result.message || "Registration failed");
  }
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
              Create Account
            </h3>

            {message && <div className="text-success mb-2">{message}</div>}
            {error && <div className="text-danger mb-2">{error}</div>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4 position-relative">
                <span className="position-absolute ps-3 pt-2 text-muted">
                  <FaUser />
                </span>
                <Form.Control
                  ref={nameRef}
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{
                    paddingLeft: "40px",
                    height: "45px",
                    border: highlight ? "2px solid #5D3FD3" : "1px solid #ccc",
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-4 position-relative">
                <span className="position-absolute ps-3 pt-2 text-muted">
                  <FaUser />
                </span>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ paddingLeft: "40px", height: "45px" }}
                />
              </Form.Group>

              <Form.Group className="mb-4 position-relative">
                <span className="position-absolute ps-3 pt-2 text-muted">
                  <FaPhone />
                </span>
                <Form.Control
                  type="text"
                  placeholder="Phone (optional)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ paddingLeft: "40px", height: "45px" }}
                />
              </Form.Group>

              <Form.Group className="mb-4 position-relative">
                <span className="position-absolute ps-3 pt-2 text-muted">
                  <FaLock />
                </span>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ paddingLeft: "40px", height: "45px" }}
                />
              </Form.Group>

              <Button
                type="submit"
                className="w-100 py-2 fw-bold mb-4"
                style={{ backgroundColor: "#5D3FD3", borderColor: "#5D3FD3" }}
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </Button>

              <div className="text-center">
                <span className="text-muted me-2">Already have an account?</span>
                <a href="/login" className="fw-bold" style={{ color: "#5D3FD3" }}>
                  Login Now
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
