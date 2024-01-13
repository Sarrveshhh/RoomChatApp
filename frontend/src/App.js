import { useState, useRef, useEffect } from 'react';
import './App.css';
import { io } from 'socket.io-client';

function App() {
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);
  const socket = useRef(null); // Create a ref for the socket

  const brodcastMessage = () => {
    const message = inputRef.current.value;
    setMessages(prevMessages => [...prevMessages, message]);
    socket.current.emit('message', message); // Use the ref to emit
    inputRef.current.value = '';
  };

  useEffect(() => {
    // Initialize the socket connection inside useEffect
    socket.current = io('http://localhost:3001/');
    
    socket.current.on('brodcast-message', (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.current.disconnect();
    };
  }, []); // Empty dependency array ensures this useEffect runs once

  return (
    <div className="app">
      <h1>Chat App</h1>
      <input ref={inputRef} type="text" placeholder="Enter your message" />
      <button onClick={brodcastMessage}>Send</button>

      <div className="chat">
        <ul className="messages">
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

