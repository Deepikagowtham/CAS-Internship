import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { X } from "lucide-react"; // Import close icon
import "./DetailsPage.css";

const DetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const details = location.state?.details;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!details) {
    return <p>No details found.</p>;
  }

  return (
    <div className="details-page">
      {/* Close Icon at Top Right */}
      <X className="close-icon" onClick={() => navigate(-1)} />

      <h2>Medicine Details</h2>
      
      {isMobile ? (
        <table className="details-table mobile">
          <tbody>
            {Object.entries(details).map(([key, value]) => (
              <tr key={key}>
                <td><strong>{key.replace(/_/g, " ")}:</strong></td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table className="details-table pc">
          <thead>
            <tr>
              {Object.keys(details).map((key) => (
                <th key={key}>{key.replace(/_/g, " ")}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {Object.values(details).map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DetailsPage;
