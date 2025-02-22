// src/components/ChatBubble/ChatBubble.jsx
import React, { useEffect, useState } from 'react';
import './ChatBubble.css';

const ChatBubble = ({ onClick = () => {} }) => { // Asignamos una función vacía por defecto
  const [typing, setTyping] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Configurar visibilidad después de 2 segundos para pruebas
    const visibilityTimer = setTimeout(() => setVisible(true), 2000);

    // Cambiar a mensaje de ayuda después de 5 segundos
    const typingTimer = setTimeout(() => setTyping(false), 5000);

    return () => {
      clearTimeout(visibilityTimer);
      clearTimeout(typingTimer);
    };
  }, []);

  const handleClick = () => {
    setVisible(false); // Ocultar la burbuja permanentemente
    onClick(); // Ejecutar la función de apertura de chat
  };

  if (!visible) return null;

  return (
    <div className="chat-bubble" onClick={handleClick}>
      {typing ? (
        <div className="typing">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      ) : (
        <p>Hola ¿En qué puedo ayudarte?</p>
      )}
    </div>
  );
};

export default ChatBubble;
