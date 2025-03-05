import React from 'react';
import OrderCard from '../OrderCard/OrderCard'; // Importa el componente OrderCard

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
      

      {/* Mapeo de las órdenes */}
      {orders.map(order => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
};

export default OrdersList;
