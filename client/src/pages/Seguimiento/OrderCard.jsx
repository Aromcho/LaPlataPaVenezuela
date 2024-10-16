// client/src/pages/Seguimiento/OrderCard.jsx
import React from 'react';
import { Card } from '@mui/material';

const OrderCard = ({ order }) => {
  return (
    <Card className="order-card" variant="outlined">
      <h2>Remitente: {order.sender}</h2>
      <p><strong>Destinatario:</strong> {order.receiver}</p>
      <p><strong>Monto Enviado:</strong> ${order.amount}</p>
      <p><strong>País de Origen:</strong> {order.originCountry}</p>
      <p><strong>País de Destino:</strong> {order.destinationCountry}</p>
      <p><strong>Estado:</strong> {order.status}</p>
      <p><strong>Fecha de Envío:</strong> {order.sendDate}</p>
      <p><strong>Fecha Estimada de Entrega:</strong> {order.estimatedDeliveryDate}</p>
    </Card>
  );
};

export default OrderCard;
