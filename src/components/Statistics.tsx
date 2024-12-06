/*
  Gọi API ở dòng 131
*/

"use client";

import { OrderEntity } from "@/app/home/order-taking/entity";
import { formatDateToYYYYMMDD } from "@/utils/timeUtils";
import { useEffect, useState } from "react";

const sampleOrders: OrderEntity[] = [
  {
    id: 1,
    customerId: 1,
    userId: 1,
    orderStatus: "CHECK_IN",
    totalCost: 125000,
    numberOfPeople: 2,
    note: "Không ớt",
    checkInTime: "2024-04-01T12:00:00",
    checkOutTime: "2024-04-01T13:00:00",
    paymentId: 1,
    paymentMethod: "CASH",
    orderItems: [
      {
        id: 1,
        orderId: 1,
        menuItemId: 1,
        orderedQuantity: 3,
        reservedQuantity: 0,
        price: 125000,
        status: "PROCESSING",
      },
      {
        id: 2,
        orderId: 1,
        menuItemId: 2,
        orderedQuantity: 2,
        reservedQuantity: 0,
        price: 12000,
        status: "PROCESSING",
      },
      {
        id: 3,
        orderId: 1,
        menuItemId: 3,
        orderedQuantity: 2,
        reservedQuantity: 1,
        price: 1200000,
        status: "PROCESSING",
      },
    ],
    orderTables: [
      {
        id: 1,
        orderId: 1,
        tableId: 1,
      },
    ],
  },
  {
    id: 2,
    customerId: 2,
    userId: 2,
    orderStatus: "CHECK_IN",
    totalCost: 125000,
    numberOfPeople: 2,
    note: "Không ớt",
    checkInTime: "2024-04-01T12:00:00",
    checkOutTime: "2024-04-01T13:00:00",
    paymentId: 1,
    paymentMethod: "CASH",
    orderItems: [
      {
        id: 4,
        orderId: 2,
        menuItemId: 1,
        orderedQuantity: 2,
        reservedQuantity: 0,
        price: 125000,
        status: "PROCESSING",
      },
      {
        id: 5,
        orderId: 2,
        menuItemId: 2,
        orderedQuantity: 2,
        reservedQuantity: 0,
        price: 12000,
        status: "PROCESSING",
      },
      {
        id: 6,
        orderId: 2,
        menuItemId: 3,
        orderedQuantity: 2,
        reservedQuantity: 1,
        price: 1200000,
        status: "PROCESSING",
      },
    ],
    orderTables: [
      {
        id: 2,
        orderId: 2,
        tableId: 3,
      },
    ],
  },
];

const sampleRevenueIn2Days = [
  { date: new Date("12-06-2024"), revenue: 8000000 },
  { date: new Date("12-07-2024"), revenue: 400000 },
];

const sampleCustomerIn2Days = [
  { date: new Date("12-06-2024"), count: 40 },
  { date: new Date("12-07-2024"), count: 80 },
];

const Statistics = () => {
  const [todayRevenue, setTodayRevenue] = useState<number>(0);
  const [growthRevenue, setGrowthRevenue] = useState<number>(0);
  const [todayCustomer, setTodayCustomer] = useState<number>(0);
  const [growthCustomer, setGrowthCustomer] = useState<number>(0);
  const [totalProcessingOrder, setTotalProcessingOrder] = useState<number>(0);
  const [totalProcessingCost, setTotalProcessingCost] = useState<number>(0);
  const [totalProcessingPeople, setTotalProcessingPeople] = useState<number>(0);

  useEffect(() => {
    /* Gọi API */
    // Gọi doanh thu trong ngày hôm nay và hôm qua
    const endDate = new Date();
    const startDate = new Date(new Date().setDate(endDate.getDate() - 1));
    const queryForRevenueAndCustomer = `start_date=${formatDateToYYYYMMDD(
      startDate
    )}&end_date=${formatDateToYYYYMMDD(endDate)}`;
    // getStatisticByRevenueAndDate(queryForRevenueAndCustomer);
    setTodayRevenue(sampleRevenueIn2Days[1].revenue);
    setGrowthRevenue(
      ((sampleRevenueIn2Days[1].revenue - sampleRevenueIn2Days[0].revenue) /
        sampleRevenueIn2Days[0].revenue) *
        100
    );

    // Gọi số lượng khách hàng trong ngày hôm nay và hôm qua
    // getStatisticByCustomerAndDate(queryForRevenueAndCustomer);;
    setTodayCustomer(sampleCustomerIn2Days[1].count);
    setGrowthCustomer(
      ((sampleCustomerIn2Days[1].count - sampleCustomerIn2Days[0].count) /
        sampleCustomerIn2Days[0].count) *
        100
    );

    // Gọi tổng số order đang ở trạng thái CHECK_IN
    const startTime = new Date(0);
    const endTime = new Date();
    const queryForOrders = `start_time=${startTime.toISOString()}&end_time=${endTime.toISOString()}&order_status=CHECK_IN&page_size=1000`;
    // getAllOrders
    setTotalProcessingOrder(sampleOrders.length);
    setTotalProcessingCost(
      sampleOrders.reduce((total, order) => {
        return total + order.totalCost;
      }, 0)
    );
    setTotalProcessingPeople(
      sampleOrders.reduce((total, order) => {
        return total + order.numberOfPeople;
      }, 0)
    );
  }, []);

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-6 mr-3 mb-6 basis-1/3 min-h-[280px]">
      <div className="bg-[#ffffff] px-4 flex flex-col justify-evenly shadow-sm">
        <div className="text-[#808080] flex items-center justify-between">
          <div>Doanh thu hôm nay</div>
          <div className="h-8 w-8 border rounded-full flex items-center justify-center bg-gray-200 mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="icon icon-tabler icons-tabler-filled icon-tabler-tag w-5 h-5 text-green-700"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M11.172 2a3 3 0 0 1 2.121 .879l7.71 7.71a3.41 3.41 0 0 1 0 4.822l-5.592 5.592a3.41 3.41 0 0 1 -4.822 0l-7.71 -7.71a3 3 0 0 1 -.879 -2.121v-5.172a4 4 0 0 1 4 -4zm-3.672 3.5a2 2 0 0 0 -1.995 1.85l-.005 .15a2 2 0 1 0 2 -2" />
            </svg>
          </div>
        </div>
        <div className="flex items-end">
          <div className="font-extrabold text-2xl">₫{todayRevenue}</div>
          <div
            className={`ml-6 font-bold ${
              growthRevenue > 0 ? "text-[#72ada9]" : "text-[#d57c72]"
            }`}
          >
            <span className={growthRevenue > 0 ? "" : "hidden"}>+</span>
            {growthRevenue}%
          </div>
        </div>
      </div>
      <div className="bg-[#ffffff] px-4 flex flex-col justify-evenly shadow-sm">
        <div className="text-[#808080] flex items-center justify-between">
          <div>Số khách hàng hôm nay</div>
          <div className="h-8 w-8 border rounded-full flex items-center justify-center bg-gray-200 mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-green-700"
            >
              <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
            </svg>
          </div>
        </div>
        <div className="flex items-end">
          <div className="font-extrabold text-2xl">{todayCustomer}</div>
          <div
            className={`ml-6 font-bold ${
              growthCustomer > 0 ? "text-[#72ada9]" : "text-[#d57c72]"
            }`}
          >
            <span className={growthCustomer > 0 ? "" : "hidden"}>+</span>
            {growthCustomer}%
          </div>
        </div>
      </div>
      <div className="bg-[#ffffff] px-4 flex flex-col justify-evenly shadow-sm">
        <div className="text-[#808080] flex items-center justify-between">
          <div>{totalProcessingOrder} đơn đang phục vụ</div>
          <div className="h-8 w-8 border rounded-full flex items-center justify-center bg-gray-200 mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-green-700"
            >
              <path d="M5.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H6a.75.75 0 0 1-.75-.75V12ZM6 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H6ZM7.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H8a.75.75 0 0 1-.75-.75V12ZM8 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H8ZM9.25 10a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H10a.75.75 0 0 1-.75-.75V10ZM10 11.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V12a.75.75 0 0 0-.75-.75H10ZM9.25 14a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H10a.75.75 0 0 1-.75-.75V14ZM12 9.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V10a.75.75 0 0 0-.75-.75H12ZM11.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H12a.75.75 0 0 1-.75-.75V12ZM12 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H12ZM13.25 10a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H14a.75.75 0 0 1-.75-.75V10ZM14 11.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V12a.75.75 0 0 0-.75-.75H14Z" />
              <path
                fillRule="evenodd"
                d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div className="flex items-end">
          <div className="font-extrabold text-2xl">₫{totalProcessingCost}</div>
        </div>
      </div>
      <div className="bg-[#ffffff] px-4 flex flex-col justify-evenly shadow-sm">
        <div className="text-[#808080] flex items-center justify-between">
          <div>Khách hàng đang phục vụ</div>
          <div className="h-8 w-8 border rounded-full flex items-center justify-center bg-gray-200 mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-green-700"
            >
              <path
                fillRule="evenodd"
                d="M1 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4Zm12 4a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM4 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm13-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM1.75 14.5a.75.75 0 0 0 0 1.5c4.417 0 8.693.603 12.749 1.73 1.111.309 2.251-.512 2.251-1.696v-.784a.75.75 0 0 0-1.5 0v.784a.272.272 0 0 1-.35.25A49.043 49.043 0 0 0 1.75 14.5Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div className="flex items-end">
          <div className="font-extrabold text-2xl">{totalProcessingPeople}</div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
