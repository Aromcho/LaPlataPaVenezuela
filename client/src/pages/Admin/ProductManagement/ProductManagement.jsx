import React, { useState, useEffect } from 'react';
import { Table, Button, Tooltip, OverlayTrigger, Form, Modal } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';

const ProductManagement = () => {
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
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

  const handleAddTasa = () => {
    setNewProduct({
      ...newProduct,
      tasas: [...newProduct.tasas, { monedaDestino: '', tasa: '' }]
    });
  };

  const handleChange = (e, index, field) => {
    if (field === 'imagen' || field === 'nombre' || field === 'moneda') {
      setNewProduct({ ...newProduct, [field]: e.target.value });
    } else {
      const newTasas = newProduct.tasas.map((tasa, idx) => {
        if (index !== idx) return tasa;
        return { ...tasa, [field]: e.target.value };
      });
      setNewProduct({ ...newProduct, tasas: newTasas });
    }
  };

  const handleSubmit = async (e) => {
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
      setShowModal(false);
    } catch (error) {
      console.error("Error creating product:", error);
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

  return (
    <>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Agregar Producto
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>ID</th>
            <th>Nombre</th>
            <th>Moneda</th>
            <th>Tasas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((product) => (
            <tr key={product._id}>
              <td>
                <img src={product.imagen} alt={product.nombre} style={{ width: '50px' }} />
              </td>
              <td>{product._id}</td>
              <td>{product.nombre}</td>
              <td>{product.moneda}</td>
              <td>
                {product.tasas && product.tasas.map((tasa) => (
                  <div key={tasa._id}>
                    {tasa.monedaDestino}: {tasa.tasa}
                  </div>
                ))}
              </td>
              <td>
                <OverlayTrigger overlay={<Tooltip>Editar</Tooltip>}>
                  <Button variant="outline-primary" size="sm" className="mx-2">
                    <PencilSquare />
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger overlay={<Tooltip>Eliminar</Tooltip>}>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(product._id)}>
                    <Trash />
                  </Button>
                </OverlayTrigger>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="text"
                value={newProduct.imagen}
                onChange={(e) => handleChange(e, null, 'imagen')}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={newProduct.nombre}
                onChange={(e) => handleChange(e, null, 'nombre')}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Moneda</Form.Label>
              <Form.Control
                type="text"
                value={newProduct.moneda}
                onChange={(e) => handleChange(e, null, 'moneda')}
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
                    onChange={(e) => handleChange(e, index, 'monedaDestino')}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Tasa</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={tasa.tasa}
                    onChange={(e) => handleChange(e, index, 'tasa')}
                    required
                  />
                </Form.Group>
              </div>
            ))}
            <Button variant="secondary" onClick={handleAddTasa}>
              Agregar Tasa
            </Button>
            <Button variant="primary" type="submit">
              Crear Producto
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductManagement;
