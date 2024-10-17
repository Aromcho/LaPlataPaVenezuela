import React from 'react';
import { Card } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import TodayIcon from '@mui/icons-material/Today';
import './OrderCard.css';

const OrderCard = ({ order }) => {
  const status = order.state.toLowerCase();  // Cambiado de `order.status` a `order.state`
  
  const getStatusClass = (status) => {
    switch (status) {
      case 'recibido':
        return 'order-status recibido';
      case 'en proceso':
        return 'order-status en-proceso';
      case 'completado':
        return 'order-status completado';
      case 'delivered': // Nuevo caso para "delivered"
        return 'order-status completado';
      default:
        return 'order-status';
    }
  };

  return (
    <Card className="custom-order-card" variant="outlined">
      <div className="order-title">
        {/* Cambiado de order.sender a order.user_id.name */}
        <span>Remitente: {order.user_id.name}</span>  
        <span className={getStatusClass(order.state)}>{order.state}</span>  
      </div>
      <div className="order-info">
        <PersonIcon className="order-icon" />
        <strong>Destinatario:</strong> {order.user_id.email} {/* Uso de email como "destinatario" */}
      </div>
      <div className="order-info">
        <AttachMoneyIcon className="order-icon" />
        <strong>Monto Enviado:</strong> ${order.quantity} {/* Cambiado a order.quantity */}
      </div>
      <div className="order-info">
        <SendIcon className="order-icon" />
        <strong>Fecha de Envío:</strong> {new Date(order.createdAt).toLocaleDateString()} {/* Formateo de fecha */}
      </div>
      <div className="order-info">
        <TodayIcon className="order-icon" />
        <strong>Fecha Estimada de Entrega:</strong> {new Date(order.updatedAt).toLocaleDateString()} {/* Formateo de fecha */}
      </div>
    </Card>
  );
};

export default OrderCard;
