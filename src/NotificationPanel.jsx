import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { Bell, CheckCircle, XCircle, AlertTriangle, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./notification.css";

const getIcon = (type) => {
  switch (type) {
    case "low-stock": return <AlertTriangle className="icon low-stock" />;
    case "expiry": return <Bell className="icon expiry" />;
    case "reorder": return <CheckCircle className="icon reorder" />;
    case "non-movement": return <XCircle className="icon non-movement" />;
    case "damage": return <AlertTriangle className="icon damage" />;
    default: return <Bell />;
  }
};

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const loadCSVData = () => {
    fetch("/stock_alerts.csv")
      .then(response => response.text())
      .then(csvData => {
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const alerts = result.data.flatMap((row, index) => {
              let alertList = [];
              if (row["Expiry Alert"]?.trim().toLowerCase() === "true") {
                alertList.push({ id: index + 1, type: "expiry", title: `Expiry Alert: ${row["Product Name"]}`, details: row });
              }
              if (row["Reorder Alert"]?.trim().toLowerCase() === "true") {
                alertList.push({ id: index + 100, type: "reorder", title: `Reorder Alert: ${row["Product Name"]}`, details: row });
              }
              if (row["Non-Movement Alert"]?.trim().toLowerCase() === "true") {
                alertList.push({ id: index + 200, type: "non-movement", title: `Non-Movement Alert: ${row["Product Name"]}`, details: row });
              }
              if (row["Damage Alert"]?.trim().toLowerCase() === "true") {
                alertList.push({ id: index + 300, type: "damage", title: `Damage Alert: ${row["Product Name"]}`, details: row });
              }
              return alertList;
            });
            setNotifications(alerts);
          },
        });
      })
      .catch(error => console.error("Error loading CSV:", error));
  };

  useEffect(() => {
    loadCSVData();
  }, []);

  const markAsRead = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="notification-panel">
      <h2>Stock Alerts</h2>
      <div className="notification-bell" onClick={() => setIsOpen(!isOpen)}>
        <Bell size={24} />
        {notifications.length > 0 && (
          <span className="notification-count">{notifications.length}</span>
        )}
      </div>

      {isOpen && (
        <div className="notification-dropdown">
          <h4>Notifications</h4>
          {notifications.length === 0 ? (
            <p>No notifications</p>
          ) : (
            notifications.map((n) => (
              <div key={n.id} className={`notification-item ${n.type}`}>
                {getIcon(n.type)}
                <div className="notification-content">
                  <h5>{n.title}</h5>
                </div>
                <button className="view-btn" onClick={() => navigate(`/details/${n.id}`, { state: { details: n.details } })}>
                  View
                </button>
                <Check className="mark-read-icon" onClick={() => markAsRead(n.id)} />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
