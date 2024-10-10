import React, { useState, useEffect } from 'react';
import { Calculator, Send } from 'react-bootstrap-icons'; // Importar los iconos de react-bootstrap-icons
import "./Calculadora.css";

const Calculadora = () => {
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('USD');
    const [result, setResult] = useState('');
    const [exchangeRates, setExchangeRates] = useState({});

    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                const response = await fetch('/api/product');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const rates = data.reduce((acc, product) => {
                    acc[product.moneda] = product.tasas.reduce((innerAcc, tasa) => {
                        innerAcc[tasa.monedaDestino] = tasa.tasa;
                        return innerAcc;
                    }, {});
                    return acc;
                }, {});
                setExchangeRates(rates);
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
        return exchangeRates[fromCurrency]?.[toCurrency] || 1;
    };

    return (
        <div className="container w-75">
            <h2 className="section-title text-center text-white">Calculadora de Cambio</h2>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group ">
                        <label className='text-white' htmlFor="amount">Cantidad a enviar:</label>
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
                        <label className='text-white' htmlFor="fromCurrency">Moneda de origen:</label>
                        <select
                            id="fromCurrency"
                            className="form-control"
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value)}
                        >
                            <option value="USD">Dólar (USD)</option>
                            <option value="EUR">Euro (EUR)</option>
                            <option value="Bs">Bolivares (Bs)</option>
                            <option value="COP">Peso Colombiano (COP)</option>
                            <option value="ARS">Peso Argentino (ARS)</option>
                            <option value="BRL">Real Brasileño (BRL)</option>
                            <option value="CLP">Peso Chileno (CLP)</option>
                            <option value="PEN">Sol Peruano (PEN)</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label className='text-white' htmlFor="toCurrency">Moneda de destino:</label>
                        <select
                            id="toCurrency"
                            className="form-control"
                            value={toCurrency}
                            onChange={(e) => setToCurrency(e.target.value)}
                        >
                            <option value="USD">Dólar (USD)</option>
                            <option value="EUR">Euro (EUR)</option>
                            <option value="Bs">Bolivares (Bs)</option>
                            <option value="COP">Peso Colombiano (COP)</option>
                            <option value="ARS">Peso Argentino (ARS)</option>
                            <option value="BRL">Real Brasileño (BRL)</option>
                            <option value="CLP">Peso Chileno (CLP)</option>
                            <option value="PEN">Sol Peruano (PEN)</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className='text-white' htmlFor="result">Cantidad a recibir:</label>
                        <input
                            type="text"
                            id="result"
                            className="form-control"
                            readOnly
                            value={result}
                        />
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
