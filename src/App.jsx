import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddStock from "./AddStock";
import ViewStock from "./ViewStock";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import DeletedStock from "./DeletedStock";
import InventoryReports from "./InventoryReports";
import Notification from "./NotificationPanel";
import Navbar from "./Navbar"; // Import Navbar
import Bill from "./Bill";
import Form from "./Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './Home.jsx';
import PharmacistLogin from './PharmacistLogin.jsx';
import AdminLogin from './AdminLogin.jsx';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/bill" element={<Bill />} />
      <Route path="/form" element={<Form />} />
        <Route path="/add-stock" element={<AddStock />} />
        <Route path="/view-stock" element={<ViewStock />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/signup-page" element={<SignUpPage />} />
        <Route path="/deleted-stock" element={<DeletedStock />} />
        <Route path="/inventory-reports" element={<InventoryReports />} />
        <Route path="/" element={<Home />} />
      <Route path="/pharmacistLogin" element={<PharmacistLogin />} />
      <Route path="/adminLogin" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
