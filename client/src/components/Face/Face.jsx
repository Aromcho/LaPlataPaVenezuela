import React from 'react';
import { Col, Row } from 'react-bootstrap';
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
      <header className="hero-section p-4">
        <div className='titulo-hero'>
          <h1 className="">Envía dinero en minutos</h1>
          <p className="">
            Con tarifas justas, transferencias inmediatas y un trato personalizado. Te ofrecemos tranquilidad a ti y a tus seres queridos.
          </p>
        </div>

        <div className="calculadora-hero">
          <Calculadora />
        </div>
      </header>

      <main>
      <section
        id="quienes-somos"
        className="quienes-somos-section"
        style={{
          backgroundImage: `url("./img/paisaje.png")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: '60px 0'
        }}
      >
          <h2 className='text-center'>¡¡CON NOSOTROS, TU DINERO LLEGA SEGURO DONDE QUIÉRA QUE LO NECESITES!!</h2>
        </section>
        <section id="servicios" className="servicios-section">
          <div className=" w-100 d-flex justify-content-center mt-5">
            <img src="./img/E-Wallet-pana.png" className=" img-blue w-25 " />
          </div>
          <div className="container">
            <h2 className="section-title text-center text-white">
              Nuestros Servicios
            </h2>
            <div className=" col">
              <div className="row text-white mt-5">
                <div className="cont-card container d-flex align-items-center">
                  <img
                    src="./img/Cambio de Divisas.webp"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body card-sobre-derecha">
                    <h3 className="text-white">Envío de Remesas</h3>
                    <p className="text-white">
                      Facilitamos el envío de remesas a Venezuela con rapidez y
                      seguridad.
                    </p>
                  </div>
                </div>
              </div>
              <div className="row mt-5">
                <div className="cont-card container d-flex align-items-center">
                  <div className="card-body card-sobre-izquierda">
                    <h3 className="text-white">Cambio de Divisas</h3>
                    <p className="text-white">
                      Ofrecemos el mejor tipo de cambio para tus operaciones en
                      diferentes divisas.
                    </p>
                  </div>
                  <img
                    src="./img/envio de remesas.webp"
                    className="card-img-top"
                    alt="..."
                  />
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
