// client/src/pages/Seguimiento/OrdersContainer.jsx
import React from 'react';
import OrdersListContainer from './OrdersListContainer';

// Ejemplo de datos de pedidos
const ordersData = [
  {
    id: 1,
    sender: 'Juan Pérez',
    receiver: 'María López',
    amount: 1000,
    originCountry: 'Venezuela',
    destinationCountry: 'España',
    status: 'Recibido',
    sendDate: '2024-10-10',
    estimatedDeliveryDate: '2024-10-15',
  },
  {
    id: 2,
    sender: 'Carlos Gómez',
    receiver: 'Ana Martínez',
    amount: 500,
    originCountry: 'Colombia',
    destinationCountry: 'México',
    status: 'En Proceso',
    sendDate: '2024-10-11',
    estimatedDeliveryDate: '2024-10-16',
  },
  {
    id: 3,
    sender: 'Lucía Fernández',
    receiver: 'Pedro Ruiz',
    amount: 1500,
    originCountry: 'Argentina',
    destinationCountry: 'Chile',
    status: 'Completado',
    sendDate: '2024-10-05',
    estimatedDeliveryDate: '2024-10-12',
  },
];

const OrdersContainer = () => {
  return (
    <div className="orders-container">
      <OrdersListContainer orders={ordersData} /> {/* Pasando los datos de pedidos aquí */}
    </div>
  );
};

export default OrdersContainer;
