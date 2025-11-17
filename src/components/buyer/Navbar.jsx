import React, { useState, useRef, useEffect } from "react";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FaSearch,
  FaUserCircle,
  FaShoppingCart,
  FaChevronDown,
  FaChevronUp,
  FaHeart,
  FaBoxOpen,
  FaUser,
  FaGift,
  FaTicketAlt,
  FaMoneyCheckAlt,
  FaStore,
} from "react-icons/fa";

export default function NavBar() {
  const { user, logout } = useAuth();
  const [showSearch, setShowSearch] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const searchRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const UserIconToggle = React.forwardRef(({ onClick }, ref) => (
    <div
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="btn p-2 border-0 user-icon-hover"
      style={{ cursor: "pointer" }}
    >
      <FaUserCircle size={22} className="text-dark" />
    </div>
  ));

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openProfileSection = (section) => {
    window.location.href = `/profile?section=${section}`;
  };

  const handleAuthClick = async () => {
    if (user) {
      await logout();
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <style>{`
        .navbar-modern { transition: all 0.3s ease; }
        .brand-hover { transition: transform 0.3s ease, text-shadow 0.3s ease; }
        .brand-hover:hover { transform: scale(1.05); text-shadow: 0 0 10px rgba(0,0,0,0.2); }
        .nav-hover { position: relative; transition: color 0.3s ease; }
        .nav-hover::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0%; height: 2px; background-color: #198754; transition: width 0.3s ease; }
        .nav-hover:hover { color: #198754 !important; }
        .nav-hover-sale:hover { color: #d9534f !important; text-shadow: 0 0 8px rgba(217,83,79,0.4); }
        .nav-active { color: #198754 !important; font-weight: 600; }
        .nav-active-sale { color: #d9534f !important; font-weight: 600; text-shadow: 0 0 6px rgba(217,83,79,0.5); }
        .nav-active::after, .nav-active-sale::after { width: 100%; }
        .icon-hover, .user-icon-hover { transition: transform 0.25s ease, background-color 0.3s ease; border-radius: 50%; }
        .icon-hover:hover, .user-icon-hover:hover { transform: scale(1.15); background-color: rgba(0,0,0,0.05); }
        .dropdown-menu-custom { background-color: #fff !important; border-radius: 8px; padding: 0; min-width: max-content; box-shadow: 0 5px 15px rgba(0,0,0,0.1); position: absolute; top: 100%; right: 0; z-index: 1500; white-space: nowrap; }
        .dropdown-item { color: #000 !important; padding: 0.5rem 1rem; white-space: nowrap; transition: all 0.2s ease; }
        .dropdown-item.signin {  color: #000000ff !important; font-weight: 600; }
        .dropdown-item:not(.signin):hover { background-color: #f0f0f0 !important; color: #000 !important; }
        .dropdown-divider { border-top: 1px solid #ddd; margin: 0.3rem 0; }
        .dropdown-toggle::after { display: none; }
        .search-input { width: ${showSearch ? "180px" : "0"}; opacity: ${showSearch ? "1" : "0"}; padding: ${showSearch ? "0 0.5rem" : "0"}; border: 1px solid #ced4da; border-radius: 20px; transition: all 0.3s ease; height: 32px; font-size: 0.9rem; margin-right: 0.5rem; }
        .text-gradient-red { background: linear-gradient(90deg, #35006aff, #ff9e9eff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; color: transparent; }
        .search-wrapper { display: flex; align-items: center; transition: width 0.3s ease; }
      
      @media (max-width: 991px) {
          .navbar-brand { position:absolute; left: 40% !important; top:0%; display:none }
          .navbar-collapse { border-radius: 0 0 8px 8px; position:relative; top:1px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
          .navbar-collapse .nav-link { transition: background-color 0.3s ease, color 0.3s ease; border-radius: 4px; }
          .navbar-collapse .nav-link:hover { background-color: #e6f4ea; color: #198754 !important; }
        }
      `}
      </style>

      <Navbar
        bg="light"
        expand="lg"
        className="py-0 shadow-sm navbar-modern position-sticky top-0 w-100"
        style={{ height: "55px", position: "relative", zIndex: 1030 }}
      >
        <Container fluid className="px-md-5 d-flex align-items-center justify-content-between">
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-2 my-2 p-1 border-0" />
          <Navbar.Brand as={Link} to="/" className="fs-3 fw-bold text-gradient-red fst-italic my-2 brand-hover">
            Nayyina Bazar
          </Navbar.Brand>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto fw-bold d-none d-lg-flex">
              <Nav.Link as={Link} to="/newarrival" className={`text-dark mx-3 nav-hover ${location.pathname === "/newarrival" ? "nav-active" : ""}`}>New Arrivals</Nav.Link>
              <Nav.Link as={Link} to="/men" className={`text-dark mx-3 nav-hover ${location.pathname === "/men" ? "nav-active" : ""}`}>Men</Nav.Link>
              <Nav.Link as={Link} to="/women" className={`text-dark mx-3 nav-hover ${location.pathname === "/women" ? "nav-active" : ""}`}>Women</Nav.Link>
              <Nav.Link as={Link} to="/accessories" className={`text-dark mx-3 nav-hover ${location.pathname === "/accessories" ? "nav-active" : ""}`}>Accessories</Nav.Link>
              <Nav.Link as={Link} to="/sale" className={`mx-3 nav-hover-sale ${location.pathname === "/sale" ? "nav-active-sale" : ""}`}>Sale</Nav.Link>
            </Nav>

            {/* MOBILE MENU */}
            <div className="d-lg-none w-100">
              <div className="border rounded shadow-sm bg-white p-2">
                <div
                  className="d-flex justify-content-between align-items-center py-2 px-2"
                  onClick={() => setShowCategories(!showCategories)}
                  style={{ cursor: "pointer" }}
                >
                  <span className="fw-semibold text-success">
                    <FaBoxOpen className="me-2" /> Categories
                  </span>
                  {showCategories ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
                </div>
                <div
                  className="overflow-hidden"
                  style={{
                    maxHeight: showCategories ? "400px" : "0",
                    opacity: showCategories ? 1 : 0,
                    transition: "max-height 0.4s ease, opacity 0.4s ease",
                  }}
                >
                  <Nav.Link as={Link} to="/newarrival" className="d-flex align-items-center py-3 ps-3 text-dark"><FaBoxOpen className="me-2" /> New Arrivals</Nav.Link>
                  <Nav.Link as={Link} to="/men" className="d-flex align-items-center py-3 ps-3 text-dark"><FaBoxOpen className="me-2" /> Men</Nav.Link>
                  <Nav.Link as={Link} to="/women" className="d-flex align-items-center py-3 ps-3 text-dark"><FaBoxOpen className="me-2" /> Women</Nav.Link>
                  <Nav.Link as={Link} to="/accessories" className="d-flex align-items-center py-3 ps-3 text-dark"><FaBoxOpen className="me-2" /> Accessories</Nav.Link>
                  <Nav.Link as={Link} to="/sale" className="d-flex align-items-center py-3 ps-3 text-danger"><FaBoxOpen className="me-2" /> Sale</Nav.Link>
                  
                  {/* Profile / All links visible */}
                  <Nav.Link onClick={() => openProfileSection("dashboard")} className="d-flex align-items-center py-3 text-dark"><FaUser className="me-2" /> My Profile</Nav.Link>
                  <Nav.Link onClick={() => openProfileSection("wishlist")} className="d-flex align-items-center py-3 text-dark"><FaHeart className="me-2" /> Wishlist</Nav.Link>
                  <Nav.Link onClick={() => openProfileSection("orders")} className="d-flex align-items-center py-3 text-dark"><FaBoxOpen className="me-2" /> Orders & Returns</Nav.Link>
                  <Nav.Link onClick={() => openProfileSection("rewards")} className="d-flex align-items-center py-3 text-dark"><FaGift className="me-2" /> Rewards</Nav.Link>
                  <Nav.Link onClick={() => openProfileSection("coupons")} className="d-flex align-items-center py-3 text-dark"><FaTicketAlt className="me-2" /> Coupons</Nav.Link>
                  <Nav.Link onClick={() => openProfileSection("payments")} className="d-flex align-items-center py-3 text-dark"><FaMoneyCheckAlt className="me-2" /> Payment Methods</Nav.Link>
                  <Nav.Link onClick={() => openProfileSection("seller")} className="d-flex align-items-center py-3 text-dark"><FaStore className="me-2" /> Seller Account</Nav.Link>

                  {/* Sign In / Logout */}
                  <Nav.Link onClick={handleAuthClick} className="d-flex align-items-center py-3 text-white  rounded"><FaUserCircle className="me-2" /> {user ? "Logout" : "Sign In"}</Nav.Link>
                </div>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>

        {/* Right icons */}
        <div className="d-flex align-items-center flex-nowrap position-absolute" style={{ top: 0, right: 0, height: "55px", padding: "0 1rem", zIndex: 1200 }}>
          <div className="search-wrapper" ref={searchRef}>
            <input type="text" className="search-input" placeholder="Search..." autoFocus={showSearch} />
            <button className="btn p-2 border-0 icon-hover" onClick={() => setShowSearch((prev) => !prev)}><FaSearch size={22} className="text-dark" /></button>
          </div>

          <div style={{ position: "relative" }} className="d-flex align-items-center ms-2">
            {user && <span className="me-2 fw-bold text-dark">{user?.firstName}</span>}
            <Dropdown>
              <Dropdown.Toggle as={UserIconToggle} id="user-dropdown" />
              <Dropdown.Menu className="dropdown-menu-custom" align="end">
                {/* Sign In / Logout */}
                <Dropdown.Item onClick={handleAuthClick} className="signin ">
                  <FaUserCircle className="me-2" /> {user ? "Logout" : "Login"}
                </Dropdown.Item>

                {/* All links always visible */}
                <Dropdown.Item onClick={() => openProfileSection("dashboard")}><FaUser className="me-2" /> My Profile</Dropdown.Item>
                <Dropdown.Item onClick={() => openProfileSection("wishlist")}><FaHeart className="me-2" /> Wishlist</Dropdown.Item>
                <Dropdown.Item onClick={() => openProfileSection("rewards")}><FaGift className="me-2" /> Rewards</Dropdown.Item>
                <Dropdown.Item onClick={() => openProfileSection("coupons")}><FaTicketAlt className="me-2" /> Coupons</Dropdown.Item>
                <Dropdown.Item onClick={() => openProfileSection("orders")}><FaBoxOpen className="me-2" /> Orders & Returns</Dropdown.Item>
                <Dropdown.Item onClick={() => openProfileSection("payments")}><FaMoneyCheckAlt className="me-2" /> Payment Methods</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => openProfileSection("seller")} className="signin "><FaStore className="me-2" /> Seller Account</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <Link to="/cart" className="btn p-2 border-0 ms-2 icon-hover"><FaShoppingCart size={22} className="text-dark" /></Link>
        </div>
      </Navbar>
    </>
  );
}
