import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewStock.css";

const ViewStock = () => {
  const [medicines, setMedicines] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedValues, setUpdatedValues] = useState({});
  const [deleteReason, setDeleteReason] = useState({});
  const [otherReason, setOtherReason] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedMedicines = JSON.parse(localStorage.getItem("medicines")) || [];
    setMedicines(savedMedicines);
  }, []);

  // Handle checkbox selection
  const handleCheckboxChange = (index) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((id) => id !== index)
        : [...prevSelected, index]
    );
  };

  // Enable checkboxes for Update/Delete
  const toggleCheckboxes = (update = false) => {
    setShowCheckboxes(true);
    setIsUpdating(update);
    setSelectedIds([]);
    setDeleteReason({});
    setOtherReason("");

    if (update) {
      const updatedStock = medicines.reduce((acc, med, idx) => {
        acc[idx] = { ...med };
        return acc;
      }, {});
      setUpdatedValues(updatedStock);
    }
  };

  // Handle reason selection
  const handleReasonChange = (index, reason) => {
    setDeleteReason((prev) => ({ ...prev, [index]: reason }));
  };

  // Handle input for custom reason
  const handleOtherReasonChange = (e) => {
    setOtherReason(e.target.value);
  };

  // Delete selected stock
  const handleDelete = () => {
    const deletedRecords = selectedIds.map((index) => {
      const reason = deleteReason[index] === "Others" ? otherReason : deleteReason[index];
      return {
        ...medicines[index],
        deletedAt: new Date().toLocaleString(),
        reason,
      };
    });

    const remainingMedicines = medicines.filter((_, index) => !selectedIds.includes(index));
    
    setMedicines(remainingMedicines);
    localStorage.setItem("medicines", JSON.stringify(remainingMedicines));

    // Store deleted stock separately
    const previousDeleted = JSON.parse(localStorage.getItem("deletedStock")) || [];
    localStorage.setItem("deletedStock", JSON.stringify([...previousDeleted, ...deletedRecords]));

    setShowCheckboxes(false);
  };

  // Handle input changes for updating fields
  const handleInputChange = (index, field, value) => {
    setUpdatedValues((prev) => ({
      ...prev,
      [index]: { ...prev[index], [field]: value },
    }));
  };

  // Save updated stock details
  const handleUpdate = () => {
    const updatedMedicines = medicines.map((med, index) =>
      selectedIds.includes(index) ? updatedValues[index] : med
    );
    setMedicines(updatedMedicines);
    localStorage.setItem("medicines", JSON.stringify(updatedMedicines));
    setShowCheckboxes(false);
  };

  return (
    <div className="view-stock-container">
      <h2>📦 Medicine Stock</h2>
      <table>
        <thead>
          <tr>
            {showCheckboxes && <th>Select</th>}
            <th>Name</th>
            <th>Batch No</th>
            <th>Manufacturing Date</th>
            <th>Expiry Date</th>
            <th>Quantity</th>
            <th>Supplier</th>
            <th>Purchase Cost</th>
            <th>Storage Conditions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.length > 0 ? (
            medicines.map((med, index) => (
              <tr key={index}>
                {showCheckboxes && (
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(index)}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </td>
                )}
                <td>{med.medicineName}</td>
                <td>{med.batchNumber}</td>
                <td>{med.manufacturingDate || "N/A"}</td>
                <td>{med.expiryDate || "N/A"}</td>
                <td>{med.quantity}</td>
                <td>{med.supplierDetails}</td>
                <td>₹ {med.purchaseCost || "N/A"}</td>
                <td>{med.storageConditions}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No medicines available.</td>
            </tr>
          )}
        </tbody>
      </table>

      {showCheckboxes && !isUpdating && (
        <div className="delete-reason-container">
          <h3>Select a reason for deletion:</h3>
          {selectedIds.map((index) => (
            <div key={index}>
              <select onChange={(e) => handleReasonChange(index, e.target.value)}>
                <option value="">Select Reason</option>
                <option value="Expired">Expired</option>
                <option value="Damaged">Damaged</option>
                <option value="Unmovable">Unmovable</option>
                <option value="Others">Others</option>
              </select>
              {deleteReason[index] === "Others" && (
                <input
                  type="text"
                  placeholder="Enter reason"
                  value={otherReason}
                  onChange={handleOtherReasonChange}
                />
              )}
            </div>
          ))}
        </div>
      )}

      <div className="button-container">
        {!showCheckboxes && (
          <>
            <button className="update-btn" onClick={() => toggleCheckboxes(true)}>Update Stock</button>
            <button className="delete-btn" onClick={() => toggleCheckboxes(false)}>Delete Stock</button>
          </>
        )}
        {showCheckboxes && isUpdating && (
          <button className="save-btn" onClick={handleUpdate}>Save Changes</button>
        )}
        {showCheckboxes && !isUpdating && (
          <button className="confirm-delete-btn" onClick={handleDelete}>Confirm Delete</button>
        )}
        {showCheckboxes && (
          <button className="cancel-btn" onClick={() => setShowCheckboxes(false)}>Cancel</button>
        )}
        <button className="view-deleted-btn" onClick={() => navigate("/deleted-stock")}>
          View Deleted Stock
        </button>
      </div>
    </div>
  );
};

export default ViewStock;
