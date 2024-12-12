/*
  Gọi API ở dòng 112
*/
"use client";

import { getStatisticByMenuItem, MenuItemStatistic } from "@/app/api-client/StatisticService";
import { formatDateToString } from "@/utils/timeUtils";
import { useState, useEffect } from "react";

const sampleMostPopularByMonth = [
  {
    menuItemId: 1,
    menuItemName: "Cá kiếm Ẽcalibur",
    quantity: 12,
    revenue: 20000000,
  },
  {
    menuItemId: 2,
    menuItemName: "Cá voi xào hành tây",
    quantity: 1,
    revenue: 2000000,
  },
  {
    menuItemId: 3,
    menuItemName: "Cá vàng bơi trong chảo mỡ",
    quantity: 10,
    revenue: 13000000,
  },
  {
    menuItemId: 4,
    menuItemName: "Anh Long",
    quantity: 1,
    revenue: 3000000,
  },
  {
    menuItemId: 5,
    menuItemName: "Cá hồi nướng",
    quantity: 15,
    revenue: 25000000,
  },
  {
    menuItemId: 6,
    menuItemName: "Cá ngừ đại dương",
    quantity: 20,
    revenue: 30000000,
  },
  {
    menuItemId: 7,
    menuItemName: "Cá trích chiên giòn",
    quantity: 8,
    revenue: 10000000,
  },
  {
    menuItemId: 8,
    menuItemName: "Cá thu kho tiêu",
    quantity: 9,
    revenue: 12000000,
  },
];

const sampleMostPopularByWeek = [
  {
    menuItemId: 5,
    menuItemName: "Cá hồi nướng",
    quantity: 15,
    revenue: 25000000,
  },
  {
    menuItemId: 6,
    menuItemName: "Cá ngừ đại dương",
    quantity: 20,
    revenue: 30000000,
  },
  {
    menuItemId: 7,
    menuItemName: "Cá trích chiên giòn",
    quantity: 8,
    revenue: 10000000,
  },
  {
    menuItemId: 8,
    menuItemName: "Cá thu kho tiêu",
    quantity: 9,
    revenue: 12000000,
  },
  {
    menuItemId: 1,
    menuItemName: "Cá kiếm Ẽcalibur",
    quantity: 12,
    revenue: 20000000,
  },
  {
    menuItemId: 2,
    menuItemName: "Cá voi xào hành tây",
    quantity: 1,
    revenue: 2000000,
  },
  {
    menuItemId: 3,
    menuItemName: "Cá vàng bơi trong chảo mỡ",
    quantity: 20,
    revenue: 13000000,
  },
  {
    menuItemId: 4,
    menuItemName: "Anh Long",
    quantity: 1,
    revenue: 3000000,
  },
];

export function PopularDish() {
  const [selectedMode, setSelectedMode] = useState("weekly");
  const [mostPopular, setMostPopular] = useState<MenuItemStatistic[]>([]);

  // Chuyển chế độ xem
  useEffect(() => {
  const fetchMostPopularItems = async () => {
    const endDate = new Date();
    const startDate = new Date(
      selectedMode === "weekly"
        ? endDate.setDate(new Date().getDate() - 7) 
        : endDate.setMonth(new Date().getMonth() - 1) 
    );

    const startDateFormatted = formatDateToString(startDate);
    const endDateFormatted = formatDateToString(new Date());

    const query = `start_time=${startDateFormatted}&end_time=${endDateFormatted}&category=PRICE&limit=10`;
    console.log("getStatisticByMenuItem", query);
    try {
      getStatisticByMenuItem(query).then((res) => {
        console.log(res);
        setMostPopular(res.menuItemStatistics);
      });
      
    } catch (error) {
      console.error("Error fetching most popular items:", error);
    }
  };

  fetchMostPopularItems();
}, [selectedMode]); // Chạy lại khi selectedMode thay đổi

  return (
    <section className="bg-white p-4 shadow-sm ml-3 mt-6 h-[280px]">
      <div className="flex justify-between items-center h-10 mb-4">
        <div className="font-extrabold text-xl">Món ăn phổ biến</div>
        <div className="flex h-10 w-48 text-[#898a84] text-sm bg-[#f7f7f7] font-semibold rounded-md p-1 gap-2">
          <button
            className={`basis-1/2 rounded-md transition-all duration-500 ${selectedMode == "weekly"
              ? "text-[#fafafa] bg-[#2b2b2b] shadow-sm"
              : ""
              }`}
            onClick={() => setSelectedMode("weekly")}
          >
            Theo tuần
          </button>
          <button
            className={`basis-1/2 rounded-md transition-all duration-500 ${selectedMode == "monthly"
              ? "text-[#fafafa] bg-[#2b2b2b] shadow-sm"
              : ""
              }`}
            onClick={() => setSelectedMode("monthly")}
          >
            Theo tháng
          </button>
        </div>
      </div>
      <div className="flex items-center h-6 p-2 w-full text-sm text-[#808080]">
        <div className="basis-[50%]">Tên</div>
        <div className="basis-[25%] text-center">Số lượng</div>
        <div className="basis-[25%] text-end">Lợi nhuận</div>
      </div>
      <div className="max-h-[170px] overflow-auto font-bold text-lg">
        {mostPopular.map((item) => (
          <div
            key={item.menuItemId}
            className="group flex items-center h-10 p-2 w-full"
          >
            <div className="overflow-hidden text-nowrap basis-[50%]">
              {item.menuItemName}
            </div>
            <div className="basis-[25%] text-center text-[#808080]">
              {item.quantity}
            </div>
            <div className="basis-[25%] text-end">₫{item.revenue}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
