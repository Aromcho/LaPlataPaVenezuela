import React, { useState, useContext } from 'react';
import { Container, Row, Col, Card, Navbar, Nav } from 'react-bootstrap';
import ProductManagement from './ProductManagement/ProductManagement.jsx';
import UserManagement from './UserManagement/UserManagement.jsx';
import BioCard from './BioCard/BioCard.jsx';
import { Context } from '../../context/CartContext.jsx';

const Admin = () => {
  const [activeComponent, setActiveComponent] = useState('productos'); // Cambiado a 'productos'
  const { isAdmin } = useContext(Context); // Consumiendo el contexto

  const renderComponent = () => {
    switch (activeComponent) {
      case 'productos':
        return <ProductManagement />;
      case 'usuarios':
        return <UserManagement />;
      default:
        return null; // Puedes agregar un valor por defecto si es necesario
    }
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
    <div>
      <Container fluid className="bg-secundary" style={{ display: 'flex' }}>
        <Navbar bg="dark" variant="dark" className="flex-column mt-5">
          <Nav className="flex-column">
            {[
              { name: 'Productos', icon: 'box-seam' },
              { name: 'Usuarios', icon: 'people-fill' },
            ].map((item, index) => (
              <Nav.Link key={index} onClick={() => setActiveComponent(item.name.toLowerCase())}>
                <i className={`bi ${item.icon}`} style={{ marginRight: '8px' }}></i>
                {item.name}
              </Nav.Link>
            ))}
            <BioCard />
          </Nav>
        </Navbar>
        <main style={{ flexGrow: 1, padding: '20px' }}>
          <h1 className='text-white'>Usuarios</h1>
          {renderComponent()}
        </main>
      </Container>
    </div>
  );
};

export default Admin;
