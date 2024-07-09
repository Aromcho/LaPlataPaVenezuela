import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import './ContactForm.css'; // Estilo para este componente

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes implementar la lógica para enviar el formulario
    console.log(`Nombre: ${name}, Email: ${email}, Mensaje: ${message}`);
    // Reiniciar el formulario
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <Container className="contact-form-container">
      <h2 className="text-center mb-4">Contacto</h2>
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
    </Container>
  );
};

export default ContactForm;
