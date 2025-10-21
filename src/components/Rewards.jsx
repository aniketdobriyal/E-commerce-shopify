import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, ProgressBar } from "react-bootstrap";
import { Gift, Star } from "lucide-react";

export default function Rewards() {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState(2350); // Example points

  useEffect(() => {
    // Simulated rewards fetch
    setTimeout(() => {
      setRewards([
        {
          id: 1,
          title: "₹100 Off Coupon",
          description: "Use on orders above ₹999",
          cost: 1000,
          image: "https://cdn-icons-png.flaticon.com/512/1041/1041916.png",
          claimed: false,
        },
        {
          id: 2,
          title: "Free Delivery Pass",
          description: "Enjoy free shipping for 1 month",
          cost: 1500,
          image: "https://cdn-icons-png.flaticon.com/512/609/609361.png",
          claimed: false,
        },
        {
          id: 3,
          title: "₹250 Shopping Voucher",
          description: "Applicable on fashion products",
          cost: 2000,
          image: "https://cdn-icons-png.flaticon.com/512/1040/1040230.png",
          claimed: true,
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleClaim = (rewardId) => {
    setRewards((prev) =>
      prev.map((r) =>
        r.id === rewardId && points >= r.cost
          ? { ...r, claimed: true }
          : r
      )
    );
    alert("🎁 Reward claimed successfully!");
  };

  if (loading) {
    return (
      <Container className="text-center">
            <h2 className="fw-bold  text-center d-flex justify-content-center align-items-center">
          <Gift size={28} color="#eab308" className="me-2" /> My Rewards
        </h2>
        <p>Loading your rewards...</p>
      </Container>
    );
  }

  return (
    <div style={{ backgroundColor: "#f7f8fa", minHeight: "100vh" }}>
      
      <Container>

        
        <h2 className="fw-bold mb-3 text-center d-flex justify-content-center align-items-center">
          <Gift size={28} color="#eab308" className="me-2" /> My Rewards
        </h2>
        <p className="text-center text-muted mb-4">
          You have <strong>{points}</strong> reward points 🏆
        </p>

        {/* Progress toward next reward */}
        <div className="bg-white shadow-sm rounded-4 p-3 mb-4">
          <h6 className="fw-semibold mb-2">
            Progress to next reward: <span className="text-success">{points}/3000</span>
          </h6>
          <ProgressBar now={(points / 3000) * 100} variant="success" className="rounded-5" />
        </div>

        {/* Reward Cards */}
        {rewards.length > 0 ? (
          <Row className="gy-3">
            {rewards.map((reward) => (
              <Col key={reward.id} xs={12}>
                <Card
                  className="shadow-sm border-0 rounded-4 d-flex flex-row align-items-center"
                  style={{
                    minHeight: "110px",
                    overflow: "hidden",
                    backgroundColor: "#fff",
                  }}
                >
                  <div
                    style={{
                      width: "90px",
                      height: "90px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#f0f0f0",
                      flexShrink: 0,
                      borderTopLeftRadius: "14px",
                      borderBottomLeftRadius: "14px",
                    }}
                  >
                    <img
                      src={reward.image}
                      alt={reward.title}
                      style={{ width: "55px", height: "55px" }}
                    />
                  </div>

                  <Card.Body className="d-flex flex-row justify-content-between align-items-center w-100 py-2 px-3">
                    <div style={{ flex: 1 }}>
                      <h6 className="fw-semibold mb-1">{reward.title}</h6>
                      <p className="text-muted mb-1 small">{reward.description}</p>
                      <p className="text-success fw-bold mb-0">
                        Cost: {reward.cost} pts
                      </p>
                    </div>

                    <div>
                      {reward.claimed ? (
                        <Button
                          size="sm"
                          disabled
                          className="rounded-5 px-3 py-1 btn-secondary"
                        >
                          Claimed
                        </Button>
                      ) : points >= reward.cost ? (
                        <Button
                          size="sm"
                          className="rounded-5 px-3 py-1 btn-success"
                          onClick={() => handleClaim(reward.id)}
                        >
                          Claim
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          disabled
                          className="rounded-5 px-3 py-1 btn-outline-secondary"
                        >
                          Not Enough Points
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
            <Star size={60} color="#e5e7eb" />
            <h4 className="fw-semibold mt-3">No Rewards Available</h4>
            <p className="text-muted mt-1">
              Keep shopping to earn more points and unlock rewards!
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}
