import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, InputAdornment } from '@mui/material';
import { Context } from '../../context/CartContext';
import Swal from 'sweetalert2';
import './Checkout.css';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getUserId } = useContext(Context);
  const { fromAmount, toAmount, fromCurrency, toCurrency } = location.state || {};
  
  const [formData, setFormData] = useState({
    nombreReceptor: '',
    dni: '',
    comprobante: null,
    fromAmount: fromAmount || '',
    toAmount: toAmount || '',
    fromCurrency: fromCurrency || 'USD',
    toCurrency: toCurrency || 'USD',
    userId: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userId = await getUserId();
        setFormData(prevFormData => ({ ...prevFormData, userId }));
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };
    fetchUserId();
  }, [getUserId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, comprobante: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.userId || !formData.nombreReceptor || !formData.fromAmount || !formData.toAmount) {
      setError('Por favor, completa todos los campos obligatorios.');
      setLoading(false);
      return;
    }

    const orderData = {
      user_id: formData.userId,
      nameReceiver: formData.nombreReceptor,
      fromAmount: formData.fromAmount,
      toAmount: formData.toAmount,
      fromCurrency: formData.fromCurrency,
      toCurrency: formData.toCurrency,
      userReceipt: formData.comprobante
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en la creación de la orden');
      }

      const data = await response.json();

      // Mostrar alerta con SweetAlert
      Swal.fire({
        title: 'Orden Creada',
        text: 'La orden fue creada con éxito.',
        icon: 'success',
        confirmButtonText: 'Ver Seguimiento',
        showCancelButton: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/envios'); // Redirigir a /envios
        }
      });

    } catch (error) {
      console.error('Error al crear la orden:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="checkout-form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        margin: '0 auto',
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'white',
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Crear Orden
      </Typography>
      <TextField
        label="Nombre y apellido del que recibe"
        name="nombreReceptor"
        value={formData.nombreReceptor}
        onChange={handleChange}
        required
        fullWidth
      />

      <TextField
        label="DNI o cédula del que recibe"
        name="dni"
        value={formData.dni}
        onChange={handleChange}
        required
        fullWidth
      />

      <TextField
        label="Monto Enviado"
        name="fromAmount"
        value={formData.fromAmount}
        onChange={handleChange}
        required
        fullWidth
        InputProps={{
          startAdornment: <InputAdornment position="start">{formData.fromCurrency}</InputAdornment>,
        }}
      />

      <TextField
        label="Monto Recibido"
        name="toAmount"
        value={formData.toAmount}
        fullWidth
        disabled
        InputProps={{
          startAdornment: <InputAdornment position="start">{formData.toCurrency}</InputAdornment>,
        }}
      />

      <Button
        variant="contained"
        component="label"
        fullWidth
        className="upload-button"
      >
        Subir Comprobante
        <input
          type="file"
          hidden
          onChange={handleFileChange}
        />
      </Button>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        className="submit-button"
        disabled={loading}
      >
        {loading ? 'Creando Orden...' : 'Crear Orden'}
      </Button>

      {error && (
        <Typography color="error" variant="body2" align="center">
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default Checkout;
