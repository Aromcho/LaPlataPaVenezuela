import React from 'react';
import { Col } from 'react-bootstrap';
import './Face.css'; 
import Calculadora from '../Calculadora/Calculadora.jsx';
import ItemListContainer from '../ItemListContainer/ItemListContainer.jsx';
import Testimonials from '../Testimonials/Testimonials.jsx';
import ContactForm from '../ContactForm/ContactForm.jsx';

const Face = () => {
  return (
    <div
      style={{
        backgroundImage: 'url(/fondo.jpg)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
      }}
    >
      <header className="hero-section d-flex flex-column flex-md-row justify-content-around align-items-center p-4">
        <Col xs={12} md={6} className="text-center text-md-left">
          <div
            className="contenido-hero"
            style={{
              backgroundColor: 'rgba(128, 128, 128, 0.8)',
              padding: '20px',
              borderRadius: '10px',
              display: 'inline-block',
              textAlign: 'center',
            }}
          >
            <h1 className="display-4 text-white">La Plata pa' Venezuela</h1>
            <p className="lead text-white">Envía amor a casa. Remesas seguras y rápidas a cualquier parte del mundo.</p>
            <div className="calculadora-hero">
              <Calculadora />
            </div>
          </div>
        </Col>
      </header>

      <main>
        <section className="pasos-section" style={{ textAlign: 'center', marginTop: '30px' }}>
          <h2 style={{ color: 'white', marginBottom: '20px' }}>Pasos para Enviar Dinero</h2>
          <div className="pasos-container">
            <div className="paso">
              <img src="/paso1.png" alt="Paso 1" className="paso-img" />
              <p>Paso 1: Regístrate y crea tu cuenta.</p>
            </div>
            <div className="paso">
              <img src="/paso2.png" alt="Paso 2" className="paso-img" />
              <p>Paso 2: Introduce la información del destinatario.</p>
            </div>
            <div className="paso">
              <img src="/paso3.png" alt="Paso 3" className="paso-img" />
              <p>Paso 3: Elige el monto y el método de pago.</p>
            </div>
            <div className="paso">
              <img src="/paso4.png" alt="Paso 4" className="paso-img" />
              <p>Paso 4: Envía y recibe un comprobante.</p>
            </div>
          </div>
          <p className="nota-seguridad">Tus datos y dinero están protegidos con tecnología de encriptación de última generación.</p>
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
