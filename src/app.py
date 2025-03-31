from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app)  # Allow React frontend requests

# ✅ Load datasets with error handling
try:
    # Stock Data
    if os.path.exists("stock_data.csv"):
        stock_df = pd.read_csv("stock_data.csv")
    else:
        stock_df = pd.DataFrame(columns=["medicineName", "batchNumber", "expiryDate", "quantity", "category", "supplierDetails", "purchaseCost"])
    
    # Deleted Stock Data
    if os.path.exists("deleted_stock_data.csv"):
        deleted_df = pd.read_csv("deleted_stock_data.csv")
    else:
        deleted_df = pd.DataFrame(columns=["medicineName", "reason"])

    # Medicine Stock Data (NEW CSV FILE)
    if os.path.exists("medicine_stock.csv"):
        medicine_stock_df = pd.read_csv("medicine_stock.csv")
    else:
        medicine_stock_df = pd.DataFrame(columns=["Medicine Name", "Batch Number", "Manufacture Date", "Expiry Date", "Purchase Date", "Sales", "Stock Remaining", "Category", "Supplier Details", "Purchase Cost"])

except Exception as e:
    print("Error loading CSV files:", e)
    stock_df = pd.DataFrame(columns=["medicineName", "batchNumber", "expiryDate", "quantity", "category", "supplierDetails", "purchaseCost"])
    deleted_df = pd.DataFrame(columns=["medicineName", "reason"])
    medicine_stock_df = pd.DataFrame(columns=["Medicine Name", "Batch Number", "Manufacture Date", "Expiry Date", "Purchase Date", "Sales", "Stock Remaining", "Category", "Supplier Details", "Purchase Cost"])


# ✅ Stock Levels Report (Filtered by Medicine Name)
@app.route("/api/stock-levels", methods=["GET"])
def stock_levels():
    try:
        medicine_name = request.args.get("medicineName", "").lower()
        
        if stock_df.empty:
            return jsonify({"error": "Stock data not available"}), 500

        report = stock_df.groupby("medicineName")["quantity"].sum().reset_index()

        if medicine_name:
            report = report[report["medicineName"].str.lower().str.contains(medicine_name, na=False)]

        return jsonify(report.to_dict(orient="records"))

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ✅ Expiry Status Report (Filtered by Date Range)
@app.route("/api/expiry-status", methods=["GET"])
def expiry_status():
    try:
        if "expiryDate" not in stock_df.columns or stock_df.empty:
            return jsonify({"error": "Expiry date data not available"}), 500

        stock_df["expiryDate"] = pd.to_datetime(stock_df["expiryDate"], errors='coerce')

        start_date = request.args.get("startDate")
        end_date = request.args.get("endDate")

        expiry_report = stock_df[stock_df["expiryDate"] < pd.Timestamp.now() + pd.DateOffset(months=2)]

        if start_date and end_date:
            start_date, end_date = pd.to_datetime(start_date), pd.to_datetime(end_date)
            expiry_report = expiry_report[(expiry_report["expiryDate"] >= start_date) & (expiry_report["expiryDate"] <= end_date)]

        return jsonify(expiry_report.to_dict(orient="records"))

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ✅ Supplier Performance Report (Filtered by Supplier)
@app.route("/api/supplier-performance", methods=["GET"])
def supplier_performance():
    try:
        if "supplierDetails" not in stock_df.columns or stock_df.empty:
            return jsonify({"error": "Supplier data not available"}), 500

        supplier = request.args.get("supplier", "").lower()
        report = stock_df.groupby("supplierDetails", dropna=True)["purchaseCost"].mean().reset_index()

        if supplier:
            report = report[report["supplierDetails"].str.lower().str.contains(supplier, na=False)]

        return jsonify(report.to_dict(orient="records"))

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ✅ Sales vs. Stock Analysis
@app.route("/api/sales-stock-analysis", methods=["GET"])
def sales_vs_stock():
    try:
        if medicine_stock_df.empty:
            return jsonify({"error": "Medicine stock data not available"}), 500

        medicine_stock_df["Sales"] = pd.to_numeric(medicine_stock_df["Sales"], errors="coerce").fillna(0)
        medicine_stock_df["Stock Remaining"] = pd.to_numeric(medicine_stock_df["Stock Remaining"], errors="coerce").fillna(0)

        report = medicine_stock_df[["Medicine Name", "Sales", "Stock Remaining"]]

        return jsonify(report.to_dict(orient="records"))

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ✅ Return & Damage Report
@app.route("/api/return-damage", methods=["GET"])
def return_damage():
    try:
        if deleted_df.empty:
            return jsonify({"error": "Return & damage data not available"}), 500

        report = deleted_df.groupby("reason")["medicineName"].count().reset_index()

        return jsonify(report.to_dict(orient="records"))

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ✅ Stock Movement Report (Using New `medicine_stock.csv`)
@app.route("/api/stock-movement", methods=["GET"])
def stock_movement_report():
    try:
        if medicine_stock_df.empty:
            return jsonify({"error": "Stock movement data not available"}), 500

        # Convert Expiry Date and Purchase Date columns to datetime
        medicine_stock_df["Expiry Date"] = pd.to_datetime(medicine_stock_df["Expiry Date"], errors='coerce')
        medicine_stock_df["Purchase Date"] = pd.to_datetime(medicine_stock_df["Purchase Date"], errors='coerce')

        # Define fast-moving and non-moving criteria
        fast_moving = medicine_stock_df[medicine_stock_df["Sales"] > 50]  # Example: Sales > 50
        non_moving = medicine_stock_df[medicine_stock_df["Sales"] == 0]  # Example: No Sales

        return jsonify({
            "fastMovingStock": fast_moving.to_dict(orient="records"),
            "nonMovingStock": non_moving.to_dict(orient="records")
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
 

if __name__ == "__main__":
    app.run(debug=True)
