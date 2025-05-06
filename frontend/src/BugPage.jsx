import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/Login.css'
import Bug from './Bug.jsx';
import { BrowserRouter } from 'react-router-dom';

import React from 'react'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Bug />
  </BrowserRouter>
)
