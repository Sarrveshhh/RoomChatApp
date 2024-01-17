import React from 'react'
import {useState, useEffect, useRef} from'react'
import './App1.css';
import { Link, useNavigate } from 'react-router-dom';


const Home = ({socket}) => {

  const [roomName, setRoomName] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  

  const joinRoom = () => {
    if(socket.current && socket.current.connected){
      socket.current.emit('join-room', roomName, fname, lname, email);
      navigate(`/room/${roomName}`, {
        state: { socketId: socket.current.id, fname, lname, email },
      });

    }
    else{
      console.log('socket is not connected');
    }
  };
  return (
    <div className="home-div">

      {/* left side content  */}
      <div className="content-left">
        
        <h2 className="content-header">Join any room and chat with strangers</h2>
        <div className="content-para">Welcome to our vibrant chat community! Dive into engaging conversations with random active users in our dynamic chat rooms. Connect, share, and make new connections effortlessly in this lively online space.</div>
      </div>


      {/* right side form  */}
      
      <div className="form-right">
        <input type="text" className="input-fname inp" placeholder="First Name" onChange={(e) => setFname(e.target.value)}/>
        <input type="text" className="input-lname inp" placeholder="Last Name" onChange={(e) => setLname(e.target.value)}/>
        <input type="text" className="input-email inp" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)}/>
        <input type="text" className="input-roomname inp" placeholder="Room Name" onChange={(e) => setRoomName(e.target.value)}/>
        <button className="input-btn" onClick={joinRoom}>Enter the Chat Application</button>
        <div className="tands">By clicking the button, you are agreeing to our <Link to="/termsandc" className="highlight">Terms and Services</Link></div>
      </div>

    </div>
  );
}

export default Home;