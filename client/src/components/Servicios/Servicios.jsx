import "./Servicios.css";

const Servicios = () => {
    return (
        <div className="servicios-section">
            <div className="servicios left">
                <h2>NUESTRO SERVICIO SE BASA EN:</h2>
                <div>
                    <div className="servicio-icon">
                        <img src="./img/servicio1.png" alt="" />
                        <p>La transparencia en cada operacion.</p>
                    </div>
                    <div className="servicio-icon">
                        <img src="./img/servicio2.png" alt="" />
                        <p>Tecnologia de encriptacion de ultima generacion para proteger tus transacciones.</p>
                    </div>
                    <div className="servicio-icon">
                        <img src="./img/servicio3.png" alt="" />
                        <p>Atencion personalizada y cercana, porque entendemos que detrás de cada envío hay un sueño y una historia familiar.</p>
                    </div>
                </div>
            </div>
            <div className="servicios right">
                <img className="face-img" src="./img/Arantxa.png" alt="" />
                <p>Soy Arantxa Valecillos y mi misión es brindarte tranquilidad y confianza en el envío y recepcion del apoyo que merece tu familia me comprometo a cuidar cada remesa como si fuera mía.</p>
            </div>    
        </div>
    );
}

export default Servicios;