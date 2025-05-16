import React from 'react';
import './Recarga.css';

const Recarga = () => {
    return (
        <div className="recarga-section" id="servicios">
            <h3>Recarga y cambia al instante</h3>
            <div className="metodos-container">
                {/* Contenedor de los métodos alineados arriba */}
                <div className="metodos-wrapper">
                    <div className='metodos yellow'>
                        <h4>Recarga</h4>
                        <p>con cualquier moneda</p>
                        <div className='metodo-logo-cont'>
                            <img className='metodo-logo' src="./img/Wally.png" alt="" />
                            <h4>Wally</h4>
                        </div>
                        <div className='metodo-logo-cont'>
                            <img className='metodo-logo' src="./img/Zinli.png" alt="" />
                            <h4>Zinli</h4>
                        </div>
                    </div>
                    <div className='metodos blue'>
                        <h4>Vende</h4>
                        <p>con cualquier moneda</p>
                        <div className='metodo-logo-cont'>
                            <img className='metodo-logo' src="./img/Paypal.png" alt="" />
                            <h4>Paypal</h4>
                        </div>
                        <div className='metodo-logo-cont'>
                            <img className='metodo-logo' src="./img/Zelle.png" alt="" />
                            <h4>Zelle</h4>
                        </div>
                    </div>
                    <div className='metodos red'>
                        <h4>Cambia</h4>
                        <p>Entregamos efectivo</p>
                        <div className='metodo-logo-cont-b'>
                            <img className='metodo-logo' src="./img/binance.png" alt="" />
                            <h4>USDT</h4>
                        </div>
                    </div>
                </div>
                {/* Botón alineado en la parte inferior */}
                <div className="boton-container">
                    <button className="btn-seguridad">¡Quiero cambiar!</button>
                </div>
            </div>
        </div>
    )
}

export default Recarga;
