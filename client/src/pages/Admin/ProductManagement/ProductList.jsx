import React from 'react';
import { Button, Tooltip, OverlayTrigger, Card, Col, Row } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import './ProductList.css'; // Asegúrate de que esta ruta es correcta

const ProductList = ({ productos, onEdit, onDelete }) => {
  return (
    <Row className="pt-3">
      {productos.map((product) => (
        <Col xs={12} sm={6} md={4} lg={3} key={product._id} className="mb-4">
          {/* Versión para pantallas grandes */}
          <Card className="d-none d-md-flex flex-row align-items-center">
            <div className='d-flex flex-column'>
              <img
                src={product.imagen}
                alt={product.nombre}
                className='img-thumbnail mb-2 img-card-admin'
              />
            </div>
            <Card.Body className="d-flex flex-column justify-content-between">
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
              <div className="d-flex justify-content-between">
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
            </Card.Body>
          </Card>

          {/* Versión para pantallas pequeñas */}
          <Card className="d-md-none">
            <OverlayTrigger
              overlay={<Tooltip>ID: {product._id}</Tooltip>}
              placement="top"
            >
              <div className="d-flex justify-content-center align-items-center">
                <img
                  src={product.imagen}
                  alt={product.nombre}
                  className='img-fluid mb-2 img-card-admin'
                />
              </div>
            </OverlayTrigger>
            <Card.Body className="text-center">
              <Card.Title className="mb-2">{product.nombre}</Card.Title>
              <Card.Text className="mb-3">
                <strong>Moneda:</strong> {product.moneda}<br />
                <strong>Tasas:</strong>
                <ul className="list-unstyled">
                  {product.tasas.map((tasa, index) => (
                    <li key={index}>
                      {tasa.monedaDestino}: {tasa.tasa}
                    </li>
                  ))}
                </ul>
              </Card.Text>
              <div className="d-flex justify-content-center">
                <OverlayTrigger overlay={<Tooltip>Editar</Tooltip>}>
                  <Button variant="outline-primary" size="sm" className="mx-1" onClick={() => onEdit(product)}>
                    <PencilSquare />
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger overlay={<Tooltip>Eliminar</Tooltip>}>
                  <Button variant="outline-danger" size="sm" className="mx-1" onClick={() => onDelete(product)}>
                    <Trash />
                  </Button>
                </OverlayTrigger>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
