import React, { useState, useEffect } from "react";

import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import { Tag } from "lucide-react";

export default function Coupons() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const demoCoupons = [
      {
        id: 1,
        code: "SAVE10",
        discount: "10%",
        minPurchase: "₹500",
        expiry: "31 Oct 2025",
        status: "active",
        image:
          "https://cdn.shopify.com/s/files/1/0553/3774/6621/files/winter_sale_web_banner.jpg?v=1639634129",
      },
      {
        id: 2,
        code: "FLAT200",
        discount: "₹200",
        minPurchase: "₹1500",
        expiry: "15 Nov 2025",
        status: "active",
        image:
          "https://cdn.shopify.com/s/files/1/0553/3774/6621/files/winter_sale_web_banner.jpg?v=1639634129",
      },
      {
        id: 3,
        code: "OLD50",
        discount: "₹50",
        minPurchase: "₹300",
        expiry: "01 Sep 2025",
        status: "expired",
        image:
          "https://cdn.shopify.com/s/files/1/0553/3774/6621/files/winter_sale_web_banner.jpg?v=1639634129",
      },
    ];

    setTimeout(() => {
      setCoupons(demoCoupons);
      setLoading(false);
    }, 800);
  }, []);

  const handleApply = (coupon) => {
    alert(`Coupon "${coupon.code}" applied! 🎉`);
  };

  return (
    <div style={{ backgroundColor: "#f7f8fa", minHeight: "100vh" }}>
     

      <Container className="">
        <h2 className="fw-bold mb-4 text-center d-flex justify-content-center align-items-center">
          <Tag size={28} className="me-2 text-warning" />
          Your Coupons
        </h2>

        {loading ? (

          
          <p className="text-center">Loading coupons...</p>
        ) : coupons.length > 0 ? (
          <Row className="gy-3">
            {coupons.map((c) => (
              <Col key={c.id} xs={12} md={6} lg={4}>
                <Card className="shadow-sm border-0 rounded-4 overflow-hidden">
                  {/* Image */}
                  <div style={{ height: "150px", overflow: "hidden" }}>
                    <Image
                      src={c.image}
                      alt={c.code}
                      fluid
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="fw-semibold mb-0">{c.code}</h5>
                      <span
                        className={`badge ${
                          c.status === "active"
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      >
                        {c.status === "active" ? "Active" : "Expired"}
                      </span>
                    </div>

                    <p className="mb-1">
                      Discount: <strong>{c.discount}</strong>
                    </p>
                    <p className="mb-2">
                      Min. Purchase: <strong>{c.minPurchase}</strong>
                    </p>
                    <p className="mb-3 text-muted small">
                      Expires on: {c.expiry}
                    </p>

                    {c.status === "active" && (
                      <Button
                        size="sm"
                        className="rounded-5 px-4 py-1"
                        onClick={() => handleApply(c)}
                      >
                        Apply
                      </Button>
                    )}
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
            <Tag size={60} color="#e5e7eb" />
            <h3 className="fw-semibold mt-3">No Coupons Found</h3>
            <p className="text-muted mt-1">
              Looks like you don’t have any active coupons.
            </p>
          </div>
        )}
      </Container>

     
    </div>
  );
}
