"use client";

import { Bar } from "react-chartjs-2";
import { useState } from "react";

const customersCount = [
  { name: "Mon", numberOfCustomers: 10 },
  { name: "Tue", numberOfCustomers: 60 },
  { name: "Wed", numberOfCustomers: 20 },
  { name: "Thu", numberOfCustomers: 35 },
  { name: "Fri", numberOfCustomers: 60 },
  { name: "Sar", numberOfCustomers: 30 },
  { name: "Sun", numberOfCustomers: 40 },
];

export function CustomerChart() {
  const [selectedMode, setSelectedMode] = useState("weekly");

  const data = {
    labels: customersCount.map((item) => item.name),
    datasets: [
      {
        label: "Reservations",
        data: customersCount.map((item) => item.numberOfCustomers), // Reservations for each day
        backgroundColor: "rgba(34, 102, 90, 1)", // Dark green for filled part
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false,
        text: "Reservations Per Day",
      },
      legend: {
        display: false, // Hide legend to avoid duplication
      },
      tooltip: {
        backgroundColor: "#ffffff",
        titleColor: "#000",
        bodyColor: "#45474B",
        titleAlign: "center",
        bodyAlign: "center",
        cornerRadius: 10,
        displayColors: false,
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.raw.toFixed(0)}`;
          },
        },
      },
    },
    scales: {
      x: {
        border: {
          display: false, // Remove x-axis border/edge
        },
        grid: {
          display: false, // Remove vertical grid lines
        },
        ticks: {
          color: "#808080", // Purple Y-axis label color
          font: {
            size: 14, // Adjust font size for Y-axis
            family: "Nunito", // Custom font for Y-axis labels
          },
        },
      },
      y: {
        border: {
          display: false, // Remove x-axis border/edge
        },
        beginAtZero: true,
        grid: {
          color: "rgba(200, 200, 200, 0.3)", // Lighter color for horizontal lines
        },
        ticks: {
          color: "#808080", // Purple Y-axis label color
          font: {
            size: 14, // Adjust font size for Y-axis
            family: "Nunito", // Custom font for Y-axis labels
          },
        },
      },
    },
  };

  return (
    <section className="bg-white p-4 shadow-sm mr-3">
      <div className="flex justify-between items-center h-10 mb-4">
        <div className="font-extrabold text-xl">Số lượng khách hàng</div>
        <div className="flex m-3 h-10 w-48 text-[#898a84] text-sm bg-[#f7f7f7] font-semibold rounded-md p-1 gap-2">
          <button
            className={`basis-1/2 rounded-md transition-all duration-500 ${
              selectedMode == "weekly"
                ? "text-[#fafafa] bg-[#2b2b2b] shadow-sm"
                : ""
            }`}
            onClick={() => setSelectedMode("weekly")}
          >
            Weekly
          </button>
          <button
            className={`basis-1/2 rounded-md transition-all duration-500 ${
              selectedMode == "monthly"
                ? "text-[#fafafa] bg-[#2b2b2b] shadow-sm"
                : ""
            }`}
            onClick={() => setSelectedMode("monthly")}
          >
            Monthly
          </button>
        </div>
      </div>
      <div>
        <Bar data={data} options={options} />
      </div>
    </section>
  );
}
