import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Face.css';
import ItemListContainer from '../ItemListContainer/ItemListContainer.jsx';
import { Typography } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import { styled } from '@mui/system';
import Calculadora from '../Calculadora/Calculadora.jsx';
import Testimonials from '../Testimonials/Testimonials.jsx';
import { Image } from 'react-bootstrap-icons';
import ContactForm from '../ContactForm/ContactForm.jsx';

const BackgroundHeader = styled('header')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundImage: 'url(./img/fondo.webp)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '100%',
  padding: '50px 0',
  
});

const Face = () => {
  return (
    <div>
      

      <header className="d-flex flex-column flex-md-row justify-content-around align-items-center p-2">
          <img src="./img/fondo.webp" alt="Fondo" className="bg-image img-fluid" />
        <Col xs={12} md={4} className="text-center text-md-left">
          <h1 className="display-4">La Plata pa' Venezuela</h1>
          <p className="lead">Tu solución confiable para enviar dinero a Venezuela.</p>
          <div className="d-flex flex-column flex-md-row justify-content-around mt-3">
            <a href="#contacto" className="btn btn-primary mb-2 mb-md-0 mx-md-2 d-flex justify-content-around">
              <img src="./img/whatsapp-AwvrBaRrObFNPLxM.avif" className='img-boton' alt="" /> Enviar
            </a>
            <a href="#contacto" className="btn btn-primary mx-md-2 d-flex justify-content-around">
              <img src="./img/instagram-icon-YrDaMZ7O21hPKk33.avif" className='img-boton' alt="" /> Síguenos
            </a>
          </div>
        </Col>
        <Col xs={12} md={4} className="d-flex justify-content-center">
          <img src="./img/LAPLATAPAVENEZUELA.png" alt="Venezuela" className="img-fluid rounded-circle" style={{ maxWidth: '200px' }} />
        </Col>
      </header>

      <main>
        <section id="quienes-somos" className="quienes-somos-section">
          <div className="container">
            <h2 className="section-title">Quiénes Somos</h2>
            <div className="row">
              <div className="col-md-6">
                <img src="./img/quienes-somos.jpg" alt="Sobre Nosotros" className="img-fluid rounded" />
              </div>
              <div className="col-md-6 ">
                <p className="section-description">Somos una empresa dedicada a facilitar el envío de remesas a Venezuela, ofreciendo un servicio confiable, rápido y seguro. Nuestro compromiso es brindar la mejor experiencia a nuestros clientes, asegurando que su dinero llegue a su destino de manera eficiente.</p>
                <a href="#contacto" className="btn btn-primary"><img src="./img/whatsapp-AwvrBaRrObFNPLxM.avif" className="" alt="" /> Contáctanos</a>
              </div>
            </div>
          </div>
        </section>
        <section id="servicios" className="servicios-section">
          <div className=' w-100 d-flex justify-content-center mt-5'><img src="./img/E-Wallet-pana.png" className=' img-blue w-25 '/></div>
          <div className="container">
            <h2 className="section-title text-center text-white">Nuestros Servicios</h2>
            <div className=" col">
              <div className="row text-white mt-5">
                <div className="cont-card container d-flex align-items-center">
                  <img src="./img/Cambio de Divisas.webp" className="card-img-top" alt="..." />
                  <div className="card-body card-sobre-derecha">
                    <h3 className="text-white">Envío de Remesas</h3>
                    <p className="text-white">Facilitamos el envío de remesas a Venezuela con rapidez y seguridad.</p>
                  </div>
                </div>
              </div>
              <div className="row mt-5">
                <div className="cont-card container d-flex align-items-center">
                  <div className="card-body card-sobre-izquierda">
                    <h3 className="text-white">Cambio de Divisas</h3>
                    <p className="text-white">Ofrecemos el mejor tipo de cambio para tus operaciones en diferentes divisas.</p>
                  </div>
                  <img src="./img/envio de remesas.webp" className="card-img-top" alt="..." />

                </div>
              </div>
            </div>
          </div>
        </section>
        <ItemListContainer/>
        <Calculadora/>
        <Testimonials/>
        <ContactForm/>
      </main>

      <footer className="footer p-3">
        <p>Derechos reservados © 2023 La Plata pa' Venezuela</p>
        <Link to="/user/login">admin</Link>
      </footer>

      
      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.2/dist/umd/popper.min.js"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"></script>
      
    </div>
  );
};

export default Face;
