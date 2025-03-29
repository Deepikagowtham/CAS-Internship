import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const SalesStockReport = ({ salesStockData }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(salesStockData);

    const baseUrl = "http://127.0.0.1:5000"; 

    useEffect(() => {
        setLoading(true);
        fetch(`${baseUrl}/api/sales-stock-analysis`)
            .then(res => res.json())
            .then(data => setData(data))
            .catch(error => console.error("Error fetching sales-stock data:", error))
            .finally(() => setLoading(false));
    }, [salesStockData]);

    return (
        <Box>
            {loading ? (
                <CircularProgress sx={{ display: "block", margin: "auto" }} />
            ) : (
                <ResponsiveContainer width={600} height={400}>
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="medicineName" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {/* Two bars: one for quantity and one for sales */}
                        <Bar dataKey="quantity" fill="#3f51b5" name="Stock Quantity" barSize={50} />
                        <Bar dataKey="sales" fill="#ff5252" name="Sales" barSize={50} />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </Box>
    );
};

export default SalesStockReport;
