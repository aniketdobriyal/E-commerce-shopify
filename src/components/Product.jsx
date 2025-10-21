import React, { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { FaStar, FaMapMarkerAlt, FaShieldAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";

import Spinner from "./Spinner";
import Navbar from "./Navbar"; 
import Footer from "./Footer";
import ProductQueue from "./ProductQueue";

export default function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [showQuantity, setShowQuantity] = useState(false);

    const renderStars = (rate) => {
        const fullStars = Math.floor(rate);
        const halfStar = rate % 1 >= 0.5;
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) stars.push(<FaStar key={i} size={14} className="text-warning me-1" />);
            else if (i === fullStars && halfStar) stars.push(<FaStar key={i} size={14} className="text-warning me-1" />);
            else stars.push(<FaStar key={i} size={14} className="text-muted opacity-50 me-1" />);
        }
        return <div className="d-flex align-items-center">{stars} <span className="ms-2 text-muted fw-normal fs-6">({rate.toFixed(1)})</span></div>;
    };

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Failed to fetch product data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

    if (loading) return <Spinner />;
    if (!product) return <Container className="py-5">Product not found.</Container>;

    const currency = '$';

    return (
        <>
            <Navbar />
            <Container className="my-5">
                <Row className="gx-5">
                    {/* Product Image */}
                    <Col xs={12} lg={5} className="d-flex justify-content-center mb-4 mb-lg-0">
                        <Card className="border-0 shadow-sm" style={{ width: "100%", maxWidth: "450px", borderRadius: '10px' }}>
                            <div 
                                style={{ 
                                    height: "400px", 
                                    padding: '1.5rem', 
                                    backgroundColor: '#f9f9f9',
                                    overflow: 'hidden' 
                                }} 
                                className="d-flex align-items-center justify-content-center"
                            >
                                <Card.Img
                                    variant="top"
                                    src={product.image}
                                    alt={product.title}
                                    style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", objectFit: "contain" }}
                                />
                            </div>
                        </Card>
                    </Col>

                    {/* Product Details */}
                    <Col xs={12} lg={4} className="p-4 p-lg-0">
                        <h1 className="fw-bolder mb-3">{product.title}</h1>
                        <div className="d-flex align-items-center mb-3">
                            {renderStars(product.rating.rate)}
                            <span className="text-muted ms-3">| {product.rating.count} reviews</span>
                        </div>
                        <hr className="my-3" />
                        <h2 className="text-danger fw-bold mb-3">{currency} {product.price.toFixed(2)}</h2>
                        <p className="text-muted small">Inclusive of all taxes & free shipping</p>
                        <hr className="my-3" />
                        <h5 className="fw-bold mb-2">Description</h5>
                        <p className="text-secondary">{product.description}</p>
                        <div className="mt-4">
                            <span className="text-primary fw-bold">Category:</span> 
                            <span className="ms-2 text-capitalize">{product.category}</span>
                        </div>
                    </Col>

                    {/* Purchase Box */}
                    <Col xs={12} lg={3}>
                        <div className="p-4 border shadow-sm" style={{ borderRadius: '10px' }}>
                            <h3 className="text-success fw-bolder mb-3">{currency} {product.price.toFixed(2)}</h3>
                            <div className="d-flex align-items-center text-secondary mb-3">
                                <FaMapMarkerAlt className="me-2" />
                                <span className="small">Delivering to 110060 - Update location</span>
                            </div>
                            <p className="text-danger fw-bold fs-6">
                                Only {product.rating.count > 10 ? 10 : product.rating.count} left in stock.
                            </p>

                            {/* Quantity Selector like Categories */}
                            <div className="my-3 border rounded shadow-sm">
                                <div className="d-flex justify-content-between align-items-center p-2" style={{ cursor: 'pointer' }} onClick={() => setShowQuantity(!showQuantity)}>
                                    <span>Quantity: {quantity}</span>
                                    {showQuantity ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                <div style={{ maxHeight: showQuantity ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
                                    {[...Array(10)].map((_, i) => (
                                        <div 
                                            key={i} 
                                            className="p-2 border-top "
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => { setQuantity(i + 1); setShowQuantity(false); }}
                                        >
                                            {i + 1}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <Button variant="success" className="w-100 text-uppercase fw-bold mb-3 rounded-5" style={{padding: '10px 0', fontSize:'12px'}}>
                                Add to Cart ({quantity})
                            </Button>
                            <Button variant="danger" className="w-100 text-uppercase fw-bold rounded-5" style={{padding: '10px 0', fontSize:'12px'}}>
                                Buy Now
                            </Button>

                            <div className="d-flex align-items-center mt-3 small text-muted">
                                <FaShieldAlt className="me-2" />
                                Secure transaction guaranteed
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <ProductQueue/>
            <Footer/>
        </>
    );
}
