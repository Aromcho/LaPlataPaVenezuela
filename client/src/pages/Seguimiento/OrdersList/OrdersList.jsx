import React from 'react';
import Orders from '../Orders/Orders';
import './OrdersList.css'; // Archivo CSS para el estilo personalizado

const OrdersList = ({ orders }) => {
  return (
    <div className="orders-list">
      {orders.map(order => (
        <Orders key={order._id} order={order} />
      ))}
    </div>
  );
};

export default OrdersList;

