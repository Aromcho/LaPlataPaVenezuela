import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import './Testimonials.css'; // Estilo para este componente

const Testimonials = () => {
  // Datos de ejemplo de testimonios
  const testimonials = [
    {
      id: 1,
      name: 'Mariangeles Leon',
      image: './img/MariangelesLeon.jpg',
      comment:
        'Gracias a “La Plata pa’ Venezuela” por ayudarme a estar más cerca de mi familia; siempre hacen que el envío de remesas sea rápido, seguro y sin complicaciones. ¡1000% recomendados! Gracias por ser ese puente confiable con nuestra gente en Venezuela.🙌🏻',
    },
    {
      id: 2,
      name: 'Yaina Rodríguez',
      image: './img/YainaRodríguez.jpg',
      comment: 'En principio te conocí por  allá 2018 o comienzos del 2019, si mal no recuerdo!!! Desde el primer momento has sido profesional y transparente! Te super agradezco tu existencia por que la verdad haces que la vida sea más fácil y práctica! Contigo siempre ha sido un transacción confiable!! Y por supuesto Recomendable! Gracias Gracias Gracias!!!',
    },
    {
      id: 3,
      name: 'Arom Aguilar',
      image: './img/AromAguilar.jpg',
      comment: 'Conocí Plata pa’ Venezuela en 2019 y, desde entonces, no los suelto. Todo va al grano y sin enredos: mando la plata y en cuestión de horas le llega a mi gente. Me ahorro dolores de cabeza y sé que el dinero está seguro. Si alguien me pregunta, los recomiendo con los ojos cerrados.',
    },
  ];

  // Array de videos locales
  const videos = [
    './videos/video1.MOV',
    './videos/video2.mp4',
    './videos/video3.mp4',
    './videos/video4.mp4'
  ];

  return (
    <div className="testimonials-container">
      <h2 className="testimonials-title">LO QUE DICEN QUIENES CONFIAN EN NOSOTROS</h2>
      <div className="testimonials-videos">
        <Container>
          <Row className="gy-4">
            {videos.map((src, i) => (
              <Col key={i} md={6}>
                <div className="video-wrapper ratio ratio-16x9">
                  <video className="testimonial-video" controls>
                    <source src={src} type="video/mp4" />
                    Tu navegador no soporta videos HTML5.
                  </video>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <div className="testimonios-cards">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonio-card">
              <img className='avatar' src={testimonial.image} alt="" />
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
