import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  DollarSign,
  BarChart3,
  Settings,
  CreditCard,
  LogOut,
  Store,
  ArrowLeft,
  Users,
} from "lucide-react";

import Navbar from "../buyer/Navbar";
import SellerOverview from "./SellerOverview";
import ProductManager from "./ProductManager";
import SellerOrders from "./SellerOrders";
import SellerEarnings from "./SellerEarnings";
import SellerSettings from "./SellerSettings";
import PaymentMethods from "../buyer/PaymentMethods";

const MOCK_SELLER = {
  name: "Rohit Kumar",
  email: "rohit.seller@example.com",
  storeName: "RK Fashion Hub",
  totalProducts: 48,
  totalOrders: 120,
  monthlyRevenue: "₹1,24,000",
  rating: 4.7,
  recentOrders: [
    { id: 1, buyer: "Ankit Verma", product: "T-shirt", amount: "₹599", status: "Shipped" },
    { id: 2, buyer: "Priya Singh", product: "Hoodie", amount: "₹1299", status: "Delivered" },
  ],
};

export default function SellerDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [mobileView, setMobileView] = useState(window.innerWidth <= 900 ? "sidebar" : "main");
  const [seller, setSeller] = useState(MOCK_SELLER);

  const isMobile = window.innerWidth <= 900;

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sectionFromURL = queryParams.get("section") || "overview";
    setActiveSection(sectionFromURL);

    if (isMobile) {
      setMobileView(sectionFromURL === "overview" ? "sidebar" : "main");
    } else {
      setMobileView("main");
    }
  }, [location.search]);

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

  const handleLogout = () => {
    localStorage.removeItem("sellerLoggedIn");
    navigate("/login");
  };

  // ✅ Render each section content
  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <SellerOverview seller={seller} />;
      case "products":
        return <ProductManager seller={seller} />;
      case "orders":
        return <SellerOrders seller={seller} />;
      case "earnings":
        return <SellerEarnings seller={seller} />;
      case "payments":
        return <PaymentMethods user={seller} />;
      case "settings":
        return <SellerSettings seller={seller} />;
      default:
        return <SellerOverview seller={seller} />;
    }
  };

  // Sidebar menu items
  const mainNavItems = [
    { key: "overview", icon: LayoutDashboard, label: "Dashboard Overview" },
    { key: "products", icon: Package, label: "Manage Products" },
    { key: "orders", icon: ShoppingBag, label: "Orders" },
    { key: "earnings", icon: DollarSign, label: "Earnings" },
  ];

  const settingsNavItems = [
    { key: "payments", icon: CreditCard, label: "Payment Methods" },
    { key: "settings", icon: Settings, label: "Store Settings" },
  ];

  return (
    <>
      {!isMobile && <Navbar />}

      <div className="sd-container">
        {(mobileView === "sidebar" || !isMobile) && (
          <aside className="sd-sidebar">
            <div className="store-header">
              <Store size={20} className="text-success me-2" />
              <div>
                <h6 className="m-0 fw-bold">{seller.storeName}</h6>
                <small className="text-muted">{seller.email}</small>
              </div>
            </div>
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
        )}

        {(mobileView === "main" || !isMobile) && (
          <main className="sd-main">
            {isMobile && mobileView === "main" && (
              <div className="mobile-top-navbar bg-light">
                <button className="back-btn text-dark" onClick={handleMobileBack}>
                  <ArrowLeft size={25} />
                </button>
              </div>
            )}
            <div className="content-scroll-wrapper">{renderContent()}</div>
          </main>
        )}
      </div>

      <style>{`
        
       

        .sd-container {
          display: flex;
          min-height: 100vh;
          background: #f8fafc;
        }
        .sd-sidebar {
          width: 280px;
          background: #fff;
          padding: 1.25rem;
          border-right: 1px solid #eef2f6;
          height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .store-header {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #e5e7eb;
        }
        .sd-sidebar nav {
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
        .sd-main {
          flex: 1;
          padding: 28px;
          overflow-y: auto;
          height: 100vh;
          background: #fff;
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
      `}</style>
    </>
  );
}
