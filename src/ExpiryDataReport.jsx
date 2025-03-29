import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Card, CardContent, Typography, Box, TextField, Button } from "@mui/material";

const ExpiryDataReport = () => {
    const [expiryData, setExpiryData] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(false);

    const baseUrl = "http://127.0.0.1:5000/api/expiry-status";

    // Fetch filtered expiry data
    const fetchExpiryData = () => {
        if (!startDate || !endDate) {
            alert("Please select both start and end dates.");
            return;
        }

        setLoading(true);
        fetch(`${baseUrl}?startDate=${startDate}&endDate=${endDate}`)
            .then((res) => res.json())
            .then((data) => setExpiryData(data))
            .catch((error) => console.error("API Fetch Error:", error))
            .finally(() => setLoading(false));
    };

    return (
        <Card sx={{ padding: 3, margin: "20px auto", maxWidth: 900}}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Medicine Expiry Report
                </Typography>

                {/* Date Inputs */}
                <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
                    <TextField
                        label="Start Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="End Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        fullWidth
                    />
                    <Button variant="contained" color="primary" onClick={fetchExpiryData}>
                        Generate Report
                    </Button>
                </Box>

                {/* Bar Chart */}
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {loading ? (
                        <Typography>Loading...</Typography>
                    ) : expiryData.length > 0 ? (
                        <BarChart width={600} height={400} data={expiryData} barSize={40}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="medicineName" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="quantity" fill="#ff5722" />
                        </BarChart>
                    ) : (
                        <Typography>No expiry data available</Typography>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default ExpiryDataReport;
