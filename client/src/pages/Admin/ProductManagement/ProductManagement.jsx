import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Col, Modal, Form, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import './ProductManagement.css'; // Agregar un archivo CSS personalizado para más estilo

const ProductManagement = () => {
  const [productos, setProductos] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    imagen: '',
    nombre: '',
    moneda: '',
    tasas: [{ monedaDestino: '', tasa: '' }]
  });
  const [editProduct, setEditProduct] = useState({
    _id: '',
    imagen: '',
    nombre: '',
    moneda: '',
    tasas: [{ monedaDestino: '', tasa: '' }]
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `/api/product/paginate?limit=15&page=1`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProductos(data.response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddTasa = (product, setProduct) => {
    setProduct({
      ...product,
      tasas: [...product.tasas, { monedaDestino: '', tasa: '' }]
    });
  };

  const handleChange = (e, index, field, product, setProduct) => {
    if (field === 'imagen' || field === 'nombre' || field === 'moneda') {
      setProduct({ ...product, [field]: e.target.value });
    } else {
      const newTasas = product.tasas.map((tasa, idx) => {
        if (index !== idx) return tasa;
        return { ...tasa, [field]: e.target.value };
      });
      setProduct({ ...product, tasas: newTasas });
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const newProductResponse = await response.json();
      setProductos([...productos, newProductResponse]);
      setShowAddModal(false);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/product/${editProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editProduct)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedProduct = await response.json();
      setProductos(productos.map(product => product._id === updatedProduct._id ? updatedProduct : product));
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/product/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setProductos(productos.filter(product => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
    setShowEditModal(true);
  };

  return (
    <>
      <Button className="mb-3" variant="primary" onClick={() => setShowAddModal(true)}>
        Agregar Tasa
      </Button>

      {/* Cards para productos */}
      <Row>
        {productos.map((product) => (
          <Col md={4} key={product._id} className="mb-4">
            <Card className="custom-card">
              <div className="card-img-wrapper">
                <Card.Img
                  variant="top"
                  src={product.imagen}
                  alt={product.nombre}
                  className="custom-card-img"
                />
              </div>
              <Card.Body>
                <Card.Title className="custom-card-title">{product.nombre}</Card.Title>
                <Card.Text className="custom-card-text">
                  <strong>Moneda:</strong> {product.moneda}
                  <br />
                  <strong>Tasas:</strong>
                  {product.tasas && product.tasas.map((tasa, index) => (
                    <div key={index}>
                      {tasa.monedaDestino}: {tasa.tasa}
                    </div>
                  ))}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <OverlayTrigger overlay={<Tooltip>Editar</Tooltip>}>
                    <Button variant="outline-primary" size="sm" onClick={() => handleEditClick(product)}>
                      <PencilSquare />
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger overlay={<Tooltip>Eliminar</Tooltip>}>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(product._id)}>
                      <Trash />
                    </Button>
                  </OverlayTrigger>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal para Agregar Producto */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddSubmit}>
            <Form.Group>
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="text"
                value={newProduct.imagen}
                onChange={(e) => handleChange(e, null, 'imagen', newProduct, setNewProduct)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={newProduct.nombre}
                onChange={(e) => handleChange(e, null, 'nombre', newProduct, setNewProduct)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Moneda</Form.Label>
              <Form.Control
                type="text"
                value={newProduct.moneda}
                onChange={(e) => handleChange(e, null, 'moneda', newProduct, setNewProduct)}
                required
              />
            </Form.Group>
            <Form.Label>Tasas</Form.Label>
            {newProduct.tasas.map((tasa, index) => (
              <div key={index}>
                <Form.Group>
                  <Form.Label>Moneda Destino</Form.Label>
                  <Form.Control
                    type="text"
                    value={tasa.monedaDestino}
                    onChange={(e) => handleChange(e, index, 'monedaDestino', newProduct, setNewProduct)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Tasa</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={tasa.tasa}
                    onChange={(e) => handleChange(e, index, 'tasa', newProduct, setNewProduct)}
                    required
                  />
                </Form.Group>
              </div>
            ))}
            <Button variant="secondary" onClick={() => handleAddTasa(newProduct, setNewProduct)}>
              Agregar Tasa
            </Button>
            <Button variant="primary" type="submit">
              Crear Producto
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal para Editar Producto */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group>
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="text"
                value={editProduct.imagen}
                onChange={(e) => handleChange(e, null, 'imagen', editProduct, setEditProduct)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={editProduct.nombre}
                onChange={(e) => handleChange(e, null, 'nombre', editProduct, setEditProduct)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Moneda</Form.Label>
              <Form.Control
                type="text"
                value={editProduct.moneda}
                onChange={(e) => handleChange(e, null, 'moneda', editProduct, setEditProduct)}
                required
              />
            </Form.Group>
            <Form.Label>Tasas</Form.Label>
            {editProduct.tasas.map((tasa, index) => (
              <div key={index}>
                <Form.Group>
                  <Form.Label>Moneda Destino</Form.Label>
                  <Form.Control
                    type="text"
                    value={tasa.monedaDestino}
                    onChange={(e) => handleChange(e, index, 'monedaDestino', editProduct, setEditProduct)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Tasa</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={tasa.tasa}
                    onChange={(e) => handleChange(e, index, 'tasa', editProduct, setEditProduct)}
                    required
                  />
                </Form.Group>
              </div>
            ))}
            <Button variant="secondary" onClick={() => handleAddTasa(editProduct, setEditProduct)}>
              Agregar Tasa
            </Button>
            <Button variant="primary" type="submit">
              Guardar Cambios
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductManagement;
