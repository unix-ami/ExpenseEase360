import React from 'react';
import './styles/App.css';
import './styles/Form.css';
import "./styles/SideBar.css";
import logo from "./assets/logo.png";
import submitClaimIcon from "./assets/claim.png";
import reportBugIcon from "./assets/enquiry.png";
import settingsIcon from "./assets/settings.png";
import logoutIcon from "./assets/logout.png";
import generateReportIcon from "./assets/dashboard.png";
import bottomImage from "./assets/bubble.png"
import { useNavigate } from 'react-router-dom';


const Report = () => {
    const navigate = useNavigate(); // Initialise useNavigate
    // Handle the logout process
    const handleLogout = () => {
    try {
        // Remove tokens from localStorage
        localStorage.removeItem('access_token');  // Ensure this matches the key name in localStorage
        localStorage.removeItem('refresh_token'); // Optional: if you're storing a refresh token
    
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

    const handleClaim = () => {
        // Redirect the user to the expense claim form page
        navigate('/form'); 
        window.location.reload();  // Forces a page reload
    }

    const handleSettings = () => {
        // Redirect the user to the settings page
        navigate('/settings'); 
        window.location.reload();  // Forces a page reload
    }

    const handleDashboard = () => {
        // Redirect the user to the dashboard page
        navigate('/dashboard'); 
        window.location.reload();  // Forces a page reload
    }

    const handleBug = () => {
        // Redirect the user to the bug page
        navigate('/bug'); 
        window.location.reload();  // Forces a page reload
    }
    
    return (
        <> 
        <div className="sidebar">
            <img src={logo} alt="My Image" className="logo" />
            <p className="logo-text">ExpenseEase360</p>
            <div className="sidebar-options">
                <div className="submit-claim">
                <button onClick={handleClaim}>
                    <span>
                    <img src={submitClaimIcon} alt="" />
                    <p>submit claim</p> 
                    </span>
                </button>
                </div>
                <div className="report-bug">
                <button onClick={handleBug}>
                    <span>
                    <img src={reportBugIcon} alt="" />
                    <p>report bug</p>
                    </span>
                </button>
                </div>
                <div className="settings">
                <button onClick={handleSettings}>
                    <span>
                    <img src={settingsIcon} alt="" />
                    <p>settings</p>
                    </span>
                </button>
                </div>
                <div className="dashboard">
                <button onClick={handleDashboard}>
                    <span>
                    <img src={generateReportIcon} alt="" />
                    <p>Dashboard</p>
                    </span>
                </button>
                </div>
                <div className="log-out">
                <button onClick={handleLogout}>
                    <span>
                    <img src={logoutIcon} alt="" />
                    <p>logout</p>
                    </span>
                </button>
                </div>
            </div>
            
        </div>

        <div className="form-container">
            <h1>Generate Report </h1>
                <form>
                    <input type="checkbox">
                    </input>
                    <label> 2025 </label>
                    <button type="submit">Submit</button>
                </form>
        </div>
        </>
    );
};

export default Report;
