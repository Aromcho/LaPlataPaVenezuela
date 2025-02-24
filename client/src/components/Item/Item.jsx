import React from "react";
import { Card } from "react-bootstrap";
import Skeleton from "@mui/material/Skeleton";
import "./Item.css";

const Item = ({ product }) => {
  return (
    <div className="item-cont my-3">
      <div className="item-card">
        <div className="item-img-cont">
          <img className="item-img" src={product.imagen} alt={product.nombre} />
          <Card.Body className="item-info">
            <Card.Title>
              {product.nombre} ({product.moneda})
            </Card.Title>
            {product.tasas.length > 0 && (
              <p key={product.tasas[0]._id} className="item-card-text">
                1 {product.tasas[0].monedaDestino} = {product.tasas[0].tasa}
              </p>
            )}
          </Card.Body>
        </div>
        <div className="metodo-pago">
          <h5>Método de pago</h5>
          <p>Transferencia o depósito bancario desde tu banco</p>
          <div className="d-flex">
            <Skeleton variant="rectangular" width={50} height={50} />
            <Skeleton variant="rectangular" width={50} height={50} />
            <Skeleton variant="rectangular" width={50} height={50} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
