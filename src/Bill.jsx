
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import './Bill.css';
import leftLogo from './assets/logo1.png';
import rightLogo from './assets/triangle-right-logo.jpg';
import { toWords } from 'number-to-words';

const Bill = () => {
  const { state } = useLocation();
  const billData = state?.billData;
  const billRef = useRef();

  useEffect(() => {
    if (billData) {
      setTimeout(() => {
        html2pdf()
        .set({
            margin: [10, 10, 10, 10],
            filename: `Bill_${billData.billNo}.pdf`,
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          })
          
          .from(billRef.current)
          .save();
      }, 500);
    }
  }, [billData]);

  if (!billData) return <p>No bill data provided.</p>;

  const {
    billNo, date, patient, doctor, items,
    total, roundedOff, grandTotal
  } = billData;

  const amountInWords = toWords(grandTotal).replace(/\b\w/g, l => l.toUpperCase());

  const totalGST = items.reduce((sum, item) => sum + item.cgst + item.sgst, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="bill-container" ref={billRef}>
      <div className="bill-header-centered">
        <img src={leftLogo} alt="KMCH Logo" className="bill-logo-centered" />
      </div>

      <div className="bill-title-bar">
        <h3 className="cash-bill-label">Cash Bill</h3>
        <div className="barcode-placeholder">|| ||| || ||| |</div>
      </div>

      <div className="info-box">
        <table className="info-table">
          <tbody>
            <tr>
              <td><strong>Bill No:</strong></td>
              <td>{billNo}</td>
              <td><strong>Date:</strong></td>
              <td>{date}</td>
            </tr>
            <tr>
              <td><strong>Name:</strong></td>
              <td>{patient.name}</td>
              <td><strong>Reg No:</strong></td>
              <td>{patient.regNo}</td>
            </tr>
            <tr>
              <td><strong>Address:</strong></td>
              <td colSpan="3">{patient.address}</td>
            </tr>
            <tr>
              <td><strong>Phone:</strong></td>
              <td colSpan="3">{patient.phone}, {patient.altPhone}</td>
            </tr>
            <tr>
              <td><strong>Doctor:</strong></td>
              <td colSpan="3">{doctor}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <table className="bill-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>HSN</th>
            <th>Batch</th>
            <th>Exp Date</th>
            <th>Qty</th>
            <th>Price</th>
            <th>SGST + CGST</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
              <td>{item.description}</td>
              <td>{item.hsn}</td>
              <td>{item.batch}</td>
              <td>{item.exp}</td>
              <td>{item.qty}</td>
              <td>{item.price.toFixed(2)}</td>
              <td>{(item.cgst + item.sgst).toFixed(2)}</td>
              <td>{item.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="gst-summary-section">
        <table className="gst-summary-table">
          <thead>
            <tr>
              <th>GST %</th>
              <th>Price</th>
              <th>CGST</th>
              <th>SGST</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>6.00+6.00</td>
              <td>{totalPrice.toFixed(2)}</td>
              <td>{(totalGST / 2).toFixed(2)}</td>
              <td>{(totalGST / 2).toFixed(2)}</td>
              <td>{(totalPrice + totalGST).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <div className="totals-box">
          <p><strong>Total Value:</strong> ₹{totalPrice.toFixed(2)}</p>
          <p><strong>Total GST:</strong> ₹{totalGST.toFixed(2)}</p>
          <p><strong>Round Off:</strong> ₹{(grandTotal - (totalPrice + totalGST)).toFixed(2)}</p>
          <p className="grand-total"><strong>Grand Total:</strong> ₹{grandTotal.toFixed(2)}</p>
        </div>
      </div>

      <p className="amount-in-words">{amountInWords} Rupees Only</p>

      <div className="signature-section">
        <div>
          RATHIKA<br /><small>Billed By</small>
        </div>
        <div>
          RATHIKA25<br /><small>Prepared By</small>
        </div>
        <div>
          RATHIKA25<br /><small>Packed By</small>
        </div>
        <div>
          SATHISH<br /><small>Qualified Pharmacist</small><br />
          <img src="/path/to/signature.png"  style={{ height: '30px', marginTop: '4px' }} />
          <div><small>Delivered By</small></div>
        </div>
      </div>

      <div className="gstin" style={{ borderTop: '1px solid #000', paddingTop: '8px', marginTop: '16px' }}>
        <div><strong>D.L. No.:</strong> CBP/39320/21, CBP561/20F</div>
        <div><strong>GSTIN/UIN:</strong> 33AAACK4912L1ZS</div>
      </div>

      <div className="page-number" style={{ color: '#007bff', fontWeight: 'bold', marginTop: '8px' }}>
        Don’t Stop Medication Without Doctor’s Advice
      </div>
    </div>
  );
};

export default Bill;