import React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./App1.css";

const ChatRoom = ({socket}) => {
  const { roomName } = useParams();
  const { state } = useLocation();
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');

  const [allMessages, setAllMessages] = useState([]);

  
  
  useEffect(() => {
    if (state) {
      setFname(state.fname);
      setLname(state.lname);
      setEmail(state.email);
    }

    socket.current.on('new-message', (message) => {
      setAllMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.current.off('new-message');
    };
  }, [state, socket]);

  const sendMessage = () => {
    // Emit the message to the server
    if (socket && text.trim() !== "") {
      const message = {
        fname,
        lname,
        email,
        text,
      };

      // Emit the message to the server with the room name
      socket.current.emit("room-message", message, roomName);

      // Update the local state with the sent message
      // setAllMessages((prevMessages) => [...prevMessages, message]);
      setText("");
    }
  };


  return (
    <div className="chat-room">
      {/* 1. Chat room name  */}
      <h2 className="room-name">Chat Room {roomName}</h2>

      {/* 2. header user details  */}
      <div className="header">

        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7P_fJOVOquam_l2cyud6YvY7H-SI5MJZ-gREOVwj7ng&s" alt="user" className="user-img" />
        <div className="user-fname us">{fname}</div>

        <div className="user-fname us">{lname}</div>

        <div className="user-email us">{email}</div>

      </div>

      {/* 3. messaging  */}
      <div className="messages">
        {/* <div className="user-message">Hello there! How are you?</div> */}
        {/* <div className="other-message">I'm fine, how about you?</div> */}

        {allMessages.map((message, index) => (
          <div key={index} className="user-message">
            <strong>{message.fname} {message.lname}:</strong> {message.text}
          </div>
        ))}

      </div>

      {/* 4. input box  */}
      <div className="input-box">
        <input
          type="text"
          className="input-message"
          placeholder="Type your message here..."
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick = {sendMessage} className="send-btn">Send</button>
        <button className="leave-btn">Leave</button>
      </div>

    </div>
  );
};

export default ChatRoom;
