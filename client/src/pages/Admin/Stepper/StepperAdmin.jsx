import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import LinearProgress from '@mui/material/LinearProgress';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import HandshakeIcon from '@mui/icons-material/Handshake';
import MoneyImage from '../../../assets/Icons/image.png';
import axios from 'axios';
import './StepperAdmin.css';

const steps = [
  { label: 'Recibido', icon: <AttachMoneyIcon /> },
  { label: 'En Proceso', icon: <LocalAirportIcon /> },
  { label: 'Completado', icon: <HandshakeIcon /> },
];

// Función para obtener el paso activo
const getActiveStepFromState = (state) => {
  switch (state) {
    case 'reserver':
      return 0;
    case 'payed':
      return 1;
    case 'delivered':
      return 2;
    default:
      return 0;
  }
};

// Función para obtener el próximo estado
const getNextState = (currentState) => {
  switch (currentState) {
    case 'reserver':
      return 'payed';
    case 'payed':
      return 'delivered';
    default:
      return null;
  }
};

function StepperAdmin({ state, oid, onStateChange }) {
  const [orderState, setOrderState] = useState(state);
  const [receiptFile, setReceiptFile] = useState(null);
  const activeStep = getActiveStepFromState(orderState);
  const progress = (activeStep / (steps.length - 1)) * 100;

  const handleEditState = async () => {
    const nextState = getNextState(orderState);
    if (nextState) {
      try {
        const response = await axios.put(`/api/orders/${oid}`, { state: nextState });
        if (response.status === 200) {
          setOrderState(nextState);
          onStateChange(nextState);
        } else {
          alert('Error al actualizar el estado');
        }
      } catch (error) {
        alert('Error al actualizar el estado');
      }
    } else if (orderState === 'delivered') {
      alert('La orden ya ha sido completada.');
    }
  };

  const handleFileChange = (e) => {
    setReceiptFile(e.target.files[0]);
  };

  const handleSubmitReceipt = async () => {
    if (receiptFile) {
      const formData = new FormData();
      formData.append('receipt', receiptFile);

      try {
        const response = await axios.post(`/api/orders/${oid}/uploadReceipt`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.status === 200) {
          alert('Comprobante enviado exitosamente');
        } else {
          alert('Error al enviar el comprobante');
        }
      } catch (error) {
        alert('Error al enviar el comprobante');
      }
    }
  };

  return (
    <Container fluid className="centering-container">
      <div className="main-container">
        <div className="status-bubble">
          <h3 className="status-bubble-text">{steps[activeStep].label}</h3>
        </div>

        <div className="progress-container">
          <LinearProgress
            variant="determinate"
            value={progress}
            className="custom-linear-progress"
          />
          <img src={MoneyImage} alt="Chanchito" className="moving-icon" style={{ left: `${progress}%` }} />
        </div>

        <div className="edit-state-container">
          <Button variant="primary" onClick={handleEditState}>
            Avanzar Estado
          </Button>
        </div>

        {/* Si la orden está completada, mostramos la opción de enviar comprobante */}
        {orderState === 'delivered' && (
          <div className="receipt-container">
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Subir Comprobante</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Button variant="success" onClick={handleSubmitReceipt}>
              Enviar Comprobante
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
}

export default StepperAdmin;
