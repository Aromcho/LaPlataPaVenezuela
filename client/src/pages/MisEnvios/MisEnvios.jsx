import React, { useEffect, useState } from 'react';
import OrdersList from './OrdersList/OrdersList';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './MisEnvios.css'; // Archivo CSS para estilos personalizados

const MisEnvios = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // Obtener el usuario actual
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch('/api/sessions/online');
        const data = await response.json();

        if (data.isOnline) {
          setUserId(data.user_id);
        } else {
          // Mostrar el SweetAlert si no está logueado
          Swal.fire({
            title: 'No estás logueado',
            text: 'Para ver tus envíos, inicia sesión.',
            icon: 'warning',
            confirmButtonText: 'Iniciar sesión',
          }).then((result) => {
            if (result.isConfirmed) {
              // Redirigir a la página de inicio de sesión
              navigate('/login');
            }
          });
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUserId();
  }, [navigate]);

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
