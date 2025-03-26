import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/api/sessions/login", { email, password });
      const statusResponse = await axios.get("/api/sessions/online");

      if (statusResponse.data.role === "admin") {
        window.location.replace("/admin");
      } else {
        window.location.replace("/");
      }
    } catch (error) {
      const msg =
        error.response && error.response.status === 401
          ? "Usuario o contraseña incorrectos."
          : "Ha ocurrido un error al intentar iniciar sesión.";
      Swal.fire({ icon: "error", title: "Oops...", text: msg });
    }
  };

  return (
    <div className="login-wrapper">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={5}>
            <Card className="login-card">
              <Card.Body>
                <h2 className="text-center mb-3">Iniciar sesión</h2>
                <p className="text-center text-muted mb-4">Bienvenido de nuevo 👋</p>
                <Form onSubmit={handleSubmit}>
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
                    Iniciar sesión
                  </Button>

                  <Button
                    variant="light"
                    className="w-100 mt-3 custom-btn-google"
                    onClick={() => (window.location.href = "/api/sessions/google")}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                      alt="Google"
                      width="20"
                      className="me-2"
                    />
                    Iniciar sesión con Google
                  </Button>
                </Form>

                <div className="text-center mt-4">
                  <small>
                    ¿No tienes cuenta?{" "}
                    <Link to="/user/register" className="custom-link">
                      Regístrate
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

export default Login;
