// client/src/pages/Seguimiento/OrdersList.jsx
import React from 'react';
import Orders from './Orders';

const OrdersList = ({ orders }) => {
  return (
    <div className="orders-list">
      {orders.map(order => (
        <Orders key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrdersList;
