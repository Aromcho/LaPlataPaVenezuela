import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import './FAQ.css';

const preguntasRespuestas = [
    {
        pregunta: "¿Eres cliente por primera vez y aún tienes dudas o no te sientes completamente seguro?",
        respuesta: "¡Queremos que te sientas tranquilo! Agendamos una videollamada personalizada con Arantxa Valecillos, CEO de La Plata Pa Venezuela, para resolver todas tus preguntas y brindarte la confianza que necesitas.Nuestro equipo está siempre disponible para ofrecerte la mejor atención. ¡No dudes en escribirnos!"
    },
    {
        pregunta: "¿Cuál es el horario de atención?",
        respuesta: "Nuestro horario de atención es de Lunes a Viernes, de 9:00 a.m. a 8:00 p.m. y Sábados de 10:00 a.m. a 5:00 p.m. (Hora Venezuela)"
    },
    
    {
        pregunta: "¿Por qué confiar en los servicios de La Plata Pa Venezuela?",
        respuesta: (
            <>
                <p>En La Plata Pa Venezuela, nos enfocamos en ofrecer un servicio seguro, rápido y transparente. Con años de experiencia en el mercado, garantizamos:</p>
                <p>● Seguridad: Protegemos tus datos y transacciones con procesos confiables y verificados. </p>
                <p>● Rapidez: Tus remesas se procesan de inmediato y puedes hacerles seguimiento en tiempo real.</p>
                <p>● Transparencia: Sin cargos ocultos y con tasas competitivas. </p>
                <p>● Atención personalizada: Nuestro equipo está siempre disponible para resolver tus dudas y brindarte el mejor servicio. </p>
                <p>Somos la opción confiable para miles de personas que envían dinero a Venezuela. ¡Tu tranquilidad es nuestra prioridad!</p>
            </>
        )
    },
    {
        pregunta: "¿Cuáles son los pasos para enviar dinero?",
        respuesta: (
            <>
                <p>1. Calcula tu envío: Ingresa el monto que deseas enviar en nuestra página web, selecciona la moneda de origen y la moneda de destino.</p>
                <p>2. Contáctanos por WhatsApp: Escríbenos y proporciona tu nombre completo, un documento de identidad válido y espera a que te confirmemos la cuenta bancaria a la que debes realizar la transferencia. </p>
                <p>3. Completa los datos del destinatario: Una vez confirmada la cuenta, ingresa la información del beneficiario de manera clara y sin caracteres especiales (nombre completo y datos de la cuenta bancaria, sin puntos, comas ni espacios). No olvides adjuntar el comprobante de pago. </p>
                <p>4. Revisa y confirma: Verifica todos los detalles de la transacción antes de finalizar para asegurarte de que todo esté correcto. </p>
                <p>5. <strong>¡Listo!</strong> Tu remesa se procesará de inmediato y podrás hacerle seguimiento en tiempo real desde nuestra plataforma. </p>
            </>
        )
    },
    {
        pregunta: "¿Por donde puedo contactar si tengo dudas?",
        respuesta: (
            <>
                <p>¿Tienes dudas o necesitas ayuda?</p>
                <p>¡Estamos aquí para ayudarte! Puedes contactarnos a través de:</p>
                <p>● WhatsApp: [Número de WhatsApp]</p>
                <p>● Instagram: [Usuario de Instagram] </p>
                <p>● Correo electrónico: [Dirección de correo electrónico]</p>
                <p>Nuestro equipo estará encantado de resolver tus preguntas y brindarte la atención que necesitas. ¡No dudes en escribirnos!</p>
            </>
        )
    },
    {
        pregunta: "¿Cuál es el monto mínimo que puedo enviar?",
        respuesta: "En La Plata pa´Venezuela, entendemos que todo dinero es valioso. Puedes enviar cualquier monto, desde $1 hasta el que necesites. ¡Estamos aquí para facilitarte el proceso, sin importar el tamaño de tu remesa!"
    }
];

const FAQ = () => {
    const [open, setOpen] = useState(Array(preguntasRespuestas.length).fill(false));

    const togglePregunta = (index) => {
        setOpen(open.map((estado, i) => (i === index ? !estado : estado)));
    };

    return (
        <div className="faq-cont">
            {preguntasRespuestas.map((item, index) => (
                <div key={index} className="preguntas">
                    <Button
                        onClick={() => togglePregunta(index)}
                        aria-controls={`collapse-text-${index}`}
                        aria-expanded={open[index]}
                    >
                        {item.pregunta}
                        {open[index] ? <CiCircleMinus /> : <CiCirclePlus />}
                    </Button>
                    <Collapse in={open[index]}>
                        <div id={`collapse-text-${index}`} className="faq-text">
                            {item.respuesta}
                        </div>
                    </Collapse>
                </div>
            ))}
        </div>
    );
}

export default FAQ;
