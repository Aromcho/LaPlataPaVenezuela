// StepperAdmin.jsx
import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import HandshakeIcon from '@mui/icons-material/Handshake';
import MoneyImage from '../../../assets/Icons/image.png'; // Importar el ícono desde la ruta indicada

// Estilos personalizados para el contenedor principal
const MainContainer = styled('div')({
  background: 'linear-gradient(135deg, #f0f0f0, #d0d0d0)', // Gradiente de grises
  borderRadius: '10px',
  padding: '40px', // Aumentar el padding para un mayor espacio
  width: '80%', // Aumentar el ancho del contenedor
  maxWidth: '800px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '300px', // Altura mínima del componente
});

// Contenedor general para centrar el componente en la página
const CenteringContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh', // Ocupar toda la altura de la pantalla
});

const ProgressContainer = styled('div')({
  position: 'relative',
  width: '100%',
  maxWidth: '600px',
  margin: '0 auto',
});

const CustomLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  backgroundColor: '#e0e0e0',
  '& .MuiLinearProgress-bar': {
    backgroundColor: '#1976d2',
  },
}));

const IconContainer = styled('div')(({ position, step }) => ({
  position: 'absolute',
  top: step === 1 ? -30 : -20,
  left: `${position}%`,
  transform: 'translateX(-50%)',
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
}));

const MovingIcon = styled('img')(({ progress }) => ({
  position: 'absolute',
  top: -25,
  left: `${progress}%`,
  transform: 'translateX(-50%)',
  width: 30,
  height: 30,
  transition: 'left 0.3s ease-in-out',
}));

const IconWrapper = styled('div')({
  border: '2px solid black',
  borderRadius: '50%',
  padding: '5px',
});

const StepText = styled('div')({
  fontSize: '1rem',
  fontWeight: 'bold',
  color: '#333',
  whiteSpace: 'nowrap', // Evita que el texto se divida en dos líneas
});

const StepsContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '2rem', // Mayor separación para evitar superposición
  width: '100%',
  maxWidth: '600px',
  position: 'relative',
});

// Estilo para el texto del estado del pedido
const StatusText = styled('h3')({
  marginBottom: '100px', // Espaciado de 15 píxeles debajo del texto
});

// Estilo para el contenedor de seguimiento
const TrackingInfoContainer = styled('div')({
  marginTop: '20px',
  padding: '15px',
  background: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  width: '100%',
});

const steps = [
  { label: '(1) Recibido', position: -6, icon: <AttachMoneyIcon /> },
  { label: '(2) En Proceso', position: 50, icon: <LocalAirportIcon /> },
  { label: '(3) Completado', position: 106, icon: <HandshakeIcon /> },
];

function StepperAdmin() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleFinish = () => {
    setActiveStep(0); // Reiniciar al primer paso al finalizar
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // Calcular el progreso como un porcentaje
  const progress = (activeStep / (steps.length - 1)) * 100;

  return (
    <CenteringContainer fluid>
      <MainContainer>
        {/* Mostrar el estado del pedido por encima de la barra de progreso */}
        <StatusText>{activeStep === 0 ? 'Pedido recibido' : steps[activeStep].label}</StatusText>
        
        <ProgressContainer>
          <CustomLinearProgress variant="determinate" value={progress} />
          <MovingIcon src={MoneyImage} alt="Moving Icon" progress={progress} />
          {steps.map((step, index) => (
            <IconContainer key={index} position={step.position} step={index}>
              <IconWrapper>
                {React.cloneElement(step.icon, {
                  style: { color: index <= activeStep ? '#1976d2' : '#e0e0e0' },
                })}
              </IconWrapper>
            </IconContainer>
          ))}
        </ProgressContainer>

        {/* Mostrar los textos de los pasos debajo de la barra de progreso */}
        <StepsContainer>
          {steps.map((step, index) => (
            <StepText key={index} style={{ left: `${step.position}%`, textAlign: 'center' }}>
              {step.label}
            </StepText>
          ))}
        </StepsContainer>

        <div className="text-center mt-4">
          {activeStep === steps.length ? (
            <div>
              <p>¡Proceso completado!</p>
              <Button variant="primary" onClick={handleFinish}>Finalizar</Button> {/* Reinicia y comienza de nuevo */}
            </div>
          ) : (
            <div>
              <Button
                variant="success"
                onClick={handleNext}
                className="mt-3"
                disabled={activeStep === steps.length}
              >
                Continuar
              </Button>
            </div>
          )}
        </div>

        {/* Información de seguimiento del envío de dinero */}
        <TrackingInfoContainer>
          <h4>Seguimiento de su envío de dinero</h4>
          <p>
            Su envío ha sido recibido y está siendo procesado. 
            Se estima que estará completado en un plazo de 1 a 3 días hábiles. 
            Puede verificar el estado de su envío aquí y comunicarse con nuestro servicio de atención al cliente para cualquier consulta adicional.
          </p>
        </TrackingInfoContainer>
      </MainContainer>
    </CenteringContainer>
  );
}

export default StepperAdmin;
