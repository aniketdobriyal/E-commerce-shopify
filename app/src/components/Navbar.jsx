import React, { useState } from "react";
import { Navbar, Container, Form, FormControl, Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [show, setShow] = useState(false);

  return (
    <Navbar bg="dark" variant="dark" className="p-2 position-sticky flex-wrap z-3 justify-content-between" style={{ top: "0px" }}>
      <Container fluid>
        {/* Brand Name */}
        <Navbar.Brand as={Link} to="/" className="fs-4">
          Shopify
        </Navbar.Brand>

        {/* Search Form */}
        <Form className="d-flex">
          <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search" />
          <Button variant="dark" type="submit">
            Search
          </Button>

          {/* User Dropdown */}
          <Dropdown
            className="ms-2"
            onToggle={(isOpen) => setShow(isOpen)}
            show={show}
          >
            <Dropdown.Toggle as="div" className="btn btn-dark">
              <Link to="/login" className="text-light text-decoration-none">Login</Link>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-end w-auto">
              <Dropdown.Item as={Link} to="/login">Login</Dropdown.Item>
              <Dropdown.Item as={Link} to="/seller">Seller Account</Dropdown.Item>
              <Dropdown.Item as={Link} to="/other">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form>
      </Container>
    </Navbar>
  );
}
