// src/pages/Checkout/Checkout.jsx
import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import './Checkout.css'; // Importa el archivo CSS para los estilos personalizados

const Checkout = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    nroOrden: '',
    comprobante: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, comprobante: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('nombre', formData.nombre);
    formDataToSend.append('apellido', formData.apellido);
    formDataToSend.append('dni', formData.dni);
    formDataToSend.append('nroOrden', formData.nroOrden);
    formDataToSend.append('comprobante', formData.comprobante);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Error en la creación de la orden');
      }

      const data = await response.json();
      alert('Orden creada con éxito: ' + data.order.id); // Ajusta según la estructura de tu respuesta
    } catch (error) {
      console.error('Error al crear la orden:', error);
      alert('Hubo un error al crear la orden: ' + error.message);
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
        label="Nombre"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Apellido"
        name="apellido"
        value={formData.apellido}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="DNI"
        name="dni"
        value={formData.dni}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Nro de Orden"
        name="nroOrden"
        value={formData.nroOrden}
        onChange={handleChange}
        required
        fullWidth
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
      >
        Crear Orden
      </Button>
    </Box>
  );
};

export default Checkout;