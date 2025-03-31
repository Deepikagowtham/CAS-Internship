import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import "./StockMovement.css"; // ✅ Make sure CSS is imported

const StockMovement = () => {
    const [fastMoving, setFastMoving] = useState([]);
    const [nonMoving, setNonMoving] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/api/stock-movement")
            .then((response) => {
                setFastMoving(response.data.fastMovingStock);
                setNonMoving(response.data.nonMovingStock);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    // ✅ Data for Pie Chart (Sales Distribution)
    const pieChartData = {
        labels: ["Fast Moving", "Non-Moving"],
        datasets: [
            {
                data: [fastMoving.length, nonMoving.length],
                backgroundColor: ["#3498db", "#e74c3c"],
            },
        ],
    };

    // ✅ Data for Fast-Moving Bar Chart
    const fastMovingBarData = {
        labels: fastMoving.map((item) => item["Medicine Name"]),
        datasets: [
            {
                label: "Fast-Moving Sales",
                data: fastMoving.map((item) => item.Sales),
                backgroundColor: "#2ecc71",
            },
        ],
    };

    // ✅ Data for Non-Moving Bar Chart
    const nonMovingBarData = {
        labels: nonMoving.map((item) => item["Medicine Name"]),
        datasets: [
            {
                label: "Non-Moving Sales",
                data: nonMoving.map(() => 0),
                backgroundColor: "#e74c3c",
            },
        ],
    };

    return (
        <div className="stock-movement-container">
            <h2 className="stock-movement-title">Stock Movement Analysis</h2>

            {/* ✅ Horizontal Layout */}
            <div className="chart-container">
                {/* Pie Chart */}
                <div className="chart-box">
                    <h3 className="chart-title">Sales Distribution</h3>
                    <Pie data={pieChartData} />
                </div>

                {/* Fast-Moving Medicines */}
                <div className="chart-box">
                    <h3 className="chart-title">Fast-Moving Medicines</h3>
                    <Bar data={fastMovingBarData} />
                </div>

                {/* Non-Moving Medicines */}
                <div className="chart-box">
                    <h3 className="chart-title">Non-Moving Medicines</h3>
                    <Bar data={nonMovingBarData} />
                </div>
            </div>
        </div>
    );
};

export default StockMovement;
