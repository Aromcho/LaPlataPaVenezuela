import React, { useState, useEffect } from 'react';
import { Calculator, Send } from 'react-bootstrap-icons'; // Importar iconos
import "./Calculadora.css";

const Calculadora = () => {
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('Bs');
    const [toCurrency, setToCurrency] = useState('USD');
    const [result, setResult] = useState('');
    const [exchangeRates, setExchangeRates] = useState({});
    const [currencies, setCurrencies] = useState([]); // Lista de monedas con imágenes

    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                const response = await fetch('/api/product');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                // Estructurar datos para fácil acceso
                const rates = data.reduce((acc, product) => {
                    acc[product.moneda] = {
                        tasas: product.tasas.reduce((innerAcc, tasa) => {
                            innerAcc[tasa.monedaDestino] = tasa.tasa;
                            return innerAcc;
                        }, {}),
                        imagen: product.imagen // Guardamos la imagen
                    };
                    return acc;
                }, {});

                setExchangeRates(rates);
                setCurrencies(data); // Guardamos todas las monedas
            } catch (error) {
                console.error("Error fetching exchange rates:", error);
            }
        };

        fetchExchangeRates();
    }, []);

    const calculate = () => {
        const exchangeRate = getExchangeRate(fromCurrency, toCurrency);
        if (amount && exchangeRate) {
            const calculatedResult = amount * exchangeRate;
            setResult(calculatedResult.toFixed(2));
        } else {
            setResult('0.00');
        }
    };

    const getExchangeRate = (fromCurrency, toCurrency) => {
        return exchangeRates[fromCurrency]?.tasas[toCurrency] || 1;
    };

    return (
        <div className="container w-75">
            <h2 className="section-title text-center text-black">Calculadora de Cambio</h2>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label className='tu-envias' htmlFor="amount">Tu envias</label>
                        <input
                            type="number"
                            id="amount"
                            className="form-control"
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
                            className="form-control"
                            readOnly
                            value={result}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label className='text-black' htmlFor="toCurrency">Moneda de destino:</label>
                        <div className="select-container">
                            <img src={exchangeRates[toCurrency]?.imagen} alt={toCurrency} className="flag-icon" />
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
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label className='text-black' htmlFor="fromCurrency">Moneda de origen:</label>
                        <div className="select-container">
                            <img src={exchangeRates[fromCurrency]?.imagen} alt={fromCurrency} className="flag-icon" />
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
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <button className="btn btn-primary" onClick={calculate}>
                    <Calculator style={{ marginRight: '8px' }} /> Calcular
                </button>
                <button className="btn btn-primary m-2">
                    <Send style={{ marginRight: '8px' }} /> Envía
                </button>
            </div>
        </div>
    );
};

export default Calculadora;
