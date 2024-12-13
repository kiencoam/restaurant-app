/*
  Gọi API ở dòng 46
*/

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
import { CustomerStatisticPerDate, CustomerStatisticPerHour, getStatisticByCustomerAndDate, getStatisticByCustomerAndHour } from "@/app/api-client/StatisticService";

// const sampleCustomerPerDate = [
//   { date: new Date("12-04-2024"), count: 40 },
//   { date: new Date("12-03-2024"), count: 10 },
//   { date: new Date("12-05-2024"), count: 10 },
//   { date: new Date("12-06-2024"), count: 40 },
//   { date: new Date("12-07-2024"), count: 80 },
// ];

// const sampleCustomersPerHours = [
//   { hour: new Date("12-03-2024 08:00"), count: 40 },
//   { hour: new Date("12-03-2024 09:00"), count: 30 },
//   { hour: new Date("12-03-2024 10:00"), count: 70 },
//   { hour: new Date("12-03-2024 11:00"), count: 50 },
//   { hour: new Date("12-03-2024 12:00"), count: 80 },
//   { hour: new Date("12-03-2024 13:00"), count: 10 },
//   { hour: new Date("12-03-2024 14:00"), count: 40 },
//   { hour: new Date("12-03-2024 15:00"), count: 10 },
// ];

export function CustomerChart() {
  const [selectedMode, setSelectedMode] = useState("daily");
  const [customersPerDate, setCustomersPerDate] = useState<CustomerStatisticPerDate[]>([]);
  const [customersPerHours, setCustomersPerHours] = useState<CustomerStatisticPerHour[]>([]);

  useEffect(() => {
    const fetchCustomerData = async () => {
      const endDate = new Date();
      const endDateFormatted = formatDateToYYYYMMDD(endDate);

      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 4);
      const startDateFormatted = formatDateToYYYYMMDD(startDate);

      const queryForDate = `start_date=${startDateFormatted}&end_date=${endDateFormatted}`;
      console.log("customer queryForDate", queryForDate)
      try {
        getStatisticByCustomerAndDate(queryForDate).then((res) => {
          setCustomersPerDate(
            res.customerStatistics.map((item) => ({
              date: item.date,
              count: item.count,
            }))
          );
        });
      } catch (error) {
        console.error("Error fetching customer data by date:", error);
      }

      // Lấy dữ liệu số lượng khách hàng theo giờ
      const endTime = new Date();
      const endTimeFormatted = formatDateToYYYYMMDD(endTime);

      const startTime = new Date();
      startTime.setHours(endTime.getHours() - 7); // Dùng `setHours` thay vì `setDate`
      const startTimeFormatted = formatDateToYYYYMMDD(startTime);

      const queryForTime = `start_date=${startTimeFormatted}&end_date=${endTimeFormatted}`;
      console.log("customer queryForTime", queryForTime)
      try {
        getStatisticByCustomerAndHour(queryForTime).then((res) => {
          setCustomersPerHours(
            res.customerStatistics.map((item) => ({
              hour: item.hour,
              count: item.count,
            }))
          );
        });

      } catch (error) {
        console.error("Error fetching customer data by time:", error);
      }
    };

    fetchCustomerData();
  }, []);



  const dataPerDate: ChartData<"bar"> = {
    labels: customersPerDate.map((data) =>
      formatDateToVietnameseFormat(data.date)
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
    labels: customersPerHours.map((data) => formatDateToTimeString(data.hour)),
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
            className={`basis-1/2 rounded-md transition-all duration-500 ${selectedMode == "daily"
              ? "text-[#fafafa] bg-[#2b2b2b] shadow-sm"
              : ""
              }`}
            onClick={() => setSelectedMode("daily")}
          >
            Theo ngày
          </button>
          <button
            className={`basis-1/2 rounded-md transition-all duration-500 ${selectedMode == "hourly"
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
