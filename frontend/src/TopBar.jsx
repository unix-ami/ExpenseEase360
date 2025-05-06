import React from 'react';
import "./styles/TopBar.css";
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook from react-router-dom

// Import your images/icons directly
import logo from "./assets/logo.png";
import submitClaimIcon from "./assets/claim.png";
import reportBugIcon from "./assets/enquiry.png";
import settingsIcon from "./assets/settings.png";
import logoutIcon from "./assets/logout.png";
import generateReportIcon from "./assets/dashboard.png";

const TopBar = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Navigation handler functions
  const handleClaim = () => {
    navigate('/form'); // Redirect to the form page
    window.location.reload();
  };

  const handleSettings = () => {
    navigate('/settings'); // Redirect to the settings page
    window.location.reload();
  };

  const handleDashboard = () => {
    navigate('/dashboard'); // Redirect to the dashboard page
    window.location.reload();
  };

  const handleBug = () => {
    navigate('/bug'); // Redirect to the bug reporting page
    window.location.reload();
  };

  // Handle the logout process
  const handleLogout = () => {
    try {
        // Remove tokens from localStorage
        localStorage.removeItem('access');  
        localStorage.removeItem('refresh');
        localStorage.removeItem('email');
    
        // Optionally, inform the user that they have logged out
        alert('You have logged out successfully.');
    
        // Redirect the user to the login page
        navigate('/'); 
        window.location.reload();  // Forces a page reload
    } catch (error) {
        console.error('Error during logout:', error);  // Log any error to the console
        alert('An error occurred while logging out.');
    }
};

  return (
    <div className="topnav">
      <img src={logo} alt="My Image" className="logo" />

      <div className="submit-claim">
        <button onClick={handleClaim}>
          <span>
            <img src={submitClaimIcon} alt="Submit Claim Icon" />
            <p>Submit Claim</p>
          </span>
        </button>
      </div>

      <div className="report-bug">
        <button onClick={handleBug}>
          <span>
            <img src={reportBugIcon} alt="Report Bug Icon" />
            <p>Report Bug</p>
          </span>
        </button>
      </div>

      <div className="settings">
        <button onClick={handleSettings}>
          <span>
            <img src={settingsIcon} alt="Settings Icon" />
            <p>Settings</p>
          </span>
        </button>
      </div>

      <div className="dashboard">
        <button onClick={handleDashboard}>
          <span>
            <img src={generateReportIcon} alt="Dashboard Icon" />
            <p>Dashboard</p>
          </span>
        </button>
      </div>

      <div className="log-out">
        <button onClick={handleLogout}>
          <span>
            <img src={logoutIcon} alt="Logout Icon" />
            <p>Logout</p>
          </span>
        </button>
      </div>
    </div>
  );
};

export default TopBar;