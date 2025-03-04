import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import './FAQ.css';

const preguntasRespuestas = [
    {
        pregunta: "¿Cuál es el horario de atención?",
        respuesta: "Nuestro horario de atención es de lunes a sábado, de 9:00 a.m. a 9:00 p.m."
    },
    
    {
        pregunta: "¿Por qué debería confiar un su servicio?",
        respuesta: "Puedes contactarnos a través de nuestro formulario en la web, vía correo electrónico o por nuestro chat en vivo."
    },
    {
        pregunta: "¿Cuáles son los métodos de pago?",
        respuesta: (
            <>
                <p>1 Calcula el monto que deseas enviar a través de nuestra página web, selecciona la moneda que envías y la que recibes.</p>
                <p>2 Escríbenos al WhatsApp y proporciónanos tu nombre y apellido junto con un documento de identidad válido, y recibe asesoramiento sobre lo que necesitas.</p>
                <p>3 Completa la información del destinatario de forma escrita (nombre completo y datos de la cuenta bancaria, sin puntos, ni comas, ni espacios).</p>
                <p>4 Revisa y confirma todos los detalles antes de finalizar.</p>
                <p>5 <strong>¡Listo!</strong> Tu remesa se procesará de inmediato y podrás hacerle seguimiento en tiempo real desde la web.</p>
            </>
        )
    },
    {
        pregunta: "¿Necesito algún documento para el envío?",
        respuesta: "Sí, ofrecemos una garantía de devolución de 30 días si no estás satisfecho con el servicio."
    },
    {
        pregunta: "¿Cuáñ es el monto minimo que puedo enviar?",
        respuesta: "Sí, puedes modificar tu pedido antes de que sea procesado. Una vez en proceso, necesitarás contactar con soporte."
    },
    {
        pregunta: "¿Por donde puedo contactar si tengo dudas?",
        respuesta: "Sí, ofrecemos descuentos en compras al por mayor. Contáctanos para obtener más información sobre precios especiales."
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
