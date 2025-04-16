import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CNavbar, CContainer } from '@coreui/react';
import NotificationPanel from './NotificationPanel';
import './PharmacistLogin.css'; // Reuse same CSS

const AdminLogin = () => {
  const navigate = useNavigate();

  const handleManageStock = () => {
    navigate('/add-stock');
  };

  const handleViewReport = () => {
    navigate('/inventory-reports');
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
        <h2>Welcome, Admin!</h2>
        <p>
          Monitor pharmacy performance, manage inventory efficiently, and
          generate insightful reports. Use the buttons below to proceed.
        </p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135823.png"
          alt="Admin Illustration"
          className="pharmacist-img"
        />

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '20px' }}>
          <button className="bill-button" onClick={handleManageStock}>
            Manage Stock
          </button>
          <button className="bill-button" onClick={handleViewReport}>
            View Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
