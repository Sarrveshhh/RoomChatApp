import React from 'react';
import {useState, useEffect, useRef} from'react';
import {BrowserRouter, Routes, Route} from'react-router-dom';
import Home from './Home';
import Error from './Error';
import './App1.css';
import App from './App';
import Termsandc from './Termsandc';
import ChatRoom from './ChatRoom';
import { io } from 'socket.io-client';

const App1 = () => {
  const socket = useRef(null); // Create a ref for the socket

  const socketDisconnect = () => {
    if(socket.current && socket.current.connected){
      socket.current.disconnect();
      console.log('socket Disconnected!');
    }
    else{
      console.log("Socket is not connected!")
    }
  };

  const socketConnection = () => {
    socket.current = io('http://localhost:3001/');
  };


  useEffect(() => {
    // socketConnection();
    if(!socket.current){
      socket.current = io('http://localhost:3001/');
    }
    // Clean up the socket connection when the component unmounts
    return () => {
      // socket.current.disconnect();
      // socketDisconnect();
      if(socket.current && socket.current.connected){
        socket.current.disconnect();
        console.log('socket Disconnected!');
      }
    };
  }, []); // Empty dependency array ensures this useEffect runs once


  return (
    <BrowserRouter>
    <Routes>
        {/* <Route path="/room" element={<App />} /> */}
        <Route path="/" element={<Home socket={socket}/>} />
        <Route path="/room/:roomName" element={<ChatRoom socket={socket}/>} /> {/* Dynamic roomName parameter */}
        <Route path="/termsandc" element={<Termsandc />} />
        <Route path="*" element={<Error />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App1