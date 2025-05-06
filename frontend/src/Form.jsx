import React, { useState } from 'react';
import './styles/App.css';
import './styles/Form.css';
import TopBar from './topbar'; // Make sure to use the correct path
import { useNavigate } from 'react-router-dom';

import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants.js";

const Form = () => {
    const navigate = useNavigate(); // Initialise useNavigate
    const [expenseType, setExpenseType] = useState('');
    const [amount, setAmount] = useState('');
    const [evidence, setEvidence] = useState(null);
    const [uploadType, setUploadType] = useState(null);

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

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        const email = localStorage.getItem("email");

        // Create a FormData object to send the form data, including the file
        const formData = new FormData();
        formData.append('user', email);
        formData.append('claim_type', expenseType);
        formData.append('amount', amount);
        formData.append('image', evidence);
        formData.append('upload_type', uploadType);

        // Retrieve the JWT token from localStorage using the constant ACCESS_TOKEN
        const token = localStorage.getItem(ACCESS_TOKEN);

        try {
            const response = await fetch('http://localhost:8000/employees/claims/', {
                method: 'POST',
                body: formData, // Send the form data to the API endpoint
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Claim submitted successfully:', result);
                // Optionally handle success (show a message, reset form, etc.)
                alert('Claim submitted successfully');
                // Redirect after submission (optional)
                navigate('/dashboard');
                window.location.reload();  // Forces a page reload
            } else {
                console.error('Error submitting claim:', response.statusText);
                alert('Error submitting claim');
            }
        } catch (error) {
            console.error('Error during form submission:', error);
            alert('An error occurred while submitting the claim');
        }
    };
    
    return (
        <> 
        <TopBar />

        <div className="form-container">
            <h1>Expense Claim Form </h1>
                <form onSubmit={handleSubmit}>
                    
                    <label htmlFor="expenseType">Claim Type:</label>
                    <select 
                        id="expenseType" name="expenseType" value={expenseType}
                        onChange={(e) => setExpenseType(e.target.value)} required
                    >      
                        <option value="Travel">Travel – Covers all transportation, such as flights, trains, taxis, or car rentals.</option>
                        <option value="Food">Food – Meals, including those during travel or business meetings.</option>
                        <option value="Accommodation">Accommodation – Hotel stays, Airbnbs, etc., for business purposes.</option>
                        <option value="Supplies">Supplies – General office supplies like paper, pens, and printer ink.</option>
                        <option value="Equipment">Equipment – Laptops, phones, specialized tools or devices for work.</option>
                        <option value="Training">Training – Courses, seminars, workshops, certifications.</option>
                        <option value="Tech">Tech – Mobile phone bills, internet costs, cloud services, and software subscriptions.</option>
                        <option value="Healthcare">Healthcare – Health-related expenses, insurance premiums, medical check-ups.</option>
                        <option value="Maintenance">Maintenance – Repairs and upkeep of office space or work-related equipment.</option>
                        <option value="Client">Client – Gifts, meals, or events related to clients (business-related entertainment).</option>
                    </select>

                    <label htmlFor="amount">Amount:</label>
                    <input 
                        type="number" id="amount" name="amount" value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required step="0.01" 
                    />

                    <label htmlFor="evidence">Upload Evidence:</label>
                    <input 
                        type="file" id="evidence" name="evidence" 
                        accept=".jpg, .jpeg, .png, .pdf" required 
                        onChange={(e) => setEvidence(e.target.files[0])}
                    />

                    <label htmlFor="uploadType">Upload Type:</label>
                    <select 
                        id="uploadType" name="uploadType" value={uploadType}
                        onChange={(e) => setUploadType(e.target.value)} required
                    >      
                        <option value="Bill">Bill – Includes invoices, electronic receipts, and billing emails.</option>
                        <option value="Documentation">Documentation – Covers official/legal documents such as contracts, tax filings, warranties, and quotations.</option>
                        <option value="Goods">Goods – Refers to images of received items like parcels, office equipment, or delivered products.</option>
                        <option value="Tickets">Tickets – Includes paid access passes for events, travel tickets, or conference lanyards.</option>
                    </select>


                    <br />
                    <br />
                    <br />
                    
                    <button type="submit">Submit</button>
                </form>
        </div>
        </>
    );
};

export default Form;
