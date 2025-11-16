import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button, Alert } from "react-bootstrap";

export default function SellerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🔹 Check if seller already logged in
  useEffect(() => {
    const isSellerLoggedIn = localStorage.getItem("sellerLoggedIn");
    if (isSellerLoggedIn === "true") {
      navigate("/seller/dashboard");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ Dummy credentials
    const validEmail = "seller@shopify.com";
    const validPassword = "seller123";

    // ✅ Allow fake inputs also (for testing)
    if (
      (email === validEmail && password === validPassword) ||
      (email.trim() !== "" && password.trim() !== "")
    ) {
      localStorage.setItem("sellerLoggedIn", "true");
      setError("");
      navigate("/seller/dashboard"); // Redirect to dashboard
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center bg-light"
      style={{ height: "100vh" }}
    >
      <Card
        className="p-4 shadow-lg border-0"
        style={{
          width: "360px",
          borderRadius: "15px",
          background: "linear-gradient(145deg, #ffffff, #f3f3f3)",
        }}
      >
        <h4 className="text-center mb-4 text-success fw-bold">
          Seller Login
        </h4>

        {error && (
          <Alert variant="danger" className="py-2 text-center">
            {error}
          </Alert>
        )}

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter seller email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button
            variant="success"
            type="submit"
            className="w-100 fw-semibold shadow-sm"
          >
            Login
          </Button>
        </Form>

        <div className="text-center mt-3 text-muted" style={{ fontSize: "0.85rem" }}>
          <strong>Hint:</strong> seller@shopify.com / seller123
        </div>
      </Card>
    </div>
  );
}
