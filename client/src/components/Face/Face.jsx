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
