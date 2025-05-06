import React from "react";
import "./styles/Dashboard.css";
import "./styles/App.css";
import TopBar from './topbar';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants.js";


export default function Dashboard() {
  const navigate = useNavigate(); // Initialise useNavigate
  const [username, setUsername] = useState(""); // State to hold the username
  // Handle the logout process
  const handleLogout = () => {
    try {
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      alert('You have logged out successfully.');
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
      alert('An error occurred while logging out.');
    }
  };

  const handleClaim = () => navigate('/form');
  const handleSettings = () => navigate('/settings');
  const handleBug = () => navigate('/bug');
  const handleReport = () => navigate('/report');

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      alert("You are not logged in. Please log in to continue.");
      return;
    }

    fetch("http://localhost:8000/api/user/", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.ok ? response.json() : Promise.reject(response))
    .then((data) => setUsername(data.first_name || "Guest"))
    .catch((error) => {
      console.error("Error fetching user data:", error);
      alert("Failed to fetch user data. Please try again.");
    });
  }, []);

  return (
    <>
      <TopBar />
      <div className="dashboard-container">
        <div className="dashboard-content">
          <h1>Dashboard</h1>
          <p>Welcome back, {username} </p>
          <div className="info">
            <div className="history">
              History
            </div>
            <div className="claims">
              Pending Claims
            </div>
            <div className="trademark">
              @ FDM Group 2025
            </div>
          </div>
        </div>
      </div>
    </>
  );
}