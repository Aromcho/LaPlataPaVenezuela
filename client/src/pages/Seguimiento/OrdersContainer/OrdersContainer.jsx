import React from 'react';
import OrdersListContainer from '../OrdersListContainer/OrdersListContainer';
import './OrdersContainer.css'; // Estilos personalizados para OrdersContainer

// Ejemplo de datos de pedidos

const OrdersContainer = ({orders}) => {
  return (
    <div className="orders-container">
      <h2 className="orders-title">Tus Órdenes</h2>
      <OrdersListContainer orders={orders} /> {/* Pasando los datos de pedidos aquí */}
    </div>
  );
};

export default OrdersContainer;
