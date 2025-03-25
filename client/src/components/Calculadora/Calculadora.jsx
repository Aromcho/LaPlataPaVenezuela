import React, { useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa'
import "./Calculadora.css";

// Función para formatear: 1234.56 => "1.234,56"
const formatNumber = (num) => {
    if (isNaN(num)) return "0,00";         // Si no es un número, devolvemos "0,00"
    
    // Redondeamos a 2 decimales
    let [integerPart, decimalPart] = num.toFixed(2).split(".");

    // Agregamos punto para separar miles (cada 3 dígitos)
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // Unimos la parte entera con la parte decimal usando coma
    return integerPart + "," + decimalPart;
};

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
                const rates = data.reduce((acc, product) => {
                    acc[product.moneda] = {
                        tasas: product.tasas.reduce((innerAcc, tasa) => {
                            innerAcc[tasa.monedaDestino] = {
                                value: tasa.tasa,
                                operacion: (tasa.operacion ?? 'x')
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
        let exchangeObj = exchangeRates[fromCurrency]?.tasas[toCurrency];
        let invertida = false;
    
        // Si no existe la conversión directa, buscamos la inversa
        if (!exchangeObj) {
            const reverseObj = exchangeRates[toCurrency]?.tasas[fromCurrency];
            if (reverseObj) {
                exchangeObj = reverseObj;
                invertida = true;
            }
        }
    
        if (amount && exchangeObj) {
            let { value, operacion } = exchangeObj;
    
            // Si estamos usando la tasa inversa, invertimos la operación
            if (invertida) {
                operacion = operacion === 'x' ? '/' : 'x';
            }
    
            let calculatedResult = 0;
    
            if (operacion === 'x') {
                calculatedResult = parseFloat(amount) * parseFloat(value);
            } else if (operacion === '/') {
                if (parseFloat(value) !== 0) {
                    calculatedResult = parseFloat(amount) / parseFloat(value);
                } else {
                    calculatedResult = 0;
                }
            } else {
                calculatedResult = parseFloat(amount);
            }
    
            // Formateamos el resultado antes de guardarlo
            setResult(formatNumber(calculatedResult));
        } else {
            setResult('0,00');
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
