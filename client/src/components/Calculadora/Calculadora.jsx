import React, { useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa'
import "./Calculadora.css";

const Calculadora = () => {
    const [amount, setAmount] = useState('100');
    const [fromCurrency, setFromCurrency] = useState('Bs');
    const [toCurrency, setToCurrency] = useState('USD');
    const [result, setResult] = useState('0.00');
    const [exchangeRates, setExchangeRates] = useState({});
    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                const response = await fetch('/api/product');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                // Construimos un objeto con todas las monedas
                // Cada clave será product.moneda (ej. "USD", "PEN", etc.)
                // Y dentro, guardamos un objeto "tasas" donde cada clave 
                // es la monedaDestino y cada valor es { value, operacion }
                // También guardamos la propiedad "imagen" para mostrar la bandera.
                const rates = data.reduce((acc, product) => {
                    acc[product.moneda] = {
                        tasas: product.tasas.reduce((innerAcc, tasa) => {
                            innerAcc[tasa.monedaDestino] = {
                                value: tasa.tasa,
                                operacion: (tasa.operacion ?? 'x') // fallback a 'x' si no viene
                            };
                            return innerAcc;
                        }, {}),
                        imagen: product.imagen
                    };
                    return acc;
                }, {});

                setExchangeRates(rates);
                setCurrencies(data);
            } catch (error) {
                console.error("Error fetching exchange rates:", error);
            }
        };

        fetchExchangeRates();
    }, []);

    // Calcula automáticamente cuando cambien dependencias
    useEffect(() => {
        // Obtenemos el objeto que guarda { value, operacion } para la tasa
        const exchangeObj = exchangeRates[fromCurrency]?.tasas[toCurrency];

        if (amount && exchangeObj) {
            const { value, operacion } = exchangeObj;
            let calculatedResult = 0;

            // Si la operacion es "x", multiplicamos
            if (operacion === 'x') {
                calculatedResult = parseFloat(amount) * parseFloat(value);
            }
            // Si la operacion es "/", dividimos
            else if (operacion === '/') {
                // Evitar dividir por cero si la tasa fuera 0
                if (parseFloat(value) !== 0) {
                    calculatedResult = parseFloat(amount) / parseFloat(value);
                } else {
                    calculatedResult = 0;
                }
            }
            // Valor por defecto si no hay operacion reconocida
            else {
                calculatedResult = parseFloat(amount); 
            }

            setResult(calculatedResult.toFixed(2));
        } else {
            setResult('0.00');
        }
    }, [amount, fromCurrency, toCurrency, exchangeRates]);

    return (
        <div className="container">
            <h2 className="section-title-calculator">Calcula tu envio</h2>
            <div className="columna-envio">
                <div className="col-md-6 name-coin">
                    <div className="form-group">
                        <label className='tu-envias' htmlFor="amount">Tu envías</label>
                        <input
                            type="number"
                            id="amount"
                            className="form-control amount-input"
                            placeholder="Ingrese la cantidad"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className='tu-envias' htmlFor="result">Ellos reciben</label>
                        <input
                            type="text"
                            id="result"
                            className="form-control amount-input"
                            readOnly
                            value={result}
                        />
                    </div>
                </div>
                <div className="col-md-6 name-coin">
                    <div className="form-group name-coin-group">
                        <div className="select-container">
                            {/* Moneda de destino */}
                            <img 
                                src={exchangeRates[toCurrency]?.imagen} 
                                alt={toCurrency} 
                                className="flag-icon" 
                            />
                            <select
                                id="toCurrency"
                                className="form-control currency-select"
                                value={toCurrency}
                                onChange={(e) => setToCurrency(e.target.value)}
                            >
                                {currencies.map((currency) => (
                                    <option key={currency.moneda} value={currency.moneda}>
                                        {currency.nombre}
                                    </option>
                                ))}
                            </select>
                            <FaChevronDown className="select-icon" />
                        </div>
                    </div>

                    <div className="form-group name-coin-group">
                        <div className="select-container">
                            {/* Moneda de origen */}
                            <img 
                                src={exchangeRates[fromCurrency]?.imagen} 
                                alt={fromCurrency} 
                                className="flag-icon" 
                            />
                            <select
                                id="fromCurrency"
                                className="form-control currency-select"
                                value={fromCurrency}
                                onChange={(e) => setFromCurrency(e.target.value)}
                            >
                                {currencies.map((currency) => (
                                    <option key={currency.moneda} value={currency.moneda}>
                                        {currency.nombre}
                                    </option>
                                ))}
                            </select>
                            <FaChevronDown className="select-icon" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calculadora;
