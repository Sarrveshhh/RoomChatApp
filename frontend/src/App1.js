import React from 'react';
import {BrowserRouter, Routes, Route} from'react-router-dom';
import Home from './Home';
import Error from './Error';
import './App1.css';
import App from './App';
import Termsandc from './Termsandc';

const App1 = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/room" element={<App />} />
        <Route path="/" element={<Home />} />
        <Route path="/termsandc" element={<Termsandc />} />
        <Route path="*" element={<Error />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App1