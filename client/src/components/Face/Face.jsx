// Face.jsx
import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import './Face.css'; 
import Calculadora from '../Calculadora/Calculadora.jsx';
import ItemListContainer from '../ItemListContainer/ItemListContainer.jsx';
import Testimonials from '../Testimonials/Testimonials.jsx';
import ContactForm from '../ContactForm/ContactForm.jsx';
import PasosEnvioDinero from '../PasosEnvioDinero/PasosEnvioDinero.jsx';
import ChatBubble from '../ChatBubble/ChatBubble.jsx';
import ChatModal from '../ChatModal/ChatModal.jsx';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';


const Face = () => {
  const [showChatModal, setShowChatModal] = useState(false);

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
        <PasosEnvioDinero/>
        <ItemListContainer />
        <Testimonials />
        <ContactForm />
      </main>

      <footer className="footer p-3">
        <p>Derechos reservados © 2023 La Plata pa' Venezuela</p>
      </footer>
      
      <div className="floating-icons">
        <a href="https://wa.me/584247249758" target="_blank" rel="noopener noreferrer" className="whatsapp-float">
          <WhatsAppIcon style={{ fontSize: 40 }} />
        </a>
      </div>

      {/* Burbuja de Chat */}
      <ChatBubble onClick={() => {
        console.log("Burbuja de chat clickeada"); // Verifica que esto se muestre en la consola
        setShowChatModal(true);
      }} />

      {/* Modal de Chat */}
      <ChatModal show={showChatModal} onHide={() => setShowChatModal(false)} />
    </div>
  );
};

export default Face;
