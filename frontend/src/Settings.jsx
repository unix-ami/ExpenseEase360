import React from "react";
import "./styles/Dashboard.css";
import "./styles/App.css";
import TopBar from './topbar';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      alert('You have logged out successfully.');
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
      alert('An error occurred while logging out.');
    }
  };

  const handleClaim = () => navigate('/form');
  const handleSettings = () => navigate('/settings');
  const handleDashboard = () => navigate('/dashboard');
  const handleBug = () => navigate('/bug');

  return (
    <>
      <TopBar />
      <div className="dashboard-container">
        <div className="dashboard-content">
          <h1>Settings</h1>
          <p>Update your preferences and personal information here</p>
          <div className="info">
            <div className="history">
              First name, last name
            </div>
            <div className="claims">
              Region
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