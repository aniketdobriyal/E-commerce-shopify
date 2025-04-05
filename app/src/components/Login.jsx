import React from "react";
import Navbar from "./Navbar";
import StaticNavbar from "./StaticNavbar";
import { Col, Form, Button, Row, Container } from "react-bootstrap";

export default function Login() {
  return (
    <div>
      <Navbar />
     

      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ width: "100%", height: "100vh", background: "#f5f5f5" }}
      >
        <div
          style={{
            width: "500px",
            padding: "40px",
            borderRadius: "12px",
            background: "rgba(255, 255, 255, 0.95)",
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(12px)",
          }}
          className="text-center"
        >
          <h3 className="mb-4 fw-bold text-primary">Welcome Back!</h3>

          <Form>
            {/* Email Field */}
            <Form.Group className="mb-4" controlId="formEmail">
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>

            {/* Password Field */}
            <Form.Group className="mb-4" controlId="formPassword">
              <Form.Control type="password" placeholder="Enter your password" />
            </Form.Group>

            {/* Forgot Password Link */}
            <Row className="mb-4">
              <Col className="text-start">
                <a href="#" className="text-primary text-decoration-none fw-semibold">
                  Forgot Password?
                </a>
              </Col>
            </Row>

            {/* Login Button */}
            <Button variant="primary" className="w-100 py-2 fw-bold">
              Login
            </Button>

            {/* Sign Up Button */}
            <Button variant="outline-primary" className="w-100 mt-3 py-2 fw-bold">
              Sign Up
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
}
