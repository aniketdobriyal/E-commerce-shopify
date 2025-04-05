import React, { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";

import Spinner from "./Spinner";
import Navbar from "./Navbar";

export default function Product() {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  if (loading) return <Spinner />;

  return (
    <>
      <Navbar />
      <div className=" my-5">
        <div className="row gy-4 w-100">
          {/* Product Image */}
          <div className="col-12 col-md-4 d-flex justify-content-center">
            <Card className="border-0" style={{ width: "100%", maxWidth: "450px" }}>
              <Card.Img
                variant="top"
                src={product.image}
                style={{ height: "300px", objectFit: "contain" }}
              />
            </Card>
          </div>

          {/* Product Details - Increased width to col-md-5 */}
          <div className="col-12 col-md-5 p-5">
            <h2>{product.title}</h2>
            <span className="fs-5">
              <b>Rating: {product.rating.rate}</b>
            </span>
            <hr />
            <span className="fs-1 text-primary">₹ {product.price}</span>
            <br />
            <span className="fs-5 text-muted">Inclusive of all taxes</span>
            <br />
            <p className="my-3">{product.description}</p>
          </div>

          {/* Purchase Box - Reduced width to col-md-3 */}
      <div className="col-12 col-md-3 ">
  <div className="p-3 rounded-4 border border-1 bg-light">
    {/* Price Section */}
    <span className="fs-1 text-success">₹{product.price}</span>
    <br />
    <span>FREE delivery Monday, 3 March. Order within 18 hrs 18 mins.</span>
    <br />
    <a href="#" className="text-decoration-none">Details</a>
    <br />📍
    <a href="#" className="text-decoration-none d-block p-2">
      Delivering to Delhi 110060 - Update location
    </a>
    <br />
    <span className="text-danger fw-bold">Only 2 left in stock.</span>

    {/* Additional Info Section */}
    <div className="mt-3" style={{ fontSize: "15px" }}>
      <div className="d-flex justify-content-between mb-2">
        <span className="fw-bold">Payment</span>
        <span className="text-muted">Secure transaction</span>
      </div>

      <div className="d-flex justify-content-between mb-2">
        <span className="fw-bold">Fulfilled by</span>
        <span className="text-muted text-end" style={{ fontSize: "13px" }}>
          HIMGIRI AUTOMOBILES <br /> PVT. LTD
        </span>
      </div>

      <div className="d-flex justify-content-between">
        <span className="fw-bold">Sold by</span>
        <span className="text-muted text-end">
          HIMGIRI AUTOMOBILES PVT. LTD, <br /> a shop in Delhi-NCR
        </span>
      </div>


<div className="dropdown ">
  <button style={{width:"100%"}} className="btn bg-light text-dark btn-secondary my-3 text-start dropdown-toggle"  type="button" data-bs-toggle="dropdown" aria-expanded="false">
  Quantity: 1
  </button>
  <ul className="dropdown-menu"  >
    <li><a className="dropdown-item" href="#">1</a></li>
    <li><a className="dropdown-item" href="#">2</a></li>
    <li><a className="dropdown-item" href="#">3</a></li>
    <li><a className="dropdown-item" href="#">4</a></li>
    <li><a className="dropdown-item" href="#">5</a></li>
    <li><a className="dropdown-item" href="#">6</a></li>
    <li><a className="dropdown-item" href="#">7</a></li>
    <li><a className="dropdown-item" href="#">8</a></li>
    <li><a className="dropdown-item" href="#">9</a></li>
    <li><a className="dropdown-item" href="#">10</a></li>
  </ul>
</div>

<div className="d-flex justify-content-center ">
<button className="btn btn-warning w-100 rounded-5 ">Add to Card</button>
</div>

<div className="d-flex justify-content-center my-3">
<button className="btn btn-danger w-100 rounded-5 ">Buy Now</button>
</div>


    </div>
  </div>
</div>

        </div>
      </div>
    </>
  );
}
