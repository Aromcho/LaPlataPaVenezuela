import React from "react";
import { Card } from "react-bootstrap";
import "./Item.css";

const Item = ({ product }) => {
  return (
    <div className="col-md-2">
      <Card className="mb-3">
        <Card.Img variant="top" src={product.imagen} alt={product.nombre} />
        <Card.Body className="text-center">
          <Card.Title>{product.nombre} ({product.moneda})</Card.Title>
          {product.tasas.length > 0 && (
            <p key={product.tasas[0]._id} className="card-text">
              1 {product.tasas[0].monedaDestino} =
               {product.tasas[0].tasa}
            </p>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Item;