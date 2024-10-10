import React from 'react';
import { Col } from 'react-bootstrap';
import './Face.css';
import { Typography } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import Calculadora from '../Calculadora/Calculadora.jsx';
import ItemListContainer from '../ItemListContainer/ItemListContainer.jsx';
import Testimonials from '../Testimonials/Testimonials.jsx';
import ContactForm from '../ContactForm/ContactForm.jsx';

const Face = () => {
  return (
    <div>
      <header className="hero-section d-flex flex-column flex-md-row justify-content-around align-items-center p-4">
        <Col xs={12} md={6} className="text-center text-md-left">
          <h1 className="display-4 text-white">La Plata pa' Venezuela</h1>
          <p className="lead text-white">Envía amor a casa. Remesas seguras y rápidas a cualquier parte del mundo.</p>

          <div className="calculadora-hero">
            <Calculadora />
          </div>
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
        <ItemListContainer />
        <Testimonials />
        <ContactForm />
      </main>

      <footer className="footer p-3">
        <p>Derechos reservados © 2023 La Plata pa' Venezuela</p>
      </footer>
    </div>
  );
};

export default Face;
