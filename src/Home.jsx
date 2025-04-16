import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CButton, CContainer, CNavbar, CNavbarBrand } from '@coreui/react';
import { Carousel } from 'react-bootstrap';
import './Home.css';
import { useNavigate } from 'react-router-dom';

// Navbar Component
const NavbarForms2Example = () => {
  return (
    <CNavbar className="cnavbar">
      <CContainer fluid>
        <CNavbarBrand href="#">
          <img className="logo-img" src="logo.jpg" alt="Logo" height="40" />
        </CNavbarBrand>
      </CContainer>
    </CNavbar>
  );
};

// ✅ Flash News Component (Global)
const FlashNewsBanner = () => {
  return (
    <div className="flash-news">
      <p className="scrolling-text">
      Every second counts when it comes to saving lives.&nbsp;
        <span className="blinking-text">24/7 Emergency Services.</span>
      </p>
    </div>
  );
};


// Carousel Component
const ImageCarousel = () => {
  return (
    <Carousel className="carousel-container" interval={3000} pause={false} controls={false} >
      <Carousel.Item>
        <img className="d-block w-100" src="img2.png" alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="img1.png" alt="Second slide" />
      </Carousel.Item>
    </Carousel>
  );
};

// Buttons for Admin and Pharmacist
const AdminUserButtons = () => {
  const navigate = useNavigate(); // 👈 hook for navigation

  return (
    <div className="button-container">
      <h1>Login As </h1>
      <CButton className="modern-btn" onClick={() => navigate('/PharmacistLogin')}>Pharmacist</CButton>
      <CButton className="modern-btn" onClick={() => navigate('/AdminLogin')}>Admin</CButton>
    </div>
  );
};

// App Component (Main Layout)
function App() {
  return (
    <div>
      <NavbarForms2Example />
      <FlashNewsBanner /> {/* ✅ Now above both carousel and buttons */}
      <div className="main-container">
        <div className="container">
          <div className="row">
            <div className="col-md-11">
              <ImageCarousel />
            </div>
            <div className="col-md-1">
              <AdminUserButtons />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
