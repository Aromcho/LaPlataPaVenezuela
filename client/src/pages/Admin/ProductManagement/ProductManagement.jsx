import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Col, Modal, Form, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'; // Usando react-icons
import './ProductManagement.css'; // Agregar un archivo CSS personalizado para más estilo

const ProductManagement = () => {
  const [productos, setProductos] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Estado inicial de "nuevo producto"
  const [newProduct, setNewProduct] = useState({
    imagen: '',
    nombre: '',
    moneda: '',
    tasas: [{ monedaDestino: '', tasa: '', operacion: 'multiplicar' }]
  });

  // Estado inicial de "producto a editar"
  const [editProduct, setEditProduct] = useState({
    _id: '',
    imagen: '',
    nombre: '',
    moneda: '',
    tasas: [{ monedaDestino: '', tasa: '', operacion: 'multiplicar' }]
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
      tasas: [...product.tasas, { monedaDestino: '', tasa: '', operacion: 'multiplicar' }]
    });
  };

  const handleChange = (e, index, field, product, setProduct) => {
    if (field === 'imagen' || field === 'nombre' || field === 'moneda') {
      setProduct({ ...product, [field]: e.target.value });
    } else {
      const newTasas = product.tasas.map((tasa, idx) => {
        if (idx !== index) return tasa;
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
      setProductos(productos.map(product => 
        product._id === updatedProduct._id ? updatedProduct : product
      ));
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
      {/* Botón para abrir el modal de agregar */}
      <Button className="mb-3" variant="primary" onClick={() => setShowAddModal(true)}>
        Agregar Tasa
      </Button>

      {/* Lista de productos como tarjetas */}
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
                      <span>
                        {tasa.operacion === 'multiplicar' ? 'x' : '%'}{" "}
                        {tasa.monedaDestino}: {tasa.tasa}
                      </span>
                    </div>
                  ))}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <OverlayTrigger overlay={<Tooltip>Editar</Tooltip>}>
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      onClick={() => handleEditClick(product)}
                    >
                      <FaPencilAlt />
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger overlay={<Tooltip>Eliminar</Tooltip>}>
                    <Button 
                      variant="outline-danger" 
                      size="sm" 
                      onClick={() => handleDelete(product._id)}
                    >
                      <FaTrashAlt />
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
            {/* Datos generales */}
            <Form.Group className="mb-3">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                className="formControl"
                type="text"
                placeholder="URL de la imagen (ej. https://...)"
                value={newProduct.imagen}
                onChange={(e) => handleChange(e, null, 'imagen', newProduct, setNewProduct)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                className="formControl"
                type="text"
                placeholder="Nombre del producto (ej. Dólar estadounidense)"
                value={newProduct.nombre}
                onChange={(e) => handleChange(e, null, 'nombre', newProduct, setNewProduct)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Moneda</Form.Label>
              <Form.Control
                className="formControl"
                type="text"
                placeholder="Código de la moneda (ej. USD)"
                value={newProduct.moneda}
                onChange={(e) => handleChange(e, null, 'moneda', newProduct, setNewProduct)}
                required
              />
            </Form.Group>

            {/* Tasas */}
            <Form.Label>Tasas</Form.Label>
            {newProduct.tasas.map((tasa, index) => (
              <div key={index} className="tasa-section">
                {/* Selector de operación */}
                <Form.Group className="mb-3">
                  <Form.Label>Operación</Form.Label>
                  <Form.Select
                    className="formControl"
                    value={tasa.operacion}
                    onChange={(e) => handleChange(e, index, 'operacion', newProduct, setNewProduct)}
                  >
                    <option value="multiplicar">x</option>
                    <option value="dividir">%</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Moneda Destino</Form.Label>
                  <Form.Control
                    className="formControl"
                    type="text"
                    placeholder="Moneda de destino (ej. PEN)"
                    value={tasa.monedaDestino}
                    onChange={(e) => handleChange(e, index, 'monedaDestino', newProduct, setNewProduct)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Tasa</Form.Label>
                  <Form.Control
                    className="formControl"
                    type="number"
                    step="0.01"
                    placeholder="Valor de la tasa (ej. 3.70)"
                    value={tasa.tasa}
                    onChange={(e) => handleChange(e, index, 'tasa', newProduct, setNewProduct)}
                    required
                  />
                </Form.Group>
              </div>
            ))}
            <Button variant="outline-secondary" className="me-2" onClick={() => handleAddTasa(newProduct, setNewProduct)}>
              Agregar Tasa
            </Button>
            <Button variant="primary" type="submit">
              Crear Producto
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal para Editar Producto */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} className="modal-edit">
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            {/* Sección de datos generales */}
            <div className="edit-form-section">
              <h5 className="section-subtitle">Datos Generales</h5>

              <Form.Group className="mb-3">
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                  className="formControl"
                  type="text"
                  placeholder="URL de la imagen (ej. https://...)"
                  value={editProduct.imagen}
                  onChange={(e) => handleChange(e, null, 'imagen', editProduct, setEditProduct)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  className="formControl"
                  type="text"
                  placeholder="Nombre del producto (ej. Dólar estadounidense)"
                  value={editProduct.nombre}
                  onChange={(e) => handleChange(e, null, 'nombre', editProduct, setEditProduct)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Moneda</Form.Label>
                <Form.Control
                  className="formControl"
                  type="text"
                  placeholder="Código de moneda (ej. USD)"
                  value={editProduct.moneda}
                  onChange={(e) => handleChange(e, null, 'moneda', editProduct, setEditProduct)}
                  required
                />
              </Form.Group>
            </div>

            {/* Sección de tasas */}
            <div className="edit-form-section mt-4">
              <h5 className="section-subtitle">Tasas</h5>

              {editProduct.tasas.map((tasa, index) => (
                <div key={index} className="tasa-section">
                  <Form.Group className="mb-3">
                    <Form.Label>Operación</Form.Label>
                    <Form.Select
                      value={tasa.operacion}
                      onChange={(e) => handleChange(e, index, 'operacion', editProduct, setEditProduct)}
                    >
                      <option value="multiplicar">x</option>
                      <option value="dividir">%</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>Moneda Destino</Form.Label>
                    <Form.Control
                      className="formControl"
                      type="text"
                      placeholder="Moneda de destino (ej. PEN)"
                      value={tasa.monedaDestino}
                      onChange={(e) => handleChange(e, index, 'monedaDestino', editProduct, setEditProduct)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Tasa</Form.Label>
                    <Form.Control
                      className="formControl"
                      type="number"
                      step="0.01"
                      placeholder="Valor de la tasa (ej. 3.70)"
                      value={tasa.tasa}
                      onChange={(e) => handleChange(e, index, 'tasa', editProduct, setEditProduct)}
                      required
                    />
                  </Form.Group>
                </div>
              ))}

              <Button
                variant="outline-secondary"
                className="me-2"
                onClick={() => handleAddTasa(editProduct, setEditProduct)}
              >
                Agregar Tasa
              </Button>
            </div>

            <div className="text-end mt-4">
              <Button variant="primary" type="submit">
                Guardar Cambios
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductManagement;
