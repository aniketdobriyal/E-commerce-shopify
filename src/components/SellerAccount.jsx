import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Table, Form, Modal, Image } from "react-bootstrap";
import {
  DollarSign,
  Package,
  Star,
  ShoppingBag,
  Edit3,
  Save,
  PlusCircle,
  LogOut,
} from "lucide-react";

export default function SellerAccount() {
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // ✅ Redirect if not logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("sellerLoggedIn");
    if (!isLoggedIn) {
      navigate("/sellerlogin");
    }
  }, [navigate]);

  const [sellerInfo, setSellerInfo] = useState({
    storeName: "Aman's Gadgets",
    description:
      "Selling quality electronics and accessories at the best prices.",
    category: "Electronics",
    email: localStorage.getItem("sellerEmail") || "seller@hungry.com",
    phone: "+91 98765 67890",
  });

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Wireless Earbuds",
      stock: 34,
      price: 1999,
      status: "Active",
      image: null,
    },
    {
      id: 2,
      name: "Smartwatch",
      stock: 12,
      price: 3499,
      status: "Active",
      image: null,
    },
    {
      id: 3,
      name: "Phone Case",
      stock: 76,
      price: 299,
      status: "Inactive",
      image: null,
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    stock: "",
    price: "",
    status: "Active",
    image: null,
  });

  // Handle input changes
  const handleChange = (e) =>
    setSellerInfo({ ...sellerInfo, [e.target.name]: e.target.value });

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => {
    setShowModal(false);
    setNewProduct({
      name: "",
      stock: "",
      price: "",
      status: "Active",
      image: null,
    });
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.stock || !newProduct.price) {
      alert("Please fill all product details!");
      return;
    }
    const newItem = { ...newProduct, id: products.length + 1 };
    setProducts([...products, newItem]);
    handleModalClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("sellerLoggedIn");
    localStorage.removeItem("sellerEmail");
    navigate("/sellerlogin");
  };

  return (
    <div className="seller-account container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold text-dark">Seller Dashboard</h3>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={handleLogout}
          style={{ borderRadius: "20px" }}
        >
          <LogOut size={16} className="me-1" />
          Logout
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        {[
          {
            icon: <DollarSign size={28} className="text-success mb-2" />,
            value: "₹45,200",
            label: "Total Earnings",
          },
          {
            icon: <Package size={28} className="text-primary mb-2" />,
            value: "8",
            label: "Pending Orders",
          },
          {
            icon: <ShoppingBag size={28} className="text-warning mb-2" />,
            value: "56",
            label: "Total Products",
          },
          {
            icon: <Star size={28} className="text-danger mb-2" />,
            value: "4.8",
            label: "Store Rating",
          },
        ].map((item, idx) => (
          <div className="col-md-3 col-6" key={idx}>
            <Card className="shadow-sm border-0 p-3 text-center summary-card">
              {item.icon}
              <h5 className="fw-bold mb-1">{item.value}</h5>
              <p className="text-muted mb-0 small">{item.label}</p>
            </Card>
          </div>
        ))}
      </div>

      {/* Seller Info */}
      <Card className="border-0 shadow-sm mb-4 p-3 rounded-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0">Store Information</h5>
          <Button
            variant={isEditing ? "success" : "outline-primary"}
            size="sm"
            onClick={toggleEdit}
            style={{ borderRadius: "20px" }}
          >
            {isEditing ? (
              <Save size={16} className="me-1" />
            ) : (
              <Edit3 size={16} className="me-1" />
            )}
            {isEditing ? "Save Changes" : "Edit Info"}
          </Button>
        </div>

        <Form>
          <div className="row g-3">
            {[
              { label: "Store Name", name: "storeName", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Phone", name: "phone", type: "text" },
              { label: "Category", name: "category", type: "text" },
            ].map((field, idx) => (
              <div className="col-md-6" key={idx}>
                <Form.Group>
                  <Form.Label>{field.label}</Form.Label>
                  <Form.Control
                    type={field.type}
                    name={field.name}
                    value={sellerInfo[field.name]}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Form.Group>
              </div>
            ))}
            <div className="col-12">
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={sellerInfo.description}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </Form.Group>
            </div>
          </div>
        </Form>
      </Card>

      {/* Product Table */}
      <Card className="border-0 shadow-sm p-3 rounded-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0">Product Overview</h5>
          <Button
            variant="primary"
            size="sm"
            onClick={handleModalShow}
            style={{ borderRadius: "20px" }}
          >
            <PlusCircle size={16} className="me-1" /> Add Product
          </Button>
        </div>

        <Table striped bordered hover responsive className="align-middle">
          <thead style={{ background: "#f3f1ff" }}>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Product</th>
              <th>Stock</th>
              <th>Price (₹)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  {item.image ? (
                    <Image
                      src={item.image}
                      rounded
                      width="50"
                      height="50"
                      alt={item.name}
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      className="bg-light d-flex align-items-center justify-content-center rounded"
                      style={{ width: 50, height: 50 }}
                    >
                      📦
                    </div>
                  )}
                </td>
                <td>{item.name}</td>
                <td>{item.stock}</td>
                <td>{item.price}</td>
                <td>
                  <span
                    className={`badge px-3 py-2 ${
                      item.status === "Active" ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* Add Product Modal */}
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {[
              {
                label: "Product Name",
                name: "name",
                type: "text",
                placeholder: "Enter product name",
              },
              {
                label: "Stock",
                name: "stock",
                type: "number",
                placeholder: "Enter stock quantity",
              },
              {
                label: "Price (₹)",
                name: "price",
                type: "number",
                placeholder: "Enter price",
              },
            ].map((field, idx) => (
              <Form.Group className="mb-3" key={idx}>
                <Form.Label>{field.label}</Form.Label>
                <Form.Control
                  type={field.type}
                  name={field.name}
                  value={newProduct[field.name]}
                  onChange={handleProductChange}
                  placeholder={field.placeholder}
                />
              </Form.Group>
            ))}

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={newProduct.status}
                onChange={handleProductChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
              {newProduct.image && (
                <Image
                  src={newProduct.image}
                  alt="Preview"
                  rounded
                  fluid
                  className="mt-2 border"
                  style={{ maxHeight: "150px", objectFit: "cover" }}
                />
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "#5D3FD3", borderColor: "#5D3FD3" }}
            onClick={handleAddProduct}
          >
            Add Product
          </Button>
        </Modal.Footer>
      </Modal>

      <style>{`
        .summary-card {
          border-radius: 15px !important;
          transition: all 0.3s ease;
        }
        .summary-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 18px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
}
