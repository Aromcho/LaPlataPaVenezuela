import React from "react";
import Item from "../Item/Item.jsx";
import { Button } from "react-bootstrap";
import "./ItemList.css";

const ItemList = ({ products }) => {

  const handleWhatsAppClick = () => {
    const phoneNumber = '584247249758'; // ← reemplázalo con tu número en formato internacional sin "+" (ejemplo para Argentina)
    const message = encodeURIComponent('Hola, quiero enviar dinero. ¿Pueden ayudarme con más información?');

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container">
      <div className="item-list-grid">
        {products.map((product) => (
          <Item key={product._id} product={product} />
        ))}
      </div>
      <div className="buttoms-cont">
        <Button className="btn-enviar" variant="danger" onClick={handleWhatsAppClick}>
          ¡Enviar dinero!
        </Button>
        <Button className="btn-calcular" variant="light" onClick={scrollToTop}>
          Calcular mi envío
        </Button>
      </div>
    </div>
  );
};

export default ItemList;
