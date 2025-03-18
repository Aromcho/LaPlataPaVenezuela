import { Link } from "react-router-dom";
import "./SeguridadSeccion.css";

const SeguridadSeccion = () => {
  return (
    <div id="seguridad" className="seguridad-section">
      <img className="seguridad-icon" src="./img/seguridad-icon.png" alt="" />
      <h2 className="seguridad-titulo">
        CON NOSOTROS, TU DINERO LLEGA SEGURO DONDE QUIÉRA QUE LO NECESITES
      </h2>
      <Link to="/envios">
        <button className="btn-seguridad">¡Enviar dinero ahora!</button>
      </Link>
    </div>
  );
};

export default SeguridadSeccion;
