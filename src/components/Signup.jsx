import React from "react";
import Navbar from "./Navbar";
import StaticNavbar from "./StaticNavbar";
import { Col, Form, Button, Row, Container } from "react-bootstrap";

export default function Signup() {
  return (
    <div>
      <Navbar />
      <StaticNavbar />

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
          <h3 className="mb-4 fw-bold text-primary">Create Your Account</h3>

          <Form>
            {/* Full Name */}
            <Form.Group className="mb-4" controlId="formName">
              <Form.Control type="text" placeholder="Enter your full name" />
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-4" controlId="formEmail">
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-4" controlId="formPassword">
              <Form.Control type="password" placeholder="Create a password" />
            </Form.Group>

            {/* Confirm Password */}
            <Form.Group className="mb-4" controlId="formConfirmPassword">
              <Form.Control type="password" placeholder="Confirm your password" />
            </Form.Group>

            {/* Already have an account? */}
            <Row className="mb-4">
              <Col className="text-start">
                <a href="#" className="text-primary text-decoration-none fw-semibold">
                  Already have an account? Login
                </a>
              </Col>
            </Row>

            {/* Signup Button */}
            <Button variant="primary" className="w-100 py-2 fw-bold">
              Sign Up
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
}
