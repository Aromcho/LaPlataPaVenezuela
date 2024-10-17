import React from 'react';
import OrderCard from '../OrderCard/OrderCard.jsx';
import './Orders.css'; // Archivo CSS para agregar estilos personalizados

const Orders = ({ order }) => {
  return (
    <div className="order-item">
      <OrderCard order={order} />
    </div>
  );
};

export default Orders;
