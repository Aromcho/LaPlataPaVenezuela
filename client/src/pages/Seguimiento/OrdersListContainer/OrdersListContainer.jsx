import React from 'react';
import OrdersList from '../OrdersList/OrdersList.jsx'; 
import './OrdersListContainer.css'; // Archivo CSS para el estilo personalizado

const OrdersListContainer = ({ orders }) => {
  return (
    <div className="orders-list-container">
      <OrdersList orders={orders} />
    </div>
  );
};

export default OrdersListContainer;
