import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa";

export default function BottomCategoryBar() {
  const location = useLocation();
  const [showBar, setShowBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const categories = [
    { name: "New Arrivals", path: "/newarrival" },
    { name: "Men", path: "/men" },
    { name: "Women", path: "/women" },
    { name: "Accessories", path: "/accessories" },
    { name: "Sale", path: "/sale" },
  ];

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // scrolling down
        setShowBar(false);
      } else {
        // scrolling up
        setShowBar(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#F8F9FA",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease",
        transform: showBar ? "translateY(0)" : "translateY(100%)",
        zIndex: 1050,
      }}
    >
      <Nav
        className="d-flex flex-row flex-nowrap overflow-auto justify-content-around py-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((cat) => (
          <Nav.Link
            key={cat.name}
            as={Link}
            to={cat.path}
            className={`text-center text-nowrap ${
              location.pathname === cat.path ? "text-success fw-bold" : "text-dark"
            }`}
            style={{ flex: "0 0 auto" }}
          >
            <FaBoxOpen className="mb-1" />
            <div style={{ fontSize: "0.79rem" }} className="fw-bolder">{cat.name}</div>
          </Nav.Link>
        ))}
      </Nav>

      <style>{`
        /* Hide scrollbar */
        .navbar-nav::-webkit-scrollbar { display: none; }
        .navbar-nav { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
