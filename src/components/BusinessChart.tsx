/*
  Gọi API ở dòng 42
*/

"use client";

import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { ChartData, ChartOptions } from "chart.js";
import {
  formatDateToString,
  formatDateToTimeString,
  formatDateToVietnameseFormat,
  formatDateToYYYYMMDD,
} from "@/utils/timeUtils";

const sampleRevenuePerDate = [
  { date: new Date("12-03-2024"), revenue: 1000000 },
  { date: new Date("12-04-2024"), revenue: 4000000 },
  { date: new Date("12-05-2024"), revenue: 1000000 },
  { date: new Date("12-06-2024"), revenue: 400000 },
  { date: new Date("12-07-2024"), revenue: 8000000 },
];

const sampleRevenuePerHours = [
  { hour: new Date("12-03-2024 08:00"), revenue: 4000000 },
  { hour: new Date("12-03-2024 09:00"), revenue: 3000000 },
  { hour: new Date("12-03-2024 10:00"), revenue: 7000000 },
  { hour: new Date("12-03-2024 11:00"), revenue: 500000 },
  { hour: new Date("12-03-2024 12:00"), revenue: 800000 },
  { hour: new Date("12-03-2024 13:00"), revenue: 1000000 },
  { hour: new Date("12-03-2024 14:00"), revenue: 4000000 },
  { hour: new Date("12-03-2024 15:00"), revenue: 1000000 },
];

export function BusinessChart() {
  const [selectedMode, setSelectedMode] = useState("daily");
  const [revenuePerDate, setRevenuePerDate] = useState(sampleRevenuePerDate);
  const [revenuePerHours, setRevenuePerHours] = useState(sampleRevenuePerHours);

  useEffect(() => {
    /* Gọi API **/
    const endTime = new Date();
    const startDate = new Date(new Date().setDate(endTime.getDate() - 4));
    const queryForDate = `start_date=${formatDateToYYYYMMDD(
      startDate
    )}&end_date=${formatDateToYYYYMMDD(endTime)}`;
    // const data = await getStatisticByRevenueAndDate(queryForDate);
    // setRevenuePerDate(data.map((item) => ({ date: new Date(item.date), revenue: item.revenue })));

    const startTime = new Date(new Date().setDate(endTime.getHours() - 7));
    const queryForHours = `start_date=${formatDateToString(
      startTime
    )}&end_date=${formatDateToString(endTime)}`;
    // const data = await getStatisticByRevenueAndHour(queryForHours);
    // setRevenuePerHours(data.map((item) => ({ hour: new Date(item.hour), revenue: item.revenue }));
  }, []);

  const dataPerDate: ChartData<"line"> = {
    labels: revenuePerDate.map((data) =>
      formatDateToVietnameseFormat(data.date)
    ),
    datasets: [
      {
        label: "",
        data: revenuePerDate.map((data) => data.revenue),
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

  const dataPerHours: ChartData<"line"> = {
    labels: revenuePerHours.map((data) => formatDateToTimeString(data.hour)),
    datasets: [
      {
        label: "",
        data: revenuePerHours.map((data) => data.revenue),
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

  const options: ChartOptions<"line"> = {
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
            return `₫${(tooltipItem.raw as number).toFixed(0)}`;
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
            if (typeof value === "number" && value >= 1000000) {
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
              selectedMode == "daily"
                ? "text-[#fafafa] bg-[#2b2b2b] shadow-sm"
                : ""
            }`}
            onClick={() => setSelectedMode("daily")}
          >
            Theo ngày
          </button>
          <button
            className={`basis-1/2 rounded-md transition-all duration-500 ${
              selectedMode == "hourly"
                ? "text-[#fafafa] bg-[#2b2b2b] shadow-sm"
                : ""
            }`}
            onClick={() => setSelectedMode("hourly")}
          >
            Theo giờ
          </button>
        </div>
      </div>
      {selectedMode === "daily" ? (
        <div>
          <Line data={dataPerDate} options={options} />
        </div>
      ) : (
        <div>
          <Line data={dataPerHours} options={options} />
        </div>
      )}
    </section>
  );
}
