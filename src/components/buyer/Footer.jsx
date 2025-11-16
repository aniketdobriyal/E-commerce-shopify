import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      {/* Embedded CSS for styling & hover effects */}
      <style>{`
        .footer {
          background-color: #f8f9fa;
          padding: 50px 0 30px;
          border-top: 1px solid #eaeaea;
          font-family: 'Inter', sans-serif;
        }
        .footer h5 {
          font-weight: 700;
          font-size: 1rem;
          margin-bottom: 1rem;
        }
        .footer p, .footer a {
          color: #555;
          font-size: 0.95rem;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .footer a:hover {
          color: #198754; /* Bootstrap green accent */
        }
        .footer .social-icons a {
          color: #555;
          font-size: 18px;
          margin-right: 12px;
          transition: all 0.3s ease;
        }
        .footer .social-icons a:hover {
          color: #fff;
          background-color: #198754;
          border-radius: 50%;
          padding: 6px;
          transform: scale(1.1);
        }
        .footer-bottom {
          border-top: 1px solid #e1e1e1;
          margin-top: 30px;
          padding-top: 15px;
          text-align: center;
          font-size: 0.9rem;
          color: #777;
        }
      `}</style>

      <footer className="footer mt-auto">
        <Container>
          <Row className="gy-4">
            {/* Brand Section */}
            <Col md={4}>
              <h5 className="text-dark fw-bold mb-3">Shopify</h5>
              <p>
                Discover trendy fashion and accessories at unbeatable prices.
                Your style, your store — all in one place.
              </p>
              <div className="social-icons d-flex mt-3">
                <a href="#"><FaFacebookF /></a>
                <a href="#"><FaInstagram /></a>
                <a href="#"><FaTwitter /></a>
                <a href="#"><FaLinkedinIn /></a>
              </div>
            </Col>

            {/* Quick Links */}
            <Col xs={6} md={2}>
              <h5>Shop</h5>
              <ul className="list-unstyled">
                <li><Link to="/men">Men</Link></li>
                <li><Link to="/women">Women</Link></li>
                <li><Link to="/accessories">Accessories</Link></li>
                <li><Link to="/sale">Sale</Link></li>
              </ul>
            </Col>

            {/* Company Links */}
            <Col xs={6} md={2}>
              <h5>Company</h5>
              <ul className="list-unstyled">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </Col>

            {/* Support Links */}
            <Col md={4}>
              <h5>Support</h5>
              <ul className="list-unstyled">
                <li><Link to="/faq">FAQs</Link></li>
                <li><Link to="/shipping">Shipping Info</Link></li>
                <li><Link to="/returns">Returns</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
              </ul>
            </Col>
          </Row>

          <div className="footer-bottom">
            © {new Date().getFullYear()} <strong>Shopify</strong> — All Rights Reserved.
          </div>
        </Container>
      </footer>
    </>
  );
}

export default Footer;
