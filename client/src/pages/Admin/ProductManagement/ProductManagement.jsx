import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import ProductList from './ProductList'; // Asegúrate de que esta ruta es correcta

const ProductManagement = () => {
  const [productos, setProductos] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
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
          throw new Error('La respuesta de la red no fue correcta');
        }
        const data = await response.json();
        setProductos(data.response);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
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
        throw new Error('La respuesta de la red no fue correcta');
      }
      const newProductResponse = await response.json();
      setProductos([...productos, newProductResponse]);
      setShowAddModal(false);
    } catch (error) {
      console.error("Error al crear el producto:", error);
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
        throw new Error('La respuesta de la red no fue correcta');
      }
      const updatedProduct = await response.json();
      setProductos(productos.map(product => product._id === updatedProduct._id ? updatedProduct : product));
      setShowEditModal(false);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  const handleDelete = async () => {
    if (productToDelete) {
      try {
        const response = await fetch(`/api/product/${productToDelete._id}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error('La respuesta de la red no fue correcta');
        }
        setProductos(productos.filter(product => product._id !== productToDelete._id));
        setShowDeleteConfirm(false);
        setProductToDelete(null);
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    }
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirm(true);
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
    setShowEditModal(true);
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShowAddModal(true)}>
        Agregar Producto
      </Button>

      <ProductList
        productos={productos}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      {/* Modal para Agregar Producto */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
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
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
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
              Actualizar Producto
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal de Confirmación de Eliminación */}
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar este producto?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductManagement;
