import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";

export default function SellerProducts() {
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([
    { id: 1, name: "Men’s Shirt", price: 799, stock: 40 },
    { id: 2, name: "Women’s Handbag", price: 1499, stock: 22 },
  ]);

  const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "" });

  const handleAdd = () => {
    setProducts([...products, { id: Date.now(), ...newProduct }]);
    setNewProduct({ name: "", price: "", stock: "" });
    setShow(false);
  };

  return (
    <>
      <h3 className="mb-3">Manage Products</h3>
      <Button onClick={() => setShow(true)} variant="dark" className="mb-3">
        Add New Product
      </Button>
      <Table bordered hover>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price (₹)</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Product Modal */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="dark" onClick={handleAdd}>
            Add Product
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
