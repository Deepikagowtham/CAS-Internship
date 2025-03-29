import React, { useState, useEffect } from "react";
import { TextField, Box, CircularProgress } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const SupplierPerformanceReport = ({ supplierPerformance }) => {
    const [filteredSupplierData, setFilteredSupplierData] = useState(supplierPerformance);
    const [supplierName, setSupplierName] = useState("");
    const [loading, setLoading] = useState(false);

    const baseUrl = "http://127.0.0.1:5000";

    useEffect(() => {
        if (supplierName) {
            setLoading(true);
            fetch(`${baseUrl}/api/supplier-performance?supplier=${supplierName}`)
                .then(res => res.json())
                .then(data => {
                    console.log("API Response:", data);  // Debugging Log
                    setFilteredSupplierData(data);
                })
                .catch(error => console.error("Error fetching supplier data:", error))
                .finally(() => setLoading(false));
        } else {
            setFilteredSupplierData(supplierPerformance);
        }
    }, [supplierName, supplierPerformance]);

    return (
        <Box>
            <TextField
                label="Filter by Supplier Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
            />

            {loading ? (
                <CircularProgress sx={{ display: "block", margin: "auto" }} />
            ) : (
                <ResponsiveContainer width={600} height={400}>
                    <BarChart data={filteredSupplierData}>
                        <XAxis dataKey="supplierDetails" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="purchaseCost" fill="#4caf50" />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </Box>
    );
};

export default SupplierPerformanceReport;
