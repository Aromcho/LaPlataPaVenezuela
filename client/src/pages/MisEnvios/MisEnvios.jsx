import React, { useEffect, useState } from 'react';
import OrdersList from './OrdersList/OrdersList';
import './MisEnvios.css'; // Archivo CSS para estilos personalizados

const MisEnvios = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  // Obtener el usuario actual
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch('/api/sessions/online');
        const data = await response.json();
        setUserId(data.user_id);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUserId();
  }, []);

  // Obtener las órdenes del usuario
  useEffect(() => {
    if (userId) {
      const fetchOrders = async () => {
        try {
          const response = await fetch(`/api/orders/user/${userId}`); // Usar userId
          const data = await response.json();
          setOrders(data);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching orders:', error);
          setIsLoading(false);
        }
      };

      fetchOrders();
    }
  }, [userId]);

  return (
    <div className="seguimiento-container">
      <h4>Mis Envios</h4>
      {isLoading ? (
        <div className="loading">Cargando órdenes...</div>
      ) : (
        <OrdersList orders={orders} />
      )}
    </div>
  );
};

export default MisEnvios;
