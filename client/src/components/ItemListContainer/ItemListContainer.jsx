import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Card, Nav, Button, ButtonGroup } from 'react-bootstrap';
import './ItemListContainer.css';
import ItemList from '../ItemList/ItemList.jsx';
import axios from 'axios';

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchProducts = async () => {
    try {
      const url = '/api/product';
      const response = await axios.get(url);
      const data = response.data;
      setProducts(data);
      console.log(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  
  if (loading) {
    return <p className="text-center">Cargando...</p>;
  }

  if (error) {
    return <p className="text-center">Error: {error}</p>;
  }

  return (
    <section id="paises-monedas" class="paises-monedas-section ">
        <div class="capa">
        <h2 class="text-center p-5">tasa del dia</h2>
      <ItemList products={products} />
      </div>
    </section>
  );
};

export default ItemListContainer;