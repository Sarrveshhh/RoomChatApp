import React from "react";
import { useParams } from "react-router-dom";
import "./App1.css";

const ChatRoom = () => {
  const { roomName } = useParams();
  return (
    <div className="chat-room">
      {/* 1. Chat room name  */}
      <h2 className="room-name">Chat Room PIZZA</h2>

      {/* 2. header user details  */}
      <div className="header">

        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7P_fJOVOquam_l2cyud6YvY7H-SI5MJZ-gREOVwj7ng&s" alt="user" className="user-img" />
        <div className="user-fname us">fname</div>

        <div className="user-fname us">lname</div>

        <div className="user-email us">email</div>

      </div>

      {/* 3. messaging  */}
      <div className="messages">
        <div className="user-message">Hello there! How are you?</div>
        <div className="other-message">I'm fine, how about you?</div>
      </div>

      {/* 4. input box  */}
      <div className="input-box">
        <input
          type="text"
          className="input-message"
          placeholder="Type your message here..."
        />
        <button className="send-btn">Send</button>
        <button className="leave-btn">Leave</button>
      </div>

    </div>

    
  );
};

export default ChatRoom;
