import React from 'react'
import FDMLogo from './assets/logo.png'
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import api from "/src/api.js";
import "./styles/Login.css"

import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants.js";
//import LoadingIndicator from "./LoadingIndicator";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialise navigate


  const handleSubmit = async (e) => {
      setLoading(true);
      e.preventDefault(); // Prevent form submission

      try {
        console.log("Submitting login request:", { email, password });
        // Make sure API request is successful first
        const res = await api.post("/api/token/", { email, password })

        // Log the entire response to inspect its structure
        console.log("API response:", res);

        // If successful, store tokens in localStorage
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        localStorage.setItem('email', email)

        // Inform the user of success
        alert("Login successful");
        // Navigate to the dashboard page after success
        navigate("/dashboard");
        window.location.reload();  // Forces a page reload
      } catch (error) {
        console.error("Login error:", error);
        // Only show the failed login alert if an error occurs during the request
        alert("Failed to log in. Please check your credentials or try again later.");
      } finally {
          // Ensure loading is set to false after the entire process
          setLoading(false);
      }
  };

  return (
    <>
        <header className='Logo'>
            <img src={FDMLogo} alt="FDM Logo" />
            <p>ExpenseEase360</p>
        </header>
        <form onSubmit={handleSubmit} className='Login-Box'>
          <p>Login</p>
          <input
              className="form-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
          />
          <br />
          <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
          />
          <br />
          <button className="btn btn-primary" type="submit">
              Login
          </button>
      </form>
    </>
  )
}

export default Login