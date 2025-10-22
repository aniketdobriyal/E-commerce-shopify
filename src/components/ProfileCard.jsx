import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Home, Package, Heart, Tag, CreditCard, LogOut, ArrowLeft, MapPin } from "lucide-react";

// Feature Sections
import DashboardView from "./DashboardView";
import Wishlist from "./fetures/Wishlist";
import Rewards from "./Rewards";
import Coupons from "./Coupons";
import OrdersReturns from "./OrdersReturns";
import PaymentMethods from "./PaymentMethods";
import Navbar from "./Navbar";

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
  const isMobile = window.innerWidth <= 900;

  const [activeSection, setActiveSection] = useState("dashboard");
  const [mobileView, setMobileView] = useState(isMobile ? "sidebar" : "main");
  const [user, setUser] = useState(MOCK_USER);

  // Sync section with URL (external link support)
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sectionFromURL = queryParams.get("section") || "dashboard";
    setActiveSection(sectionFromURL);
    if (isMobile) setMobileView("main");
    else setMobileView("main");
  }, [location.search]);

  // Window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) setMobileView("main");
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (section) => {
    setActiveSection(section);
    if (isMobile) setMobileView("main");
    window.history.replaceState(null, "", `${window.location.pathname}?section=${section}`);
  };

  const handleMobileBack = () => setMobileView("sidebar");

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
        return (
          <div className="p-4">
            <h3 className="fw-bold mb-3">Location Info</h3>
            <p><strong>City:</strong> {user.city}</p>
            <p><strong>State:</strong> {user.state}</p>
            <p><strong>Country:</strong> {user.country}</p>
            <p><strong>Postal Code:</strong> {user.postal}</p>
          </div>
        );
      default:
        return <DashboardView user={user} handleNavClick={handleNavClick} />;
    }
  };

  const mainNavItems = [
    { key: "dashboard", icon: Home, label: "Personal information" },
    { key: "orders", icon: Package, label: "Orders & Returns" },
    { key: "wishlist", icon: Heart, label: "Wishlist" },
    { key: "rewards", icon: Tag, label: "Rewards" },
    { key: "coupons", icon: Tag, label: "Coupons" },
  ];

  const settingsNavItems = [
    { key: "payments", icon: CreditCard, label: "Payment Methods" },
    { key: "location", icon: MapPin, label: "Location" },
  ];

  return (
    <>
      {/* Desktop Navbar */}
     {!isMobile && <Navbar />}

      <div className="pc-container">
        {/* Sidebar */}
        {(mobileView === "sidebar" || !isMobile) && (
          <>
            {/* Mobile Top Navbar while sidebar is open */}
            {isMobile && mobileView === "sidebar" && (
              <Navbar />
            )}
            <aside className="pc-sidebar">
              <div className="pc-brand">BrandCo</div>
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
                <button className="nav-item logout" onClick={() => alert("Logged out (demo)")}>
                  <LogOut size={18} /> Logout
                </button>
              </nav>
            </aside>
          </>
        )}

        {/* Main content */}
        {(mobileView === "main" || !isMobile) && (
          <main className="pc-main">
            {/* Mobile Top Navbar with Back button */}
            {isMobile && mobileView === "main" && (
              <div className="mobile-top-navbar bg-light ">
                <button className="back-btn text-dark " onClick={handleMobileBack}>
                  <ArrowLeft size={25} /> 
                </button>
              </div>
            )}

            <div className="content-scroll-wrapper my-3">{renderContent()}</div>
          </main>
        )}

        <style>{`
          .pc-container { display: flex; min-height: 100vh; background: #f5f7fb; }
          .pc-sidebar { width: 280px; background: #fff; padding: 1.25rem; border-right: 1px solid #eef2f6; height: 100vh; display: flex; flex-direction: column; }
          .pc-sidebar nav { flex: 1; display: flex; flex-direction: column; gap: 6px; overflow-y: auto; }
          .pc-brand { font-weight: 700; font-size: 1.15rem; color: #0f172a; margin-bottom: 0.75rem; }
          .nav-item { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 8px; background: transparent; border: none; text-align: left; cursor: pointer; color: #0f172a; font-weight: 600; font-size: 0.95rem; transition: background 150ms, transform 120ms; }
          .nav-item:hover { background: #f1f5f9; transform: translateY(-1px); }
          .nav-item.active { background: linear-gradient(90deg,#e6f2ff, #f7fbff); border-left: 4px solid #2563eb; padding-left: 10px; color: #0b5ed7; box-shadow: 0 6px 18px rgba(37,99,235,0.06); }
          .logout { margin-top: 14px; color: #ef4444; font-weight: 700; }
          .nav-divider { border-top:1px solid #eef2f6; margin:1.5rem 0; }
          .pc-main { flex: 1; padding: 28px; overflow-y: auto; height: 100vh; background: #fff; position: relative; }
          .content-scroll-wrapper { max-width: 1100px; margin: 0 auto; }

          /* Mobile top navbar */
          .mobile-top-navbar { display: flex; align-items: center; padding: 12px 16px; background: #fff; border-bottom: 1px solid #e5e7eb; position: sticky; top: 0; z-index: 15; }
          .mobile-top-navbar .back-btn { display: flex; align-items: center; gap: 6px; font-size: 1.1rem; font-weight: 700; border: none; background: none; color: #2563eb; cursor: pointer; }
          .mobile-top-navbar .mobile-title { margin-left: 12px; font-weight: 600; font-size: 1rem; color: #0f172a; }

          @media (max-width: 900px) {
            .pc-container { flex-direction: column; }
            .pc-sidebar { width: 100%; max-width: 100%; height: 100vh; padding: 16px; border-right: none; }
            .pc-main { padding: 0; min-height: auto; height: auto; }
          }

          html, body { overscroll-behavior-y: contain; overscroll-behavior-x: none; }
        `}</style>
      </div>
    </>
  );
}
