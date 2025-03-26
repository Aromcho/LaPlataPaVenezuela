import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { email, password, name };

    try {
      const response = await axios.post("/api/sessions/register", user);
      if (response.status === 200 || response.status === 201) {
        Swal.fire("¡Registrado!", "Has creado tu cuenta con éxito.", "success").then(() => {
          window.location.replace("/user/login");
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Swal.fire("¡Error!", "El email ya está en uso.", "error");
      } else {
        Swal.fire("¡Error!", "Algo salió mal. Intenta de nuevo.", "error");
      }
    }
  };

  return (
    <div className="register-wrapper">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={5}>
            <Card className="register-card">
              <Card.Body>
                <h2 className="text-center mb-3">Crear cuenta</h2>
                <p className="text-center text-muted mb-4">Empieza en segundos 👇</p>

                <Button
                  variant="light"
                  className="w-100 custom-btn-google mb-4"
                  onClick={() => (window.location.href = "/api/sessions/google")}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                    alt="Google"
                    width="20"
                    className="me-2"
                  />
                  Registrarse con Google
                </Button>

                <div className="separator">
                  <hr />
                  <span>o</span>
                  <hr />
                </div>

                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formName" className="mb-3">
                    <Form.Label>Nombre y Apellido</Form.Label>
                    <Form.Control
                                        className="custom-input"

                      type="text"
                      placeholder="Tu nombre completo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                                        className="custom-input"

                      type="email"
                      placeholder="ejemplo@mail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formPassword" className="mb-4">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                                        className="custom-input"

                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button type="submit" className="w-100 custom-btn-primary">
                    Registrarme
                  </Button>
                </Form>

                <div className="text-center mt-4">
                  <small>
                    ¿Ya tienes cuenta?{" "}
                    <Link to="/user/login" className="custom-link">
                      Inicia sesión
                    </Link>
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
