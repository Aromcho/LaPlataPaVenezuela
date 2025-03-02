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
        'Me encanta que sé qie mis padres reciben el dinero de forma rápida y segura.',
    },
    {
      id: 2,
      name: 'Maria Rodriguez',
      city: 'Madrid, España',
      comment: 'plata pa venezuela hizo que enviar dinero a mi familia en América Latina fuera fácil y sin complicaciones.',
    },
    {
      id: 3,
      name: 'Maria Rodriguez',
      city: 'Madrid, España',
      comment: 'La atencion es muy buena, tube dudas he hicimos una videollamada.',
    },
  ];

  return (
    <div className="testimonials-container">
      <h2 className="testimonials-title">LO QUE DICEN QUIENES CONFIAN EN NOSOTROS</h2>
      <div className="estimonials-videos">
        <Container>
          <Row className="mb-4">
            <Col md={6}>
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/videoid1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Col>
            <Col md={6}>
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/videoid2"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/videoid3"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Col>
            <Col md={6}>
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/videoid4"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="testimonios-cards">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonio-card">
              <img className='avatar' src="./img/avatar1.png" alt="" />
              <Card.Title>{testimonial.name}</Card.Title>
              <Card.Text>{testimonial.comment}</Card.Text>
              <img className='estrellas' src="./img/estrellas.png" alt="" />
          </div>
        ))}
        <div className="testimonio-rayas">
          <img src="./img/raya1.png" alt="" />
          <img src="./img/raya2.png" alt="" />
          <img src="./img/raya1.png" alt="" />
        </div>

      </div>
    </div>
  );
};

export default Testimonials;
