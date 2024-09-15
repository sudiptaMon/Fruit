import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/chatpage.css";

const predefinedQA = {
  "hi":"Hello there? how are you?"
  
};

const ChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I assist you?', type: 'bot', time: '10:30 AM' },
  ]);

  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    const userMessage = { text: inputMessage, type: 'user', time: new Date().toLocaleTimeString() };
    setMessages(prevMessages => [...prevMessages, userMessage]);


    const botResponse = predefinedQA[inputMessage.trim().toLowerCase()];

    if (botResponse) {
      setTimeout(() => {
        const botMessage = { text: botResponse, type: 'bot', time: new Date().toLocaleTimeString() };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      }, 1000); 
    } else {
      setTimeout(() => {
        const botMessage = { text: "Sorry, I don't understand the question.", type: 'bot', time: new Date().toLocaleTimeString() };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      }, 1000);
    }

    setInputMessage(''); 
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      handleSendMessage();
    }
  };

  const navigateHome = () => {
    navigate('/home'); 
  };

  return (
    <div className="chat-page">
      <div className="chat-header">
        <span className="arrow" onClick={navigateHome}><i className='fas fa-angle-left'></i></span> 
        <img src="avatar.png" alt="User Avatar" className="avatar" />
        <div className="user-info">
          <h3>John Doe</h3>
          <span className="status">Online</span>
        </div>
      </div>

      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            {msg.text}
            <div className="timestamp">{msg.time}</div>
          </div>
        ))}
      </div>

      <div className="chat-footer">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage}>
          send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
