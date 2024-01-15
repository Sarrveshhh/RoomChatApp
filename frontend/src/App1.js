import React from 'react';
import {BrowserRouter, Routes, Route} from'react-router-dom';
import Home from './Home';
import App from './App';
import Error from './Error';


const App1 = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/room" element={<App />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App1