import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import Swal from 'sweetalert2';
import BioCard from '../../pages/Admin/BioCard/BioCard.jsx';
import Dropdown from 'react-bootstrap/Dropdown';
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
        console.error('Error al cerrar la sesión');
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
        <>
          <h6 className='text-white m-1'>Hola Administrador</h6> {/* Cambiado a h6 para tamaño más pequeño */}
          <Dropdown className="ms-1">
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              Perfil
            </Dropdown.Toggle>

            <Dropdown.Menu align="end" variant="dark">
              <Dropdown.Item as="div">
                <BioCard /> {/* Aquí se muestra el componente BioCard */}
                <Button className="w-100 mt-2" as={Link} to="/" onClick={logout} variant="dark">
                  Cerrar sesión
                </Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      );
    } else {
      return (
        <div className="auth-buttons">
          <Button className="ms-1" as={Link} to="/user/login" variant="dark">
            Iniciar sesión
          </Button>
        </div>
      );
    }
  };

  return (
    <Navbar expand="lg" variant="dark" bg="primary">
      <div className="container">
        <Navbar.Brand as={Link} to="/" className="logo">
          <img src="./img/LAPLATAPAVENEZUELA.png" alt="Venezuela" className="img-fluid rounded-circle" style={{ maxWidth: '60px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="#quienes-somos">¿Cómo Funciona?</Nav.Link>
            <Nav.Link as={Link} to="#servicios">Tarifas</Nav.Link>
            <Nav.Link as={Link} to="#calculadora">Calculadora</Nav.Link>
            <Nav.Link as={Link} to="#testimonios">Testimonios</Nav.Link>
            <Nav.Link as={Link} to="#faq">Preguntas Frec.</Nav.Link>
            <Nav.Link as={Link} to="#contacto">Contacto</Nav.Link>
          </Nav>
          {renderAuthButtons()}
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavBar;
