import React from 'react'
import ReactDom from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import Dashboard from "./Dashboard.jsx";
import Form from "./Form.jsx";
import Settings from "./Settings.jsx";
import Bug from './Bug.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/form" element={<Form />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/bug" element={<Bug />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </Router>
  );
}

export default App;
