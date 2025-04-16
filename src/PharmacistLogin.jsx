import React from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Add this
import { CNavbar, CContainer } from '@coreui/react';
import NotificationPanel from './NotificationPanel';
import './PharmacistLogin.css';

const PharmacistLogin = () => {
  const navigate = useNavigate(); // <-- Hook for navigation

  const handleBillClick = () => {
    navigate('/form'); // <-- Navigate to /form
  };

  return (
    <div className="login-page">
      <CNavbar className="custom-navbar">
        <CContainer className="navbar-content">
          <div className="navbar-left">
            <img className="logo-img" src="logo.jpg" alt="Logo" />
          </div>
          <div className="navbar-right">
            <NotificationPanel />
          </div>
        </CContainer>
      </CNavbar>

      <div className="login-content">
        <h2>Welcome, Pharmacist!</h2>
        <p>
          Effortlessly manage prescriptions and stock levels. Click the bill
          button to start invoicing or check for stock alerts using the alert
          panel above.
        </p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
          alt="Pharmacist Illustration"
          className="pharmacist-img"
        />

        {/* ✅ Updated Button */}
        <button className="bill-button" onClick={handleBillClick}>
          Bill
        </button>
      </div>
    </div>
  );
};

export default PharmacistLogin;
