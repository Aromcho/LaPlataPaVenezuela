import React from 'react';
import OrderCard from '../OrderCard/OrderCard'; // Importa el componente OrderCard
import { Card } from 'react-bootstrap';
import { AttachMoney } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirigir
import './OrdersList.css'; // Archivo CSS para el estilo personalizado

const OrdersList = ({ orders }) => {
  const navigate = useNavigate(); // Inicializa el hook useNavigate

  const handleSendMoneyClick = () => {
    navigate('/checkout'); // Redirige a /checkout cuando se hace clic
  };

  return (
    <div className="orders-list">
      {/* Card destacada para enviar dinero */}
      <Card className="send-money-card" onClick={handleSendMoneyClick}>
        <Card.Body className="d-flex align-items-center justify-content-center flex-column">
          {/* Ícono de mayor tamaño */}
          <AttachMoney style={{ fontSize: '48px', color: '#fcfcfc' }} />
          <h4 className="mt-2 text-white">Enviar Dinero</h4>
        </Card.Body>
      </Card>

      {/* Mapeo de las órdenes */}
      {orders.map(order => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
};

export default OrdersList;
