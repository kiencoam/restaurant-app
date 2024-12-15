"use client";

import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { ChartData, ChartOptions } from "chart.js";
import {
  formatDateToString,
  formatDateToTimeString,
  formatDateToVietnameseFormat,
  formatDateToYYYYMMDD,
} from "@/utils/timeUtils";
import {
  getStatisticByCustomerAndDate,
  getStatisticByCustomerAndHour,
} from "@/app/api-client/StatisticService";

const sampleCustomerPerDate = [
  { date: "12-07-2024", count: 80 },
  { date: "12-04-2024", count: 40 },
  { date: "12-03-2024", count: 10 },
  { date: "12-05-2024", count: 10 },
  { date: "12-06-2024", count: 40 },
];

const sampleCustomersPerHours = [
  { hour: 0, count: 40 },
  { hour: 1, count: 30 },
  { hour: 2, count: 70 },
  { hour: 3, count: 50 },
  { hour: 4, count: 80 },
  { hour: 5, count: 10 },
  { hour: 6, count: 40 },
  { hour: 7, count: 10 },
  { hour: 8, count: 10 },
  { hour: 9, count: 40 },
  { hour: 10, count: 80 },
  { hour: 11, count: 40 },
  { hour: 12, count: 10 },
  { hour: 13, count: 10 },
  { hour: 14, count: 40 },
  { hour: 15, count: 80 },
  { hour: 16, count: 40 },
  { hour: 17, count: 10 },
  { hour: 18, count: 10 },
  { hour: 19, count: 40 },
  { hour: 20, count: 80 },
  { hour: 21, count: 40 },
  { hour: 22, count: 10 },
  { hour: 23, count: 10 },
];

export function CustomerChart() {
  const [selectedMode, setSelectedMode] = useState("daily");
  const [customersPerDate, setCustomersPerDate] = useState<
    { date: string; count: number }[]
  >([]);
  const [customersPerHours, setCustomersPerHours] = useState<
    { hour: number; count: number }[]
  >([]);

  useEffect(() => {
    const endTime = new Date();
    const startDate = new Date(new Date().setDate(endTime.getDate() - 4));
    const queryForDate = `start_date=${formatDateToYYYYMMDD(
      startDate
    )}&end_date=${formatDateToYYYYMMDD(endTime)}`;
    try {
      getStatisticByCustomerAndDate(queryForDate).then((res) => {
        setCustomersPerDate(res.customerStatistics);
      });
    } catch (error) {
      console.error("Error fetching customer data by date:", error);
    }

    const queryForTime = `start_date=${formatDateToYYYYMMDD(
      endTime
    )}&end_date=${formatDateToYYYYMMDD(endTime)}`;

    try {
      getStatisticByCustomerAndHour(queryForTime).then((res) => {
        return setCustomersPerHours(
          res.customerStatistics
            .filter((item) => item.hour <= new Date().getHours())
            .slice(-8)
        );
      });
    } catch (error) {
      console.error("Error fetching customer data by time:", error);
    }
  }, []);

  const dataPerDate: ChartData<"bar"> = {
    labels: customersPerDate.map((data) =>
      formatDateToVietnameseFormat(new Date(data.date))
    ),
    datasets: [
      {
        label: "Reservations",
        data: customersPerDate.map((item) => item.count), // Reservations for each day
        backgroundColor: "rgba(34, 102, 90, 1)", // Dark green for filled part
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },
    ],
  };

  const dataPerHours: ChartData<"bar"> = {
    labels: customersPerHours.map((data) => `${data.hour}h`),
    datasets: [
      {
        label: "Reservations",
        data: customersPerHours.map((item) => item.count), // Reservations for each day
        backgroundColor: "rgba(34, 102, 90, 1)", // Dark green for filled part
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
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
          maxTicksLimit: 8,
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
          <Bar data={dataPerDate} options={options} />
        </div>
      ) : (
        <div>
          <Bar data={dataPerHours} options={options} />
        </div>
      )}
    </section>
  );
}
