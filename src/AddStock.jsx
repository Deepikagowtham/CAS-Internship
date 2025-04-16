import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddStock.css";

const AddStock = () => {
  const navigate = useNavigate();
  
  const [newMedicine, setNewMedicine] = useState({
    medicineName: "",
    batchNumber: "",
    manufacturingDate: "",
    expiryDate: "",
    quantity: "",
    supplierDetails: "",
    purchaseCost: "",
    storageConditions: "",
  });

  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  
  // Sample stock data
  useEffect(() => {
    const savedMedicines = JSON.parse(localStorage.getItem("medicines")) || [
      { medicineName: "Paracetamol", batchNumber: "B123", supplierDetails: "MediCorp", storageConditions: "Cool & Dry" },
      { medicineName: "Aspirin", batchNumber: "B456", supplierDetails: "HealthPlus", storageConditions: "Room Temp" },
      { medicineName: "Ibuprofen", batchNumber: "B789", supplierDetails: "PharmaCare", storageConditions: "Cool & Dry" },
    ];
    setMedicines(savedMedicines);
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMedicine({ ...newMedicine, [name]: value });

    if (name === "medicineName") {
      const suggestions = medicines.filter((med) =>
        med.medicineName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredMedicines(value ? suggestions : []);
      
      // Auto-fill if exact match
      const existingMed = medicines.find((med) => med.medicineName.toLowerCase() === value.toLowerCase());
      if (existingMed) {
        setNewMedicine({
          ...newMedicine,
          medicineName: existingMed.medicineName,
          batchNumber: existingMed.batchNumber,
          supplierDetails: existingMed.supplierDetails,
          storageConditions: existingMed.storageConditions,
        });
      }
    }
  };

  // Select medicine from suggestions
  const selectMedicine = (name) => {
    const selectedMed = medicines.find((med) => med.medicineName === name);
    if (selectedMed) {
      setNewMedicine({
        ...newMedicine,
        medicineName: selectedMed.medicineName,
        batchNumber: selectedMed.batchNumber,
        supplierDetails: selectedMed.supplierDetails,
        storageConditions: selectedMed.storageConditions,
      });
    }
    setFilteredMedicines([]); // Hide suggestions
  };

  // Add stock to local storage
  const addStock = () => {
    if (newMedicine.medicineName && newMedicine.batchNumber) {
      const updatedMedicines = [...medicines, newMedicine];
      setMedicines(updatedMedicines);
      localStorage.setItem("medicines", JSON.stringify(updatedMedicines));

      setNewMedicine({
        medicineName: "",
        batchNumber: "",
        manufacturingDate: "",
        expiryDate: "",
        quantity: "",
        supplierDetails: "",
        purchaseCost: "",
        storageConditions: "",
      });
    }
  };

  return (
    <div className="add-stock-wrapper"> {/* Flex container */}

    {/* Add Image on the right */}
    <div className="image-container">
        <img src="https://i.pinimg.com/736x/db/56/0a/db560a9fc2e18b8d6d75d72fb09db3e8.jpg" alt="Medicine" />
      </div>

    <div className="add-stock-container">
      <h2>Add New Stock</h2>
      <br/><br/>

      <div className="autocomplete">
        <input
          type="text"
          name="medicineName"
          placeholder="Medicine Name"
          value={newMedicine.medicineName}
          onChange={handleChange}
        /> <br/><br/>
        {filteredMedicines.length > 0 && (
          <ul className="autocomplete-list">
            {filteredMedicines.map((med, index) => (
              <li key={index} onClick={() => selectMedicine(med.medicineName)}>
                {med.medicineName}
              </li>
            ))}
          </ul>
        )}
      </div>

      <input
        type="text"
        name="batchNumber"
        placeholder="Batch Number"
        value={newMedicine.batchNumber}
        onChange={handleChange}
      /> <br/><br/>
      <input
        type="date"
        name="manufacturingDate"
        value={newMedicine.manufacturingDate}
        onChange={handleChange}
      /> <br/><br/>
      <input
        type="date"
        name="expiryDate"
        value={newMedicine.expiryDate}
        onChange={handleChange}
      /> <br/><br/>
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={newMedicine.quantity}
        onChange={handleChange}
      /> <br/><br/>
      <input
        type="text"
        name="supplierDetails"
        placeholder="Supplier Details"
        value={newMedicine.supplierDetails}
        onChange={handleChange}
      /> <br/><br/>
      <input
        type="number"
        name="purchaseCost"
        placeholder="Purchase Cost"
        value={newMedicine.purchaseCost}
        onChange={handleChange}
      /> <br/><br/>
      <input
        type="text"
        name="storageConditions"
        placeholder="Storage Conditions"
        value={newMedicine.storageConditions}
        onChange={handleChange}
      /> <br/><br/>
      <button className="view-btn" onClick={addStock}>Add Stock</button> <br/><br/>
      <button className="view-btn" onClick={() => navigate("/view-stock")}>
        View Products
      </button> 
    </div>
    </div>
  );
};

export default AddStock;
