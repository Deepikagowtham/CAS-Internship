import React, { useEffect, useState } from "react";
import "./DeletedStock.css";

const DeletedStock = () => {
  const [deletedStock, setDeletedStock] = useState([]);

  useEffect(() => {
    const storedDeletedStock = JSON.parse(localStorage.getItem("deletedStock")) || [];
    setDeletedStock(storedDeletedStock);
  }, []);

  return (
    <div className="deleted-stock-container">
      <h2>🗑️ Deleted Medicine Stock</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Batch No</th>
            <th>Deleted On</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {deletedStock.length > 0 ? (
            deletedStock.map((med, index) => (
              <tr key={index}>
                <td>{med.medicineName}</td>
                <td>{med.batchNumber}</td>
                <td>{med.deletedAt}</td>
                <td>{med.reason}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No deleted records.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DeletedStock;
