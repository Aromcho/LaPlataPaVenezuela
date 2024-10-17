import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { FaWhatsapp, FaInstagram, FaEnvelope } from 'react-icons/fa'; // Importar íconos
import './ContactForm.css'; // Estilo para este componente

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Nombre: ${name}, Email: ${email}, Mensaje: ${message}`);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <Container className="contact-form-container">
      <h2 className="text-center mb-4">Contacto</h2> {/* Título en la parte superior */}

      <div className="form-layout">
        <div className="social-links">
          <a href="https://wa.me/584247249758" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="social-icon" /> WhatsApp
          </a>
          <a href="https://www.instagram.com/laplatapavenezuelaa" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon" /> Instagram
          </a>
          <a href="mailto:laplatapavenezuela.ari@gmail.com">
            <FaEnvelope className="social-icon" /> Gmail
          </a>
        </div>

        <div className="contact-form">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Mensaje"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Enviar Mensaje
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default ContactForm;
