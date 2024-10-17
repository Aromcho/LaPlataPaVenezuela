import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Tooltip, OverlayTrigger, Spinner } from 'react-bootstrap';
import { PencilSquare, Trash, Eye } from 'react-bootstrap-icons';
import { Modal } from '@mui/material';
import StepperAdmin from '../Stepper/StepperAdmin';
import './OrderManagement.css'; // Estilos personalizados

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        const data = await response.json();
        setOrders(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleShowModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  // Función para manejar el cambio de estado en tiempo real
  const handleStateChange = (newState) => {
    if (selectedOrder) {
      const updatedOrder = { ...selectedOrder, state: newState };
      const updatedOrders = orders.map((order) =>
        order._id === selectedOrder._id ? updatedOrder : order
      );
      setSelectedOrder(updatedOrder);
      setOrders(updatedOrders); // Actualizamos la lista de órdenes en tiempo real
    }
  };

  // Función para eliminar una orden
  const handleDelete = async (orderId) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
      });
      if (response.status === 200) {
        const updatedOrders = orders.filter(order => order._id !== orderId);
        setOrders(updatedOrders);
      } else {
        console.error("Error deleting order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  if (isLoading) return <div className="spinner-container"><Spinner animation="border" /></div>;

  return (
    <div className="order-management-container">
      <h2 className="section-title">Gestión de Órdenes</h2>
      <Row>
        {orders.map((order) => (
          <Col md={4} key={order._id} className="mb-4">
            <Card className="order-card">
              <Card.Body>
                <Card.Title>Orden #{order._id}</Card.Title>
                <Card.Text>
                  <strong>Cliente:</strong> {order.user_id.name} ({order.user_id.email})
                  <br />
                  <strong>Estado:</strong> {order.state}
                  <br />
                  <strong>Fecha:</strong> {new Date(order.fecha).toLocaleDateString()}
                  <br />
                  <strong>Total:</strong> ${order.total}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <OverlayTrigger overlay={<Tooltip>Ver Detalles</Tooltip>}>
                    <Button variant="outline-secondary" size="sm" onClick={() => handleShowModal(order)}>
                      <Eye />
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger overlay={<Tooltip>Editar</Tooltip>}>
                    <Button variant="outline-primary" size="sm">
                      <PencilSquare />
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger overlay={<Tooltip>Eliminar</Tooltip>}>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(order._id)}>
                      <Trash />
                    </Button>
                  </OverlayTrigger>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal para ver detalles de la orden */}
      {selectedOrder && (
        <Modal open={showModal} onClose={handleCloseModal}>
          <div className="modal-content">
            {/* Pasamos el estado de la orden y su ID como props, y manejamos el cambio de estado */}
            <StepperAdmin state={selectedOrder.state} oid={selectedOrder._id} onStateChange={handleStateChange} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default OrderManagement;
