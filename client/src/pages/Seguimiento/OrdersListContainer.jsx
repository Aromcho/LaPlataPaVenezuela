// client/src/pages/Seguimiento/OrdersListContainer.jsx
import React from 'react';
import OrdersList from './OrdersList';

const OrdersListContainer = ({ orders }) => {
  return (
    <div className="orders-list-container">
      <OrdersList orders={orders} />
    </div>
  );
};

export default OrdersListContainer;
