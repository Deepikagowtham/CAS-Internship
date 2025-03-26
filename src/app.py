from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)  # Allow requests from React frontend

# Load stock and deleted stock datasets
stock_df = pd.read_csv("stock_data.csv")
deleted_df = pd.read_csv("deleted_stock_data.csv")

# ✅ Stock Levels Report (Filtered by Medicine Name)
@app.route("/api/stock-levels", methods=["GET"])
def stock_levels():
    medicine_name = request.args.get("medicineName", "").lower()
    report = stock_df.groupby("medicineName")["quantity"].sum().reset_index()
    
    if medicine_name:
        report = report[report["medicineName"].str.lower().str.contains(medicine_name)]
    
    return jsonify(report.to_dict(orient="records"))

# ✅ Expiry Status Report (Filtered by Date Range)
@app.route("/api/expiry-status", methods=["GET"])
def expiry_status():
    stock_df["expiryDate"] = pd.to_datetime(stock_df["expiryDate"], errors='coerce')  # Handle invalid dates
    print("Expiry Data BEFORE Filtering:", stock_df[["medicineName", "expiryDate"]])  # Debugging line

    start_date = request.args.get("startDate")
    end_date = request.args.get("endDate")

    expiry_report = stock_df[stock_df["expiryDate"] < pd.Timestamp.now() + pd.DateOffset(months=2)]
    
    if start_date and end_date:
        start_date, end_date = pd.to_datetime(start_date), pd.to_datetime(end_date)
        expiry_report = expiry_report[(expiry_report["expiryDate"] >= start_date) & (expiry_report["expiryDate"] <= end_date)]

    print("Expiry Data AFTER Filtering:", expiry_report)  # Debugging line
    return jsonify(expiry_report.to_dict(orient="records"))

# ✅ Supplier Performance Report (Filtered by Supplier)
@app.route("/api/supplier-performance", methods=["GET"])
def supplier_performance():
    supplier = request.args.get("supplier", "").lower()
    
    print("Supplier Details BEFORE Grouping:", stock_df[["supplierDetails", "purchaseCost"]])  # Debugging line

    report = stock_df.groupby("supplierDetails", dropna=True)["purchaseCost"].mean().reset_index()

    if supplier:
        report = report[report["supplierDetails"].str.lower().str.contains(supplier, na=False)]

    print("Supplier Data AFTER Filtering:", report)  # Debugging line
    return jsonify(report.to_dict(orient="records"))


# ✅ Sales vs. Stock Analysis
@app.route("/api/sales-stock-analysis", methods=["GET"])
def sales_vs_stock():
    sales_data = {"Paracetamol": 500, "Cough Syrup": 200}  # Dummy Sales Data
    stock_df["sales"] = stock_df["medicineName"].map(sales_data).fillna(0)
    stock_df["remaining_stock"] = stock_df["quantity"] - stock_df["sales"]
    report = stock_df[["medicineName", "quantity", "sales", "remaining_stock"]]
    return jsonify(report.to_dict(orient="records"))

# ✅ Return & Damage Report
@app.route("/api/return-damage", methods=["GET"])
def return_damage():
    report = deleted_df.groupby("reason")["medicineName"].count().reset_index()
    return jsonify(report.to_dict(orient="records"))

if __name__ == "__main__":
    app.run(debug=True)
