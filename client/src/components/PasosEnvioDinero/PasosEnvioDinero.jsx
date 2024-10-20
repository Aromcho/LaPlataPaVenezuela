import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AccountCircle, Payment, Receipt, Send } from '@mui/icons-material';

const PasosEnvioDinero = () => {
  return (
    <section className="pasos-section py-5" style={{ textAlign: 'center', marginTop: '30px' }}>
      <h2 style={{ color: 'black', marginBottom: '20px' }}>Pasos para Enviar Dinero</h2>
      <Container>
        <Row className="justify-content-center">
          <Col md={3} className="paso">
            <AccountCircle style={{ fontSize: 60, color: '#007bff' }} />
            <p>Paso 1: Regístrate y crea tu cuenta.</p>
          </Col>
          <Col md={3} className="paso">
            <Send style={{ fontSize: 60, color: '#007bff' }} />
            <p>Paso 2: Introduce la información del destinatario.</p>
          </Col>
          <Col md={3} className="paso">
            <Payment style={{ fontSize: 60, color: '#007bff' }} />
            <p>Paso 3: Elige el monto y el método de pago.</p>
          </Col>
          <Col md={3} className="paso">
            <Receipt style={{ fontSize: 60, color: '#007bff' }} />
            <p>Paso 4: Envía y recibe un comprobante.</p>
          </Col>
        </Row>
      </Container>
      <p className="nota-seguridad" style={{ color: 'gray', marginTop: '20px' }}>
        Tus datos y dinero están protegidos con tecnología de encriptación de última generación.
      </p>
    </section>
  );
};

export default PasosEnvioDinero;
