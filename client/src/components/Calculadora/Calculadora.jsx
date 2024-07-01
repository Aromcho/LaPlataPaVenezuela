import React, { useState, useEffect } from 'react';

const Calculadora = () => {
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('USD');
    const [result, setResult] = useState('');
    const [exchangeRates, setExchangeRates] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/product');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const rates = data.reduce((acc, product) => {
                    acc[product.moneda] = product.tasas.reduce((acc, tasa) => {
                        acc[tasa.monedaDestino] = tasa.tasa;
                        return acc;
                    }, {});
                    return acc;
                }, {});
                setExchangeRates(rates);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const calculate = () => {
        const exchangeRate = getExchangeRate(fromCurrency, toCurrency);
        const calculatedResult = amount * exchangeRate;
        setResult(calculatedResult.toFixed(2));
    };

    const getExchangeRate = (fromCurrency, toCurrency) => {
        if (exchangeRates[fromCurrency] && exchangeRates[fromCurrency][toCurrency]) {
            return exchangeRates[fromCurrency][toCurrency];
        }
        return 1; // Default to 1 if no exchange rate is found
    };

    return (
        <section id="calculadora" className="calculadora-section pt-5 pb-5">
            <div className="container w-50">
                <h2 className="section-title">Calculadora de Cambio</h2>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="amount">Cantidad a enviar:</label>
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
                            <label htmlFor="fromCurrency">Moneda de origen:</label>
                            <select
                                id="fromCurrency"
                                className="form-control"
                                value={fromCurrency}
                                onChange={(e) => setFromCurrency(e.target.value)}
                            >
                                <option value="USD">Dólar (USD)</option>
                                <option value="EUR">Euro (EUR)</option>
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
                            <label htmlFor="toCurrency">Moneda de destino:</label>
                            <select
                                id="toCurrency"
                                className="form-control"
                                value={toCurrency}
                                onChange={(e) => setToCurrency(e.target.value)}
                            >
                                <option value="USD">Dólar (USD)</option>
                                <option value="EUR">Euro (EUR)</option>
                                <option value="COP">Peso Colombiano (COP)</option>
                                <option value="ARS">Peso Argentino (ARS)</option>
                                <option value="BRL">Real Brasileño (BRL)</option>
                                <option value="CLP">Peso Chileno (CLP)</option>
                                <option value="PEN">Sol Peruano (PEN)</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="result">Cantidad a recibir:</label>
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
                    <button className="btn btn-primary" onClick={calculate}>Calcular</button>
                </div>
            </div>
        </section>
    );
};

export default Calculadora;
