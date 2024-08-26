import React from 'react';
import { Button, Tooltip, OverlayTrigger, Card, Col, Row } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import './ProductList.css'; // Ruta correcta al archivo CSS

const ProductList = ({ productos, onEdit, onDelete }) => {
  return (
    <div className="container-fluid">
      <Row className="pt-3 mx-0">
        {productos.map((product) => (
          <Col xs={12} md={6} lg={4} key={product._id} className="mb-4">
            <Card>
              <Card.Body>
                <div className="d-flex flex-column align-items-center">
                  <img
                    src={product.imagen}
                    alt={product.nombre}
                    className="img-thumbnail mb-2"
                  />
                  <Card.Title>{product.nombre}</Card.Title>
                  <Card.Text>
                    <strong>Moneda:</strong> {product.moneda}<br />
                    <strong>Tasas:</strong>
                    <ul>
                      {product.tasas.map((tasa, index) => (
                        <li key={index}>
                          {tasa.monedaDestino}: {tasa.tasa}
                        </li>
                      ))}
                    </ul>
                  </Card.Text>
                  <div className="d-flex justify-content-center">
                    <OverlayTrigger overlay={<Tooltip>Editar</Tooltip>}>
                      <Button variant="outline-primary" size="sm" onClick={() => onEdit(product)}>
                        <PencilSquare />
                      </Button>
                    </OverlayTrigger>
                    <OverlayTrigger overlay={<Tooltip>Eliminar</Tooltip>}>
                      <Button variant="outline-danger" size="sm" onClick={() => onDelete(product)}>
                        <Trash />
                      </Button>
                    </OverlayTrigger>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;

