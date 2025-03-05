import React, { useEffect, useState } from 'react';
import OrdersList from './OrdersList/OrdersList';
import { Card } from 'react-bootstrap';
import { AttachMoney } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirigir
import './MisEnvios.css'; // Archivo CSS para estilos personalizados

const MisEnvios = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null); // Estado para manejar errores
const navigate = useNavigate();
  // Obtener el usuario actual
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch('/api/sessions/online');
        if (!response.ok) throw new Error('No se pudo obtener el usuario');
        const data = await response.json();

        if (data?.user_id) {
          setUserId(data.user_id);
        } else {
          throw new Error('Usuario no autenticado');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setError('No se pudo obtener el usuario. Inicia sesión.');
      }
    };
    
    fetchUserId();
  }, []);

  // Obtener las órdenes del usuario
  useEffect(() => {
    if (!userId) return; // Evita ejecutar el fetch con un userId inválido

    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/orders/user/${userId}`);

        if (!response.ok) throw new Error('No se pudieron obtener las órdenes');

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('No se pudieron obtener las órdenes.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const handleSendMoneyClick = () => {
    navigate('/checkout'); // Redirige a /checkout cuando se hace clic
  };

  return (
    <div className="seguimiento-container">
      <h4>Mis Envios</h4>
      <Card className="send-money-card" onClick={handleSendMoneyClick}>
        <Card.Body className="d-flex align-items-center justify-content-center flex-column">
          {/* Ícono de mayor tamaño */}
          <AttachMoney style={{ fontSize: '48px', color: '#fcfcfc' }} />
          <h4 className="mt-2 text-white">Enviar Dinero</h4>
        </Card.Body>
      </Card>
      {error && <div className="error-message">{error}</div>}

      {isLoading ? (
        <div className="loading">Cargando órdenes...</div>
      ) : (
        orders.length > 0 ? <OrdersList orders={orders} /> : <p>No tienes órdenes aún.</p>
      )}
    </div>
  );
};

export default MisEnvios;
