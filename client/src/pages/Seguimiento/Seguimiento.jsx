import React, { useEffect, useState } from 'react';
import OrdersContainer from './OrdersContainer/OrdersContainer'; // Asegúrate de que el archivo OrdersContainer esté configurado correctamente
import './Seguimiento.css'; // Archivo CSS para estilos personalizados

const Seguimiento = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders'); // Ajusta este endpoint a tu API
        const data = await response.json();
        setOrders(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="seguimiento-container">
      <h1>Seguimiento de Envío de Dinero</h1>
      {isLoading ? (
        <div className="loading">Cargando órdenes...</div>
      ) : (
        <OrdersContainer orders={orders} />
      )}
    </div>
  );
};

export default Seguimiento;
