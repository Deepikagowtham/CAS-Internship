import React, { useState, useEffect } from "react";
import {
    Container, Typography, Drawer, List, ListItem, ListItemText, Box, CircularProgress, Paper
} from "@mui/material";
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";
import { Fade } from "@mui/material"; // Smooth animation
import ExpiryDataReport from "./ExpiryDataReport"; // Import the new component
import StockDataReport from "./StockDataReport";
import SupplierPerformanceReport from "./SupplierPerformanceReport";
import SalesStockReport from "./SalesStockReport"; // New Sales vs Stock component

const InventoryReport = () => {
    const [selectedCategory, setSelectedCategory] = useState("Stock Data");

    // Data states
    const [stockData, setStockData] = useState([]);
    const [expiryData, setExpiryData] = useState([]);
    const [supplierPerformance, setSupplierPerformance] = useState([]);
    const [salesStockData, setSalesStockData] = useState([]);
    const [returnDamageData, setReturnDamageData] = useState([]);

    const [loading, setLoading] = useState(true);

    const baseUrl = "http://127.0.0.1:5000"; // Backend API URL

    // Fetch API Data
    useEffect(() => {
        setLoading(true);

        Promise.all([
            fetch(`${baseUrl}/api/stock-levels`).then(res => res.json()),
            fetch(`${baseUrl}/api/expiry-status`).then(res => res.json()),
            fetch(`${baseUrl}/api/supplier-performance`).then(res => res.json()),
            fetch(`${baseUrl}/api/sales-stock-analysis`).then(res => res.json()),
            fetch(`${baseUrl}/api/return-damage`).then(res => res.json()),
        ])
        .then(([stock, expiry, supplier, sales, returns]) => {
            setStockData(stock);
            setExpiryData(expiry);
            setSupplierPerformance(supplier);
            setSalesStockData(sales);
            setReturnDamageData(returns);
        })
        .catch(error => console.error("API Fetch Error:", error))
        .finally(() => setLoading(false));
    }, []);

    // Handle Sidebar Selection
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    // Sidebar Menu Options
    const menuItems = [
        "Stock Data",
        "Expiry Data",
        "Supplier Performance",
        "Sales vs Stock Analysis",
        "Return & Damage Data"
    ];

    return (
        
        <Box sx={{ display: "flex", background: "#f8f9fa", height: "100vh" }}>
            {/* Sidebar */}
            <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
                <Box sx={{ width: 240, padding: 2, background: "#007bff", color: "white", height: "100vh" }}>
                    <Typography variant="h6" align="center" gutterBottom>
                        Inventory Report
                    </Typography>
                    <List>
                        {menuItems.map((text) => (
                            <ListItem
                                component="button"
                                key={text}
                                onClick={() => handleCategoryChange(text)}
                                sx={{
                                    background: selectedCategory === text ? "#0056b3" : "transparent",
                                    color: "white",
                                    borderRadius: "5px",
                                    margin: "5px 0",
                                    transition: "background 0.3s ease-in-out"
                                }}
                            >
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>

            {/* Main Content */}
            <Container sx={{ marginLeft: "400px", padding: "20px", marginRight: "600px" }}>
                <Typography variant="h4" gutterBottom>{selectedCategory}</Typography>

                {/* Reports */}
                <Paper sx={{ padding: 2, background: "#fff", boxShadow: "0px 4px 8px rgba(0,0,0,0.1)" }}>
                    {loading ? (
                        <CircularProgress sx={{ display: "block", margin: "auto" }} />
                    ) : (
                        <Fade in={!loading}>
                            <Box>
                                {/* Stock Data - Bar Chart */}
                                {selectedCategory === "Stock Data" && stockData.length > 0 && (
                                    <StockDataReport stockData={stockData} />
                                )}

                                {/* Expiry Data - Line Chart */}
                                {selectedCategory === "Expiry Data" && expiryData.length > 0 && (
                                    <ExpiryDataReport expiryData={expiryData} />
                                )}

                                {/* Supplier Performance - Bar Chart */}
                                {selectedCategory === "Supplier Performance" && supplierPerformance.length > 0 && (
                                    <SupplierPerformanceReport supplierPerformance={supplierPerformance} />
                                )}

                                {/* Supplier Performance - Bar Chart */}
                                {selectedCategory === "Sales vs Stock Analysis" && salesStockData.length > 0 && (
                                    <SalesStockReport salesStockData={salesStockData} />
                                )}

                                {/* Return & Damage - Bar Chart */}
                                {selectedCategory === "Return & Damage Data" && returnDamageData.length > 0 && (
                                    <ResponsiveContainer width={600} height={400}>
                                        <BarChart data={returnDamageData}>
                                            <XAxis dataKey="reason" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="medicineName" fill="#d32f2f" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                )}
                            </Box>
                        </Fade>
                    )}
                </Paper>
            </Container>
        </Box>
    );
};

export default InventoryReport;
