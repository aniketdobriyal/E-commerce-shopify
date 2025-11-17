import { useState, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Form, Button, Row, Container, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email] = useState(location.state?.email || "");
  const [code, setCode] = useState(new Array(6).fill("")); // 6-digit code
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (/^\d?$/.test(val)) {
      const newCode = [...code];
      newCode[index] = val;
      setCode(newCode);

      // Move focus to next input
      if (val && index < code.length - 1) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const verificationCode = code.join("");
          const res = await axios.post("https://e-commerce-shopify-backend.onrender.com/api/auth/verify", {
        email,
        code: verificationCode,
      });

      setMessage(res.data.message); // Verification success message

      // Navigate to login after 1.5s
      setTimeout(() => navigate("/login"), 1500);

    } catch (err) {
      setError(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
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
              Verify Your Email
            </h3>

            {message && <div className="text-success mb-2">{message}</div>}
            {error && <div className="text-danger mb-2">{error}</div>}

            <Form onSubmit={handleVerify}>
              <Form.Group className="mb-4 position-relative">
                <Form.Control
                  type="email"
                  value={email}
                  readOnly
                  style={{
                    paddingLeft: "15px",
                    height: "45px",
                    backgroundColor: "#e9ecef",
                  }}
                />
              </Form.Group>

              {/* Code Input Boxes */}
              <Form.Group className="mb-4 d-flex justify-content-between">
                {code.map((num, idx) => (
                  <Form.Control
                    key={idx}
                    type="text"
                    value={num}
                    onChange={(e) => handleChange(e, idx)}
                    onKeyDown={(e) => handleBackspace(e, idx)}
                    ref={(el) => (inputsRef.current[idx] = el)}
                    maxLength={1}
                    style={{
                      width: "45px",
                      height: "50px",
                      textAlign: "center",
                      fontSize: "1.2rem",
                      fontWeight: "600",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                    }}
                  />
                ))}
              </Form.Group>

              <Button
                type="submit"
                className="w-100 py-2 fw-bold mb-4"
                style={{ backgroundColor: "#5D3FD3", borderColor: "#5D3FD3" }}
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify Email"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}