// src/components/ChatModal/ChatModal.jsx
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import SendIcon from '@mui/icons-material/Send';

import './ChatModal.css';

const ChatModal = ({ show, onHide }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    const whatsappURL = `https://wa.me/584247249758?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered className="chat-modal">
      <Modal.Header closeButton className="chat-modal-header">
        <Modal.Title>Chat de Ayuda</Modal.Title>
      </Modal.Header>
      <Modal.Body className="chat-modal-body">
        <div className="message-container">
          <div className="message received">
            <p>Hola! ¿En qué puedo ayudarte?</p>
          </div>
        </div>
        <Form.Group controlId="message" className="message-input-container">
          <Form.Control
            as="textarea"
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="message-input"
          />
          <Button onClick={handleSendMessage} className="send-button" disabled={!message.trim()}>
          
            <SendIcon />

          </Button>
        </Form.Group>
      </Modal.Body>
    </Modal>
  );
};

export default ChatModal;
