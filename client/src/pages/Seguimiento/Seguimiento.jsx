// client/src/pages/Seguimiento/Seguimiento.jsx
import React from 'react';
import OrdersContainer from './OrdersContainer'; // Cambiado a OrdersContainer

const Seguimiento = () => {
  return (
    <div className="seguimiento-container">
      <h1>Seguimiento de Envío de Dinero</h1>
      <OrdersContainer /> {/* Cambiado a OrdersContainer */}
    </div>
  );
};

export default Seguimiento;
