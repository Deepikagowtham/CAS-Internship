import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, User } from "lucide-react";
import "./Navbar.css";
import logo from "./assets/image.png"; // Ensure the image path is correct

const Navbar = () => {
  const location = useLocation();
  const hideNavbar = ["/login-page", "/signup-page"].includes(location.pathname);

  if (hideNavbar) return null; // Don't render navbar on Login & Signup

  return (
    <nav className="navbar">
      {/* Left - Logo */}
      <div className="navbar-left">
        <img src={logo} alt="Sudha Hospitals Logo" className="logo" />
      </div>
      
      {/* Right - Navigation Links */}
      <div className="navbar-right">
        <Link to="/add-stock" className="nav-link">Add Stock</Link>
        <Link to="/inventory-reports" className="nav-link">Inventory Report</Link>
        <Link to="/login-page" className="icon-link"><User size={24} /></Link>
        <Link to="/" className="icon-link"><Bell size={24} /></Link>
      </div>
    </nav>
  );
};

export default Navbar;
