import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios';
import Swal from 'sweetalert2';
import BioCard from '../../pages/Admin/BioCard/BioCard.jsx';
import "./NavBar.css"; // Importación del archivo CSS

const NavBar = () => {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const checkOnlineStatus = async () => {
      try {
        const response = await axios.get("/api/sessions/online");
        setIsOnline(response.status === 200);
      } catch (error) {
        setIsOnline(false);
      }
    };

    checkOnlineStatus();
  }, []);

  const logout = async () => {
    try {
      const response = await axios.post('/api/sessions/signout');
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: '¡Sesión cerrada!',
          text: 'Has cerrado la sesión correctamente.',
          confirmButtonText: 'OK'
        });
        setIsOnline(false);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al cerrar la sesión.',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error('Error al cerrar la sesión', error);
    }
  };

  const renderAuthButtons = () => {
    if (isOnline) {
      return (
        <NavDropdown title="Perfil" id="basic-nav-dropdown" align="end">
          <NavDropdown.Item>
            <BioCard />
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/" onClick={logout}>
            Cerrar sesión
          </NavDropdown.Item>
        </NavDropdown>
      );
    } else {
      return (
        <Button as={Link} to="/user/login" variant="danger" className="ms-2">
          Iniciar sesión
        </Button>
      );
    }
  };

  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="./img/LAPLATAPAVENEZUELA.png"
            alt="Venezuela"
            className="navbar-logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto mx-auto text-center">
            <Nav.Link href="#quienes-somos">Quiénes Somos</Nav.Link>
            <Nav.Link href="#servicios">Servicios</Nav.Link>
            <Nav.Link href="#calculadora">Calculadora de Cambio</Nav.Link>
            <Nav.Link href="#contacto">Contacto</Nav.Link>
          </Nav>
          {renderAuthButtons()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
