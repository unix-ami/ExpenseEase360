import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/Dashboard.css";
import Form from './Dashboard.jsx'
import { BrowserRouter } from 'react-router-dom';

import React from 'react'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Form />
  </BrowserRouter>
)
