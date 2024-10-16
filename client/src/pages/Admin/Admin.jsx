import React, { useState, useContext } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import ProductManagement from './ProductManagement/ProductManagement.jsx';
import UserManagement from './UserManagement/UserManagement.jsx';
import OrderManagement from './OrderManagement/OrderManagement.jsx';
import { Context } from '../../context/CartContext.jsx';
import './Admin.css'; // Importación del archivo CSS

// Componente para cada TabPanel
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// Propiedades de accesibilidad para las pestañas
function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

const Admin = () => {
  const [value, setValue] = useState(0); // Controla la pestaña activa
  const { isAdmin } = useContext(Context); // Consumiendo el contexto

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!isAdmin) {
    return (
      <div className="text-center">
        <h1 className="text-danger">Acceso denegado</h1>
        <p>No tienes permiso para acceder a esta página.</p>
      </div>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      {/* Barra de pestañas */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="Admin tabs">
          <Tab label="Tasas" {...a11yProps(0)} />
          <Tab label="Usuarios" {...a11yProps(1)} />
          <Tab label="Ordenes" {...a11yProps(2)} />
        </Tabs>
      </Box>

      {/* Paneles de cada pestaña */}
      <CustomTabPanel value={value} index={0}>
        <ProductManagement />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <UserManagement />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <OrderManagement />
      </CustomTabPanel>
    </Box>
  );
};

export default Admin;
