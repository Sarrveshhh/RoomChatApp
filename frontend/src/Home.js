import React from 'react'
import './App1.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-div">

      {/* left side content  */}
      <div className="content-left">
        
        <h2 className="content-header">Join any room and chat with strangers</h2>
        <div className="content-para">Welcome to our vibrant chat community! Dive into engaging conversations with random active users in our dynamic chat rooms. Connect, share, and make new connections effortlessly in this lively online space.</div>
      </div>


      {/* right side form  */}
      
      <div className="form-right">
        <input type="text" className="input-fname inp" placeholder="First Name"/>
        <input type="text" className="input-lname inp" placeholder="Last Name"/>
        <input type="text" className="input-email inp" placeholder="Email Address"/>
        <input type="text" className="input-password inp" placeholder="Password"/>
        <button className="input-btn">Enter the Chat Application</button>
        <div className="tands">By clicking the button, you are agreeing to our <Link to="/termsandc" className="highlight">Terms and Services</Link></div>
      </div>

    </div>
  )
};

export default Home;