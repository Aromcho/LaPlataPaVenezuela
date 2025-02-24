import React from "react";
import Item from "../Item/Item.jsx";
import { Button } from "react-bootstrap";
import "./ItemList.css";

const ItemList = ({ products }) => {
  return (
    <div className="container ">
      <div className="item-list-grid">
        {products.map((product) => (
          <Item key={product._id} product={product} />
        ))}
      </div>
      <div className="buttoms-cont">
        <Button className="btn-enviar" variant="danger"> ¡Enviar dinero! </Button>
        <Button className="btn-calcular" variant="light"> Calcular mi envío </Button>
      </div>
      
    </div>
  );
};

export default ItemList;
