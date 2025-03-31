import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const SalesStockReport = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const baseUrl = "http://127.0.0.1:5000"; 

    useEffect(() => {
        setLoading(true);
        fetch(`${baseUrl}/api/sales-stock-analysis`)
            .then(res => res.json())
            .then(fetchedData => {
                console.log("Fetched Data:", fetchedData); // Debugging
                setData(fetchedData);
            })
            .catch(error => console.error("Error fetching sales-stock data:", error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <CircularProgress sx={{ display: "block", margin: "auto" }} />;
    if (!data || !Array.isArray(data) || data.length === 0) return <p>No data available</p>;

    return (
        <Box>
            <ResponsiveContainer width={700} height={400}>
                <BarChart 
                    data={data} 
                    layout="vertical" 
                    margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
                >
                    <XAxis type="number" />
                    <YAxis dataKey="Medicine Name" type="category" width={150} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Stock Remaining" fill="#3f51b5" name="Stock Remaining" barSize={30} />
                    <Bar dataKey="Sales" fill="#ff5252" name="Sales" barSize={30} />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default SalesStockReport;
