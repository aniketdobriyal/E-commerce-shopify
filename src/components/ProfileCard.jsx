import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { Home, Package, Heart, Tag, CreditCard, LogOut, ArrowLeft, MapPin } from "lucide-react";

// Feature Sections
import DashboardView from "./DashboardView";
import Wishlist from "./fetures/Wishlist";
import Rewards from "./Rewards";
import Coupons from "./Coupons";
import OrdersReturns from "./OrdersReturns";
import PaymentMethods from "./PaymentMethods";

// Mock user data
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
  const queryParams = new URLSearchParams(location.search);
  const initialSection = queryParams.get("section") || "dashboard";

  const [activeSection, setActiveSection] = useState(initialSection);
  const [mobileView, setMobileView] = useState(window.innerWidth > 900 ? "main" : "sidebar");
  const [user, setUser] = useState(MOCK_USER);

  useEffect(() => {
    const handleResize = () => setMobileView(window.innerWidth > 900 ? "main" : "sidebar");
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (section) => {
    setActiveSection(section);
    if (window.innerWidth <= 900) setMobileView("main");
    window.history.replaceState(null, "", `${window.location.pathname}?section=${section}`);
  };

  const handleBack = () => setMobileView("sidebar");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard": return <DashboardView user={user} handleNavClick={handleNavClick} />;
      case "orders": return <OrdersReturns user={user} />;
      case "wishlist": return <Wishlist wishlistItems={user.wishlist} />;
      case "rewards": return <Rewards user={user} />;
      case "coupons": return <Coupons user={user} />;
      case "payments": return <PaymentMethods user={user} />;
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
      default: return <DashboardView user={user} handleNavClick={handleNavClick} />;
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
      <Navbar />
      <div className="pc-container">
        <aside className={`pc-sidebar ${mobileView === "sidebar" ? "show-mobile" : "hide-mobile"}`}>
          <div className="pc-brand desktop-only">BrandCo</div>
          <nav>
            {mainNavItems.map(item => (
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
            {settingsNavItems.map(item => (
              <button
                key={item.key}
                className={`nav-item ${activeSection === item.key ? "active" : ""}`}
                onClick={() => handleNavClick(item.key)}
              >
                <item.icon size={18} /> {item.label}
              </button>
            ))}

            <button className="nav-item logout"><LogOut size={18} /> Logout</button>
          </nav>
        </aside>

        <main className={`pc-main ${mobileView === "main" ? "show-mobile" : "hide-mobile"}`}>
          {window.innerWidth <= 900 && (
            <button className="back-btn" onClick={handleBack}><ArrowLeft size={20} /> Back</button>
          )}
          <div className="content-scroll-wrapper">{renderContent()}</div>
        </main>

        <style>{`
          .pc-container { display:flex; min-height:100vh; background:#f6f8fb; }
          .pc-sidebar { width:260px; background:#fff; padding:1.5rem 0; border-right:1px solid #e6e9f0; position:sticky; top:0; height:100vh; overflow-y:auto; }
          .pc-main { flex:1; background:#f6f8fb; padding:2rem; overflow-y:auto; }
          .pc-brand { font-size:1.5rem; font-weight:700; color:#1f2937; padding:0 1.5rem 1.5rem; margin-bottom:1rem; border-bottom:1px solid #e6e9f0; }
          .pc-sidebar nav { display:flex; flex-direction:column; }
          .nav-item { display:flex; align-items:center; gap:1rem; padding:0.75rem 1.5rem; border:none; cursor:pointer; background:none; font-size:0.95rem; color:#1f2937; text-align:left; }
          .nav-item.active { background:#e6e9f0; color:#007bff; font-weight:600; border-left:4px solid #007bff; padding-left:calc(1.5rem - 4px); }
          .nav-item.logout { color:#ef4444; margin-top:2rem; }
          .nav-title { font-size:0.75rem; font-weight:600; color:#6b7280; text-transform:uppercase; padding:0 1.5rem; margin:1.5rem 0 0.5rem; }
          .nav-divider { border-top:1px solid #e6e9f0; margin:1.5rem 1rem 0; }
          .desktop-only { display:none; }
          @media (max-width:900px){
            .pc-container { flex-direction:column; background:#fff; }
            .pc-sidebar.hide-mobile { transform:translateX(-100%); }
            .pc-main.hide-mobile { display:none; }
            .pc-sidebar.show-mobile { transform:translateX(0); box-shadow:0 0 20px rgba(0,0,0,0.2); }
            .pc-sidebar { position:fixed; top:0; left:0; width:100%; height:100vh; z-index:1000; padding:1rem 0; border-right:none; overflow-y:auto; transition:transform 0.3s ease-out; margin-top:50px; }
            .pc-sidebar nav { padding:0 1rem; }
            .nav-item { padding:1rem 1rem; font-size:1.1rem; }
            .nav-title { padding:0 1rem; margin-top:2rem; margin-bottom:0.75rem; }
            .nav-item.logout { margin-top:3rem; }
            .pc-main { position:relative; padding:1rem; min-height:100vh; background:#fff; overflow-y:auto; z-index:10; }
            .content-scroll-wrapper { padding-top:60px; }
            .back-btn { position:absolute; top:0.5rem; left:0.5rem; border:none; background:none; color:#007bff; font-weight:700; display:flex; align-items:center; gap:0.25rem; }
          }
        `}</style>
      </div>
    </>
  );
}
