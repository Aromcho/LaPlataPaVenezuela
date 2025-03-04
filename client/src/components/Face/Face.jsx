import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './Face.css';
import { Typography } from '@mui/material';
import ProContra from '../ProContra/ProContra.jsx';
import Calculadora from '../Calculadora/Calculadora.jsx';
import ItemListContainer from '../ItemListContainer/ItemListContainer.jsx';
import Testimonials from '../Testimonials/Testimonials.jsx';
import SeguridadSeccion from '../SeguridadSeccion/SeguridadSeccion.jsx';
import Recarga from '../Recarga/Recarga.jsx';
import Servicios from '../Servicios/Servicios.jsx';
import FAQ from '../FAQ/FAQ.jsx';
import { FaWhatsapp } from 'react-icons/fa';

const Face = () => {
  return (
    <div>
      <header className="hero-section p-4">
        <div className='titulo-hero'>
          <h1 className="">Envía dinero en minutos</h1>
          <p className="hero-p">
            Con tarifas justas, transferencias inmediatas y un trato personalizado. Te ofrecemos tranquilidad a ti y a tus seres queridos.
          </p>
          <img className='w-50' src="./img/raya_verde.png" alt="" />
          <h2 className='mt-2'>¡PROTEGE A LOS TUYOS!</h2>
          <button className='button-enviar'>
          <FaWhatsapp className='whatsapp-icon'/> haz tu enviuo ahora
            </button>
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
        <ProContra />
        <SeguridadSeccion />
        <Recarga />
        <Servicios />
        <Testimonials />
        <FAQ />
      </main>

      <footer className="footer p-3">
        <p>Derechos reservados © 2023 La Plata pa' Venezuela</p>
      </footer>
    </div>
  );
};

export default Face;
