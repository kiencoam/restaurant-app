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
import {
  getStatisticByRevenueAndDate,
  getStatisticByRevenueAndHour,
} from "@/app/api-client/StatisticService";

const sampleRevenuePerDate = [
  { date: "12-03-2024", revenue: 1000000 },
  { date: "12-04-2024", revenue: 4000000 },
  { date: "12-05-2024", revenue: 1000000 },
  { date: "12-06-2024", revenue: 400000 },
  { date: "12-07-2024", revenue: 8000000 },
];

const sampleRevenuePerHours = [
  { hour: 0, revenue: 400000 },
  { hour: 1, revenue: 300000 },
  { hour: 2, revenue: 700000 },
  { hour: 3, revenue: 500000 },
  { hour: 4, revenue: 800000 },
  { hour: 5, revenue: 100000 },
  { hour: 6, revenue: 400000 },
  { hour: 7, revenue: 100000 },
  { hour: 8, revenue: 100000 },
  { hour: 9, revenue: 400000 },
  { hour: 10, revenue: 8000000 },
  { hour: 11, revenue: 4000000 },
  { hour: 12, revenue: 1000000 },
  { hour: 13, revenue: 1000000 },
  { hour: 14, revenue: 4000000 },
  { hour: 15, revenue: 8000000 },
  { hour: 16, revenue: 4000000 },
  { hour: 17, revenue: 1000000 },
  { hour: 18, revenue: 1000000 },
  { hour: 19, revenue: 4000000 },
  { hour: 20, revenue: 8000000 },
  { hour: 21, revenue: 4000000 },
  { hour: 22, revenue: 1000000 },
  { hour: 23, revenue: 1000000 },
];

export function BusinessChart() {
  const [selectedMode, setSelectedMode] = useState("daily");
  const [revenuePerDate, setRevenuePerDate] = useState<
    { date: string; revenue: number }[]
  >([]);
  const [revenuePerHours, setRevenuePerHours] = useState<
    { hour: number; revenue: number }[]
  >([]);

  useEffect(() => {
    const endTime = new Date();
    const startDate = new Date(new Date().setDate(endTime.getDate() - 4));
    const queryForDate = `start_date=${formatDateToYYYYMMDD(
      startDate
    )}&end_date=${formatDateToYYYYMMDD(endTime)}`;
    try {
      getStatisticByRevenueAndDate(queryForDate).then((dateData) => {
        setRevenuePerDate(dateData.revenueStatistics);
      });
    } catch (error) {
      console.error("Error fetching revenue by date:", error);
    }

    const queryForTime = `start_date=${formatDateToYYYYMMDD(
      endTime
    )}&end_date=${formatDateToYYYYMMDD(endTime)}`;
    try {
      getStatisticByRevenueAndHour(queryForTime).then((hourData) => {
        setRevenuePerHours(
          hourData.revenueStatistics
            .filter((item) => item.hour <= new Date().getHours())
            .slice(-8)
        );
      });
    } catch (error) {
      console.error("Error fetching revenue by hours:", error);
    }
  }, []);

  const dataPerDate: ChartData<"line"> = {
    labels: revenuePerDate.map((data) =>
      formatDateToVietnameseFormat(new Date(data.date))
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
    labels: revenuePerHours.map((data) => `${data.hour}h`),
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
