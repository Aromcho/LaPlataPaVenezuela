// client/src/pages/Seguimiento/Orders.jsx
import React from 'react';
import OrderCard from './OrderCard';

const Orders = ({ order }) => {
  return (
    <div className="order-item">
      <OrderCard order={order} />
    </div>
  );
};

export default Orders;
