
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";

const specialisations = ["Cardiologist", "Dermatologist", "Pediatrician", "Neurologist"];
const medicineList = ["Paracetamol", "Amoxicillin", "Ibuprofen", "Cetirizine", "Azithromycin"];

const generateAutoFields = () => {
  const now = new Date();
  const billNo = Math.floor(Math.random() * 90000 + 10000).toString();
  const date =
    now.toLocaleDateString("en-GB") +
    " " +
    now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const regNo = "REG" + Math.floor(Math.random() * 10000);
  return { billNo, date, regNo };
};

const Form = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    ...generateAutoFields(),
    name: "",
    address: "",
    phone: "",
    altPhone: "",
    doctor: "",
    specialisation: "",
    description: "",
    qty: 1,
    hsn: "",
    batch: "",
    exp: "",
    price: 0,
    total: 0,
    cgst: 0,
    sgst: 0,
  });

  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    if (field === "description") {
      const filtered = medicineList.filter((med) =>
        med.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filtered);

      // mock medicine details
      const mockData = {
        hsn: "3004",
        batch: "B123",
        exp: "12/26",
        price: 50,
        cgst: 2.5,
        sgst: 2.5,
      };
      const total = mockData.price * form.qty;
      setForm((prev) => ({
        ...prev,
        ...mockData,
        total,
      }));
    }

    if (field === "qty" && form.price) {
      const total = form.price * value;
      setForm((prev) => ({ ...prev, total }));
    }
  };

  const handleSuggestionClick = (desc) => {
    handleChange("description", desc);
    setSuggestions([]);
  };

  const handleSubmit = () => {
    const items = [
      {
        description: form.description,
        hsn: form.hsn,
        batch: form.batch,
        exp: form.exp,
        qty: form.qty,
        price: parseFloat(form.price),
        cgst: parseFloat(form.cgst),
        sgst: parseFloat(form.sgst),
        total: parseFloat(form.total),
      },
    ];
  
    const total = items.reduce((sum, i) => sum + i.total, 0);
    const gst = items.reduce((sum, i) => sum + i.cgst + i.sgst, 0);
    const grandTotal = Math.round(total + gst);
    const roundedOff = parseFloat((grandTotal - (total + gst)).toFixed(2));
  
    const billData = {
      billNo: form.billNo,
      date: form.date,
      patient: {
        name: form.name,
        address: form.address,
        phone: form.phone,
        altPhone: form.altPhone,
        regNo: form.regNo,
      },
      doctor: form.doctor,
      items,
      total,
      roundedOff,
      grandTotal,
    };
  
    navigate("/bill", { state: { billData } });
  };
  

  return (
    <div className="form-fullscreen">
      <h1>Medical Prescription Form</h1>
      <table className="form-table">
        <tbody>
          <tr>
            <td>Patient Name</td>
            <td><input value={form.name} onChange={(e) => handleChange("name", e.target.value)} /></td>
            <td>Address</td>
            <td><input value={form.address} onChange={(e) => handleChange("address", e.target.value)} /></td>
          </tr>
          <tr>
            <td>Phone</td>
            <td><input value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} /></td>
            <td>Alt Phone</td>
            <td><input value={form.altPhone} onChange={(e) => handleChange("altPhone", e.target.value)} /></td>
          </tr>
          <tr>
            <td>Doctor Name</td>
            <td><input value={form.doctor} onChange={(e) => handleChange("doctor", e.target.value)} /></td>
            <td>Specialisation</td>
            <td>
              <select value={form.specialisation} onChange={(e) => handleChange("specialisation", e.target.value)}>
                <option value="">Select</option>
                {specialisations.map((spec) => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>Description</td>
            <td colSpan="3" style={{ position: "relative" }}>
              <input
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                onBlur={() => setTimeout(() => setSuggestions([]), 100)}
              />
              {suggestions.length > 0 && (
                <ul className="suggestions-list">
                  {suggestions.map((s) => (
                    <li key={s} onClick={() => handleSuggestionClick(s)}>{s}</li>
                  ))}
                </ul>
              )}
            </td>
          </tr>
          <tr>
            <td>Quantity</td>
            <td><input type="number" value={form.qty} onChange={(e) => handleChange("qty", parseInt(e.target.value || 1))} /></td>
            <td>HSN</td>
            <td>{form.hsn}</td>
          </tr>
          <tr>
            <td>Batch</td>
            <td>{form.batch}</td>
            <td>Expiry</td>
            <td>{form.exp}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>{form.price}</td>
            <td>Total</td>
            <td>{form.total}</td>
          </tr>
          <tr>
            <td>CGST</td>
            <td>{form.cgst}%</td>
            <td>SGST</td>
            <td>{form.sgst}%</td>
          </tr>
          <tr>
            <td>Bill No</td>
            <td>{form.billNo}</td>
            <td>Date</td>
            <td>{form.date}</td>
          </tr>
          <tr>
            <td>Reg No</td>
            <td>{form.regNo}</td>
            <td colSpan="2">
              <button className="submit-btn" onClick={handleSubmit}>Submit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Form;