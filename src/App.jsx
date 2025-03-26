import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddStock from "./AddStock";
import ViewStock from "./ViewStock";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import DeletedStock from "./DeletedStock";
import InventoryReports from "./InventoryReports";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <Router>
        
        <Routes>
          <Route path="/add-stock" element={<AddStock />} />
          <Route path="/view-stock" element={<ViewStock />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup-page" element={<SignUpPage />} />
          <Route path="/deleted-stock" element={<DeletedStock />} />
          <Route path="/inventory-reports" element={<InventoryReports />} />
        </Routes>

    </Router>
  );
}

export default App;
