import React, { useEffect, useContext } from "react";
import { Nav, Container, ButtonGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Item from "../Item/Item.jsx";

const ItemList = ({
  products,
  category,
  page,  
}) => {
  useEffect(() => {}, [category, page]);


    
  return (
    <div className="container">
              <div className="card-paises row">
              {products.map((product) => (
                <Item key={product._id} product={product} />
              ))}
              </div>
            </div>
  );
};

export default ItemList;
