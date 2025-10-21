import React, { useState } from "react";
import ProductQueue from "./ProductQueue";
import { Truck, Package, RefreshCcw, ShoppingBag } from "lucide-react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";

export default function OrdersReturns() {
  const [activeTab, setActiveTab] = useState("orders");

  const orders = [
    {
      id: 1,
      name: "Men's Cotton Casual Shirt",
      price: "₹899",
      status: "Delivered",
      image:
        "https://images.unsplash.com/photo-1520975918318-3f3c5f3b2da5?w=600&q=80",
      date: "12 Oct 2025",
    },
    {
      id: 2,
      name: "Wireless Bluetooth Earbuds",
      price: "₹1,499",
      status: "Shipped",
      image:
        "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=600&q=80",
      date: "13 Oct 2025",
    },
  ];

  const returns = [
    {
      id: 3,
      name: "Casual Sneakers for Men",
      price: "₹1,299",
      status: "Returned",
      image:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&q=80",
      date: "10 Oct 2025",
    },
  ];

  const buyAgain = [
    {
      id: 4,
      name: "Men's Round Neck T-Shirt",
      price: "₹599",
      status: "Delivered",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
      date: "01 Oct 2025",
    },
    {
      id: 5,
      name: "Analog Wrist Watch",
      price: "₹1,299",
      status: "Delivered",
      image:
        "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=600&q=80",
      date: "25 Sep 2025",
    },
  ];

  const activeList =
    activeTab === "orders"
      ? orders
      : activeTab === "returns"
      ? returns
      : buyAgain;

  const getIcon = () => {
    if (activeTab === "orders") return <Package size={28} className="me-2 text-primary" />;
    if (activeTab === "returns") return <RefreshCcw size={28} className="me-2 text-danger" />;
    return <ShoppingBag size={28} className="me-2 text-success" />;
  };

  return (
    <div style={{ backgroundColor: "#f7f8fa", minHeight: "100vh" }}>
    
      <Container className="">
        <h2 className="fw-bold mb-4 text-center d-flex justify-content-center align-items-center">
          {getIcon()}
          {activeTab === "orders"
            ? "Your Orders"
            : activeTab === "returns"
            ? "Your Returns"
            : "Buy Again"}
        </h2>

        {/* Tabs */}
        <div className="d-flex justify-content-center mb-4 gap-3 flex-wrap">
          <Button
            variant={activeTab === "orders" ? "primary" : "outline-primary"}
            className="rounded-5 px-4 py-1 fw-semibold"
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </Button>
          <Button
            variant={activeTab === "returns" ? "danger" : "outline-danger"}
            className="rounded-5 px-4 py-1 fw-semibold"
            onClick={() => setActiveTab("returns")}
          >
            Returns
          </Button>
          <Button
            variant={activeTab === "buyagain" ? "success" : "outline-success"}
            className="rounded-5 px-4 py-1 fw-semibold"
            onClick={() => setActiveTab("buyagain")}
          >
            Buy Again
          </Button>
        </div>

        {/* Order List */}
        {activeList.length > 0 ? (
          <Row className="gy-3">
            {activeList.map((item) => (
              <Col key={item.id} xs={12}>
                <Card
                  className="shadow-sm border-0 rounded-4 d-flex flex-row align-items-center"
                  style={{
                    minHeight: "120px",
                    overflow: "hidden",
                    backgroundColor: "#fff",
                  }}
                >
                  <div
                    style={{
                      width: "110px",
                      height: "110px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#f0f0f0",
                      flexShrink: 0,
                      borderTopLeftRadius: "14px",
                      borderBottomLeftRadius: "14px",
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      style={{
                        maxHeight: "90px",
                        width: "auto",
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  <Card.Body className="d-flex flex-row justify-content-between align-items-center w-100 py-2 px-3">
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h6
                        className="fw-semibold mb-1 text-truncate"
                        style={{ maxWidth: "80%", fontSize: "1rem" }}
                      >
                        {item.name}
                      </h6>
                      <p
                        className="text-success fw-bold mb-1"
                        style={{ fontSize: "1.05rem" }}
                      >
                        {item.price}
                      </p>
                      <p className="text-muted mb-1 small">
                        Ordered on {item.date}
                      </p>
                      <p
                        className={`fw-semibold small mb-0 ${
                          item.status === "Delivered"
                            ? "text-success"
                            : item.status === "Returned"
                            ? "text-danger"
                            : "text-warning"
                        }`}
                      >
                        Status: {item.status}
                      </p>
                    </div>

                    <div className="d-flex flex-column gap-2 align-items-end">
                      {item.status === "Delivered" && (
                        <>
                          <Button
                            size="sm"
                            className="rounded-5 btn-success px-3 py-1"
                          >
                            Buy Again
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-danger"
                            className="rounded-5 px-3 py-1"
                          >
                            Return
                          </Button>
                        </>
                      )}

                      {item.status === "Shipped" && (
                        <Button
                          size="sm"
                          variant="warning"
                          className="rounded-5 px-3 py-1 text-dark fw-semibold"
                        >
                          <Truck size={14} className="me-1" /> Track
                        </Button>
                      )}

                      {item.status === "Returned" && (
                        <Button
                          size="sm"
                          variant="outline-primary"
                          className="rounded-5 px-3 py-1"
                        >
                          View Details
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <div
            className="text-center py-5 mt-4 bg-white rounded-4 shadow-sm"
            style={{ minHeight: "200px" }}
          >
            <Package size={60} color="#e5e7eb" />
            <h3 className="fw-semibold mt-3">
              No {activeTab === "orders"
                ? "Orders"
                : activeTab === "returns"
                ? "Returns"
                : "Previous Orders"} Found
            </h3>
            <p className="text-muted mt-1">
              Looks like you haven’t {activeTab === "orders"
                ? "ordered"
                : activeTab === "returns"
                ? "returned"
                : "bought"} anything yet.
            </p>
          </div>
        )}
      </Container>

     
    </div>
  );
}
