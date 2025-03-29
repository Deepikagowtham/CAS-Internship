import React, { useState, useEffect } from "react";
import { TextField, Box, CircularProgress } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const StockDataReport = ({ stockData }) => {
    const [filteredStockData, setFilteredStockData] = useState(stockData);
    const [medicineName, setMedicineName] = useState("");
    const [loading, setLoading] = useState(false);

    const baseUrl = "http://127.0.0.1:5000"; 

    useEffect(() => {
        if (medicineName) {
            setLoading(true);
            fetch(`${baseUrl}/api/stock-levels?medicineName=${medicineName}`)
                .then(res => res.json())
                .then(data => setFilteredStockData(data))
                .catch(error => console.error("Error fetching stock data:", error))
                .finally(() => setLoading(false));
        } else {
            setFilteredStockData(stockData);
        }
    }, [medicineName, stockData]);

    return (
        <Box>
            <TextField
                label="Filter by Medicine Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={medicineName}
                onChange={(e) => setMedicineName(e.target.value)}
            />

            {loading ? (
                <CircularProgress sx={{ display: "block", margin: "auto" }} />
            ) : (
                <ResponsiveContainer width={600} height={400}>
                    <BarChart data={filteredStockData}>
                        <XAxis dataKey="medicineName" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="quantity" fill="#3f51b5" />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </Box>
    );
};

export default StockDataReport;
