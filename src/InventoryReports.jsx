import React, { useState, useEffect } from "react";
import {
    Container, Typography, Grid, Paper, TextField, Button,
    Drawer, List, ListItem, ListItemText, Box
} from "@mui/material";
import {
    PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const InventoryReport = () => {
    const [selectedCategory, setSelectedCategory] = useState("Stock Data");
    const [stockData, setStockData] = useState([]);
    const [expiryData, setExpiryData] = useState([]);
    const [supplierPerformance, setSupplierPerformance] = useState([]);
    const [salesStockData, setSalesStockData] = useState([]);
    const [returnDamageData, setReturnDamageData] = useState([]);

    const [medicineName, setMedicineName] = useState("");
    const [dateRange, setDateRange] = useState({ start: "", end: "" });

    // Fetch API Data
    useEffect(() => {
        fetch("/api/stock-levels")
            .then(res => res.json())
            .then(data => setStockData(data))
            .catch(error => console.error("Stock API Error:", error));

        fetch("/api/expiry-status")
            .then(res => res.json())
            .then(data => setExpiryData(data))
            .catch(error => console.error("Expiry API Error:", error));

        fetch("/api/supplier-performance")
            .then(res => res.json())
            .then(data => setSupplierPerformance(data))
            .catch(error => console.error("Supplier API Error:", error));

        fetch("/api/sales-stock-analysis")
            .then(res => res.json())
            .then(data => setSalesStockData(data))
            .catch(error => console.error("Sales API Error:", error));

        fetch("/api/return-damage")
            .then(res => res.json())
            .then(data => setReturnDamageData(data))
            .catch(error => console.error("Return API Error:", error));
    }, []);

    // Handle Sidebar Selection
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    // Filtering Function
    const handleFilter = () => {
        fetch(`/api/stock-levels?medicineName=${medicineName}&start=${dateRange.start}&end=${dateRange.end}`)
            .then(res => res.json())
            .then(data => setStockData(data))
            .catch(error => console.error("Filter API Error:", error));
    };

    // Sidebar Options
    const menuItems = [
        "Stock Data",
        "Expiry Data",
        "Supplier Performance",
        "Sales vs Stock Analysis",
        "Return & Damage Data"
    ];

    return (
        <Box sx={{ display: "flex" }}>
            {/* Sidebar */}
            <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
                <Box sx={{ width: 240, padding: 2, background: "#007bff", color: "white", height: "100vh" }}>
                    <Typography variant="h6" align="center" gutterBottom>
                        Inventory Report
                    </Typography>
                    <List>
                        {menuItems.map((text) => (
                            <ListItem
                                button
                                key={text}
                                onClick={() => handleCategoryChange(text)}
                                sx={{
                                    background: selectedCategory === text ? "#0056b3" : "transparent",
                                    color: "white",
                                    borderRadius: "5px",
                                    margin: "5px 0"
                                }}
                            >
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>

            {/* Main Content */}
            <Container sx={{ marginLeft: "260px", padding: "20px" }}>
                <Typography variant="h4" gutterBottom>{selectedCategory}</Typography>

                {/* Filters */}
                <Paper sx={{ padding: 2, marginBottom: 2 }}>
                    <Typography variant="h6">Filters</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField
                                label="Medicine Name"
                                fullWidth
                                value={medicineName}
                                onChange={(e) => setMedicineName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                label="Start Date"
                                type="date"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                value={dateRange.start}
                                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                label="End Date"
                                type="date"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                value={dateRange.end}
                                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="contained" color="primary" fullWidth onClick={handleFilter}>
                                Apply Filter
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>

                {/* Reports Based on Selection */}
                <Paper sx={{ padding: 2 }}>
                    {selectedCategory === "Stock Data" && (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={stockData}>
                                <XAxis dataKey="medicine" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="quantity" fill="#3f51b5" />
                            </BarChart>
                        </ResponsiveContainer>
                    )}

                    {selectedCategory === "Expiry Data" && (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={expiryData} dataKey="count" nameKey="status" fill="#f50057" label />
                            </PieChart>
                        </ResponsiveContainer>
                    )}

                    {selectedCategory === "Supplier Performance" && (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={supplierPerformance}>
                                <XAxis dataKey="supplier" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="rating" fill="#009688" />
                            </BarChart>
                        </ResponsiveContainer>
                    )}

                    {selectedCategory === "Sales vs Stock Analysis" && (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={salesStockData}>
                                <XAxis dataKey="medicine" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="sales" fill="#ff9800" />
                            </BarChart>
                        </ResponsiveContainer>
                    )}

                    {selectedCategory === "Return & Damage Data" && (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={returnDamageData} dataKey="count" nameKey="type" fill="#4caf50" label />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </Paper>
            </Container>
        </Box>
    );
};

export default InventoryReport;
