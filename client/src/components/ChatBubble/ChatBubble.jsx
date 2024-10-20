// src/components/ChatBubble.jsx
import React, { useState, useEffect } from 'react';
import './ChatBubble.css';

const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showChatBubble, setShowChatBubble] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);

  // Efecto para mostrar la burbuja de chat después de 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChatBubble(true);
      // Mensaje automático al abrir el chat
      setMessages(prevMessages => [...prevMessages, { text: "¡Hola! Estoy aquí para ayudarte a enviar tu dinero.", type: 'received' }]);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (userMessage.trim()) {
      setMessages([...messages, { text: userMessage, type: 'sent' }]);
      const whatsappLink = `https://l.instagram.com/?u=https%3A%2F%2Fwa.me%2F584247249758%3Ffbclid%3DPAZXh0bgNhZW0CMTEAAaaAiw2-yldvN_IF76u3QAwvwjX8yoIUGQG1iK558k-Op8VTBwyFYbee5WM_aem_g6ekafpT7134S7MEZ12ymA&e=AT29t3Re7KwQvYj8LXjpKEkp-gERc92zi1rsAq3OhdYkj0kXDP6zgah5LB3q3ovfKyPoz82vnfiAQU8e1-QOIpr3j9B1cXRgPz76ZN8`;
      window.open(whatsappLink, '_blank');
      setUserMessage('');
    }
  };

  return (
    <div className="chat-container">
      {showChatBubble ? (
        <>
          <div className={`chat-box ${isOpen ? 'open' : ''}`}>
            {isOpen ? (
              <div className="chat-content">
                <div className="chat-header">
                  <h4>Chat</h4>
                  <button className="close-chat" onClick={toggleChat}>X</button>
                </div>
                <div className="messages-list">
                  {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.type === 'sent' ? 'sent' : 'received'}`}>
                      {msg.text}
                    </div>
                  ))}
                </div>
                <div className="chat-input">
                  <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Escribe un mensaje..."
                  />
                  <button onClick={handleSendMessage}>Enviar</button>
                </div>
              </div>
            ) : null}
          </div>

          <div className="floating-icons">
            <button className="chat-float" onClick={toggleChat}>
              💬
            </button>
            {/* Removed the previous WhatsApp link here */}
          </div>

          {showTooltip && <div className="chat-tooltip">¿En qué puedo ayudarte?</div>}
        </>
      ) : (
        <div className="loading-dots">
          <span>.</span><span>.</span><span>.</span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
