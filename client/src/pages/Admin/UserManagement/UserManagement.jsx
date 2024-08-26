import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Row, Col, Card, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import axios from 'axios';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import './UserManagement.css'; // Asegúrate de tener el archivo CSS

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '' });

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

  const handleAddUser = async () => {
    try {
      const response = await axios.post('/api/user', newUser);
      setUsers([...users, response.data]);
      setShowAddModal(false);
      setNewUser({ name: '', email: '', role: '' });
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
    }
  };

  const handleEditUser = async () => {
    try {
      const response = await axios.put(`/api/user/${selectedUser._id}`, selectedUser);
      setUsers(users.map(user => (user._id === selectedUser._id ? response.data : user)));
      setShowEditModal(false);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

  const handleDeleteUser = async () => {
    if (selectedUser) {
      try {
        await axios.delete(`/api/user/${selectedUser._id}`);
        setUsers(users.filter(user => user._id !== selectedUser._id));
        setShowDeleteConfirm(false);
        setSelectedUser(null);
      } catch (error) {
        console.error('Error al eliminar el usuario:', error);
      }
    }
  };

  if (isLoading) return <div>Cargando usuarios...</div>;
  if (error) return <div>Error al cargar los usuarios: {error}</div>;

  return (
    <>
      <Button variant="primary" onClick={() => setShowAddModal(true)}>
        Agregar Usuario
      </Button>

      <Row className="pt-3 mx-0">
        {users.map(user => (
          <Col xs={12} md={6} lg={4} key={user._id} className="mb-4">
            <Card className="user-card">
              <Card.Body>
                <Image
                  src="https://yt3.googleusercontent.com/vRF8BHREiJ3Y16AbMxEi_oEuoQlnNNqGpgULuZ6zrWSAi24HcxX3Vko42RN8ToctH-G0qlWd=s900-c-k-c0x00ffffff-no-rj"
                  roundedCircle
                  style={{ width: '50px', height: '50px' }}
                />
                <Card.Title>{user.name}</Card.Title>
                <Card.Text>
                  <strong>Email:</strong> {user.email}<br />
                  <strong>Rol:</strong> {user.role}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <OverlayTrigger overlay={<Tooltip>Editar</Tooltip>}>
                    <Button variant="outline-primary" size="sm" onClick={() => { setSelectedUser(user); setShowEditModal(true); }}>
                      <PencilSquare />
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger overlay={<Tooltip>Eliminar</Tooltip>}>
                    <Button variant="outline-danger" size="sm" onClick={() => { setSelectedUser(user); setShowDeleteConfirm(true); }}>
                      <Trash />
                    </Button>
                  </OverlayTrigger>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal para Agregar Usuario */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Agregar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Rol</Form.Label>
              <Form.Control
                type="text"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                required
              />
            </Form.Group>
            <Button variant="primary" onClick={handleAddUser}>
              Agregar Usuario
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal para Editar Usuario */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={selectedUser?.name || ''}
                onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={selectedUser?.email || ''}
                onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Rol</Form.Label>
              <Form.Control
                type="text"
                value={selectedUser?.role || ''}
                onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                required
              />
            </Form.Group>
            <Button variant="primary" onClick={handleEditUser}>
              Guardar Cambios
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal de Confirmación de Eliminación */}
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar este perfil?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteUser}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserManagement;
