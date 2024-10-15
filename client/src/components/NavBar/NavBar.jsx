import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
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
          <h5 className='text-white m-1'>Hola Administrador</h5>
          <Dropdown className="ms-1">
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              Perfil
            </Dropdown.Toggle>

            <Dropdown.Menu align="end" variant="dark">
              <Dropdown.Item as="div">
                <BioCard /> {/* Aquí se muestra el componente BioCard */}
                <Button className=" w-100 mt-2" as={Link} to="/" onClick={logout} variant="dark">
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
    
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary ">
    <div className="container ">
      <a className="navbar-brand" href="#">
        <img src="./img/LAPLATAPAVENEZUELA.png" alt="Venezuela" className="img-fluid rounded-circle" style={{ maxWidth: '60px' }} />
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="#quienes-somos">Quiénes Somos <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#servicios">Servicios</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#calculadora">Calculadora de Cambio</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#contacto">Contacto</a>
          </li>
        </ul>
        {renderAuthButtons()}
      </div>
    </div>
  </nav>
  );
};

export default NavBar;