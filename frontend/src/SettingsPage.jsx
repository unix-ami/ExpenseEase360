import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/Dashboard.css";
import Settings from './Settings.jsx'
import { BrowserRouter } from 'react-router-dom';

import React from 'react'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Settings />
  </BrowserRouter>
)