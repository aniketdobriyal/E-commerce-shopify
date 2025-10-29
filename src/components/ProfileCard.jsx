import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Package,
  Heart,
  Tag,
  CreditCard,
  LogOut,
  ArrowLeft,
  MapPin,
  Store,
} from "lucide-react";

import Navbar from "./Navbar";
import DashboardView from "./DashboardView";
import Wishlist from "./fetures/Wishlist";
import Rewards from "./Rewards";
import Coupons from "./Coupons";
import OrdersReturns from "./OrdersReturns";
import PaymentMethods from "./PaymentMethods";
import SellerAccount from "./SellerAccount";
import LocationInfo from "./LocationInfo";

const MOCK_USER = {
  name: "Aman Sharma",
  email: "aman@example.com",
  phone: "+91 98765 43210",
  city: "Dehradun",
  state: "Uttarakhand",
  country: "India",
  postal: "248001",
  avatar: null,
  cardBrand: "Visa",
  cardLast4: "4242",
  rewards: 450,
  ordersInTransit: 2,
  wishlist: [
    { id: 1, title: "Product A", price: 599, image: "https://via.placeholder.com/100" },
    { id: 2, title: "Product B", price: 899, image: "https://via.placeholder.com/100" },
    { id: 3, title: "Product C", price: 1299, image: "https://via.placeholder.com/100" },
  ],
};

export default function ProfileCard() {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("dashboard");
  const [mobileView, setMobileView] = useState(window.innerWidth <= 900 ? "sidebar" : "main");
  const [user, setUser] = useState(MOCK_USER);

  const isMobile = window.innerWidth <= 900;

  // Handle section from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sectionFromURL = queryParams.get("section") || "dashboard";
    setActiveSection(sectionFromURL);

    if (isMobile) {
      setMobileView(sectionFromURL === "dashboard" ? "sidebar" : "main");
    } else {
      setMobileView("main");
    }
  }, [location.search]);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) setMobileView("main");
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle navigation click
  const handleNavClick = (section) => {
    setActiveSection(section);
    if (isMobile) setMobileView("main");
    window.history.replaceState(null, "", `${window.location.pathname}?section=${section}`);
  };

  // Handle mobile back
  const handleMobileBack = () => setMobileView("sidebar");

  // ✅ Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("sellerLoggedIn");
    navigate("/login");
  };

  // Render section content
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardView user={user} handleNavClick={handleNavClick} />;
      case "orders":
        return <OrdersReturns user={user} />;
      case "wishlist":
        return <Wishlist wishlistItems={user.wishlist} />;
      case "rewards":
        return <Rewards user={user} />;
      case "coupons":
        return <Coupons user={user} />;
      case "payments":
        return <PaymentMethods user={user} />;
      case "location":
        return <LocationInfo user={user} />;
      case "seller":
        return <SellerAccount />;
      default:
        return <DashboardView user={user} handleNavClick={handleNavClick} />;
    }
  };

  // Sidebar nav items
  const mainNavItems = [
    { key: "dashboard", icon: Home, label: "Personal Information" },
    { key: "orders", icon: Package, label: "Orders & Returns" },
    { key: "wishlist", icon: Heart, label: "Wishlist" },
    { key: "rewards", icon: Tag, label: "Rewards" },
    { key: "coupons", icon: Tag, label: "Coupons" },
  ];

  const settingsNavItems = [
    { key: "payments", icon: CreditCard, label: "Payment Methods" },
    { key: "location", icon: MapPin, label: "Location" },
    { key: "seller", icon: Store, label: "Seller Account" },
  ];

  return (
    <>
      {!isMobile && <Navbar />}

      <div className="pc-container">
        {(mobileView === "sidebar" || !isMobile) && (
          <>
            {isMobile && mobileView === "sidebar" && <Navbar />}
            <aside className="pc-sidebar">
              <nav>
                {mainNavItems.map((item) => (
                  <button
                    key={item.key}
                    className={`nav-item ${activeSection === item.key ? "active" : ""}`}
                    onClick={() => handleNavClick(item.key)}
                  >
                    <item.icon size={18} /> {item.label}
                  </button>
                ))}
                <div className="nav-divider"></div>
                <p className="nav-title">SETTINGS</p>
                {settingsNavItems.map((item) => (
                  <button
                    key={item.key}
                    className={`nav-item ${activeSection === item.key ? "active" : ""}`}
                    onClick={() => handleNavClick(item.key)}
                  >
                    <item.icon size={18} /> {item.label}
                  </button>
                ))}
                <button className="nav-item logout" onClick={handleLogout}>
                  <LogOut size={18} /> Logout
                </button>
              </nav>
            </aside>
          </>
        )}

        {(mobileView === "main" || !isMobile) && (
          <main className="pc-main">
            {isMobile && mobileView === "main" && (
              <div className="mobile-top-navbar bg-light">
                <button className="back-btn text-dark" onClick={handleMobileBack}>
                  <ArrowLeft size={25} />
                </button>
              </div>
            )}
            <div className="content-scroll-wrapper my-3">{renderContent()}</div>
          </main>
        )}
      </div>

      <style>{`
        .pc-container {
          display: flex;
          min-height: 100vh;
          background: #f5f7fb;
          overflow: hidden;
        }
        .pc-sidebar {
          width: 280px;
          background: #fff;
          padding: 1.25rem;
          border-right: 1px solid #eef2f6;
          height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .pc-sidebar nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
          overflow-y: auto;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 8px;
          background: transparent;
          border: none;
          text-align: left;
          cursor: pointer;
          color: #0f172a;
          font-weight: 600;
          font-size: 0.95rem;
          transition: background 150ms, transform 120ms;
        }
        .nav-item:hover {
          background: #f1f5f9;
          transform: translateY(-1px);
        }
        .nav-item.active {
          background: linear-gradient(90deg, #e6f2ff, #f7fbff);
          border-left: 4px solid #2563eb;
          padding-left: 10px;
          color: #0b5ed7;
          box-shadow: 0 6px 18px rgba(37, 99, 235, 0.06);
        }
        .logout {
          margin-top: 14px;
          color: #ef4444;
          font-weight: 700;
        }
        .nav-divider {
          border-top: 1px solid #eef2f6;
          margin: 1.5rem 0;
        }
        .pc-main {
          flex: 1;
          padding: 28px;
          overflow-y: auto;
          height: 100vh;
          background: #fff;
          position: relative;
        }
        .content-scroll-wrapper {
          max-width: 1100px;
          margin: 0 auto;
        }
        .mobile-top-navbar {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          background: #fff;
          border-bottom: 1px solid #e5e7eb;
          position: sticky;
          top: 0;
          z-index: 15;
        }
        .mobile-top-navbar .back-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 1.1rem;
          font-weight: 700;
          border: none;
          background: none;
          color: #2563eb;
          cursor: pointer;
        }
        @media (max-width: 900px) {
          .pc-container {
            flex-direction: column;
          }
          .pc-sidebar {
            width: 100%;
            height: 100vh;
            padding: 16px;
          }
          .pc-main {
            padding: 0;
            min-height: auto;
          }
        }
      `}</style>
    </>
  );
}
