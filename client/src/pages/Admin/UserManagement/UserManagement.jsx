// UserManagement.js
import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import axios from 'axios';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import './UserManagement.css'; // Archivo de estilos personalizado

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios('/api/user');
        setUsers(response.data.response);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        setError(error.toString());
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (isLoading) {
    // Mostrar Skeletons mientras se cargan los datos
    return (
      <div className="user-management-container">
        <h2 className="section-title">Gestión de Usuarios</h2>
        <Row>
          {[1, 2, 3].map((index) => (
            <Col key={index} md={4} className="mb-4">
              <Card className="custom-card">
                <Card.Body className="text-center">
                  <Skeleton variant="circular" width={80} height={80} style={{ margin: '0 auto 20px' }} />
                  <Skeleton variant="text" width="60%" height={30} />
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="rectangular" width="100%" height={40} style={{ marginTop: '20px' }} />
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }

  if (error) {
    return <div className="error-container">Error al cargar los usuarios: {error}</div>;
  }

  return (
    <div className="user-management-container">
      <h2 className="section-title">Gestión de Usuarios</h2>
      <Row>
        {users.map((user) => (
          <Col key={user._id || user.id} md={4} className="mb-4">
            <Card className="custom-card">
              <Card.Body className="text-center">
                <Avatar
                  alt={user.name}
                  src={user.avatar || "https://yt3.googleusercontent.com/vRF8BHREiJ3Y16AbMxEi_oEuoQlnNNqGpgULuZ6zrWSAi24HcxX3Vko42RN8ToctH-G0qlWd=s900-c-k-c0x00ffffff-no-rj"}
                  sx={{ width: 80, height: 80, margin: "0 auto 20px" }}
                />
                <Card.Title className="custom-card-title">{user.name}</Card.Title>
                <Card.Text className="custom-card-text">
                  <strong>ID:</strong> {user.id || user._id}
                  <br />
                  <strong>Email:</strong> {user.email}
                  <br />
                  <strong>Rol:</strong> {user.role}
                </Card.Text>
                <div className="d-flex justify-content-center">
                  <OverlayTrigger overlay={<Tooltip>Editar</Tooltip>}>
                    <Button variant="outline-primary" size="sm" className="mx-2">
                      <PencilSquare />
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger overlay={<Tooltip>Eliminar</Tooltip>}>
                    <Button variant="outline-danger" size="sm" className="mx-2">
                      <Trash />
                    </Button>
                  </OverlayTrigger>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default UserManagement;
