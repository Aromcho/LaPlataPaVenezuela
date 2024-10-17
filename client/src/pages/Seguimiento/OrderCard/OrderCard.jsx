import React from 'react';
import { Card } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import TodayIcon from '@mui/icons-material/Today';
import './OrderCard.css';

const OrderCard = ({ order }) => {
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'recibido':
        return 'order-status recibido';
      case 'en proceso':
        return 'order-status en-proceso';
      case 'completado':
        return 'order-status completado';
      default:
        return 'order-status';
    }
  };

  return (
    <Card className="custom-order-card" variant="outlined">
      <div className="order-title">
        <span>Remitente: {order.sender}</span>
        <span className={getStatusClass(order.status)}>{order.status}</span>
      </div>
      <div className="order-info">
        <PersonIcon className="order-icon" />
        <strong>Destinatario:</strong> {order.receiver}
      </div>
      <div className="order-info">
        <AttachMoneyIcon className="order-icon" />
        <strong>Monto Enviado:</strong> ${order.amount}
      </div>
      <div className="order-info">
        <LocationOnIcon className="order-icon" />
        <strong>País de Origen:</strong> {order.originCountry}
      </div>
      <div className="order-info">
        <LocationOnIcon className="order-icon" />
        <strong>País de Destino:</strong> {order.destinationCountry}
      </div>
      <div className="order-info">
        <SendIcon className="order-icon" />
        <strong>Fecha de Envío:</strong> {order.sendDate}
      </div>
      <div className="order-info">
        <TodayIcon className="order-icon" />
        <strong>Fecha Estimada de Entrega:</strong> {order.estimatedDeliveryDate}
      </div>
    </Card>
  );
};

export default OrderCard;
