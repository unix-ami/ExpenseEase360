import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Login from  './Login.jsx'
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> 
      <Login /> 
    </BrowserRouter>
  </StrictMode>,
);

