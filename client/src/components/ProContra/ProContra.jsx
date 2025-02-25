import React from "react";
import { FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import "./ProContra.css";

const ProContra = () => {
  return (
    <div className="pro-contra">
      {/* Sección de lo que siente el usuario */}
      <div className="pro">
        <h3>LO QUE SIENTES</h3>
        <div className="pro-list">
          <ul>
            <div className="list-item">
              <span className="icon-circle red"><FaTimesCircle className="icon" /></span>
              <li>Te abruma elegir entre tantos servicios de remesa online.</li>
            </div>
            <div className="list-item">
            <span className="icon-circle red"><FaTimesCircle className="icon" /></span>              
            <li>Miedo de que el fruto de tu esfuerzo se pierda o llegue tarde a tu familia.</li>
            </div>
            <div className="list-item">
            <span className="icon-circle red"><FaTimesCircle className="icon" /></span>              
            <li>Imposición de montos mínimos que no se ajustan a lo que realmente necesitas enviar.</li>
            </div>
            <div className="list-item">
            <span className="icon-circle red"><FaTimesCircle className="icon" /></span>              
            <li>Preocupación del tiempo de entrega y no poder hacerle seguimiento.</li>
            </div>
            <div className="list-item">
            <span className="icon-circle red"><FaTimesCircle className="icon" /></span>              
            <li>Inseguridad de no contar con un soporte que resuelva todas tus dudas directamente.</li>
            </div>
          </ul>
        </div>
      </div>

      {/* Sección de lo que ofrece el servicio */}
      <div className="contra">
        <h3>LO QUE TE OFRECEMOS</h3>
        <div className="contra-list">
          <ul>
            <div className="list-item">
            <span className="icon-circle blue"><FaCheckCircle className="icon" /></span>
              <li>Un servicio de +7 años de experiencia en el campo de las remesas. En nuestras redes sociales puedes ver los testimonios de nuestros clientes.</li>
            </div>
            <div className="list-item">
            <span className="icon-circle blue"><FaCheckCircle className="icon" /></span>
              <li>Tranquilidad de que tu dinero llegue a tiempo y seguro. Así tu familia recibe el apoyo sin problemas.</li>
            </div>
            <div className="list-item">
            <span className="icon-circle blue"><FaCheckCircle className="icon" /></span>
              <li>Tarifas justas y sin restricciones en el monto que envíes.</li>
            </div>
            <div className="list-item">
            <span className="icon-circle blue"><FaCheckCircle className="icon" /></span>
              <li>Atención cercana y personalizada, con seguimiento en tiempo real.</li>
            </div>
            <div className="list-item">
            <span className="icon-circle blue"><FaCheckCircle className="icon" /></span>
              <li>En tu primer envío agendamos una videollamada para resolver tus dudas y que te sientas en confianza.</li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProContra;
