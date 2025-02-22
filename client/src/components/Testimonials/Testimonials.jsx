import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import './Testimonials.css'; // Estilo para este componente

const Testimonials = () => {
  // Datos de ejemplo de testimonios
  const testimonials = [
    {
      id: 1,
      name: 'Juan Pérez',
      city: 'Ciudad de México',
      comment:
        '¡El servicio de envío de dinero más rápido y seguro que he usado! Recomiendo totalmente Legz.',
    },
    {
      id: 2,
      name: 'Maria Rodriguez',
      city: 'Madrid, España',
      comment: 'plata pa venezuela hizo que enviar dinero a mi familia en América Latina fuera fácil y sin complicaciones.',
    },
  ];

  return (
    <div className="testimonials-container">
      <h2 className="text-center mb-4 py-3">Testimonios de Clientes</h2>
      <Row xs={1} md={2} className="g-4">
        {testimonials.map((testimonial) => (
          <Col className="" key={testimonial.id}>
            <Card className="testimonial-card">
              <Card.Body>
                <Card.Text>{testimonial.comment}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">
                  {testimonial.name}, {testimonial.city}
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Testimonials;
