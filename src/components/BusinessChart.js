"use client";

import { Line } from "react-chartjs-2";
import { useState } from "react";

const revenue = [
  { name: "Mon", gain: 1000000 },
  { name: "Tue", gain: 10000000 },
  { name: "Wed", gain: 1500000 },
  { name: "Thu", gain: 3000000 },
  { name: "Fri", gain: 6000000 },
  { name: "Sar", gain: 700000 },
  { name: "Sun", gain: 2100000 },
];

export function BusinessChart() {
  const [selectedMode, setSelectedMode] = useState("weekly");

  const data = {
    labels: revenue.map((data) => data.name),
    datasets: [
      {
        label: "",
        data: revenue.map((data) => data.gain),
        borderColor: "rgb(129, 104, 157)", // Purple line color
        pointBackgroundColor: "rgb(129, 104, 157)", // Points color
        borderWidth: 2,
        fill: true, // Enable the fill under the line
        tension: 0.4, // Smoother line
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          const gradient = ctx.createLinearGradient(0, 0, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(129, 104, 157, 0.3)"); // Top gradient color
          gradient.addColorStop(1, "rgba(129, 104, 157, 0)"); // Bottom gradient (transparent)
          return gradient;
        },
        pointRadius: 3,
        pointHoverRadius: 8,
        hoverBackgroundColor: "#ffffff",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "Average Check Size (USD)",
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
            return `₫${tooltipItem.raw.toFixed(0)}`;
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
          display: false, // Remove y-axis border/edge
        },
        grid: {
          color: "rgba(200, 200, 200, 0.4)", // Dim horizontal grid lines
        },
        ticks: {
          color: "#808080", // Purple Y-axis label color
          font: {
            size: 14, // Adjust font size for Y-axis
            family: "Nunito", // Custom font for Y-axis labels
          },
          maxTicksLimit: 6,
          callback: (value) => {
            if (value >= 1000000) {
              return value / 1000000 + " tr"; // Convert values like 1000000 to 1tr
            }
            return value;
          },
        },
      },
    },
  };

  return (
    <section className="bg-white p-4 shadow-sm ml-3">
      <div className="flex justify-between items-center h-10 mb-4">
        <div className="font-extrabold text-xl">Doanh số (VND)</div>
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
        <Line data={data} options={options} />
      </div>
    </section>
  );
}
