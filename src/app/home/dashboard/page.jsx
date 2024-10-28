"use client";

import { BusinessChart } from "@/components/BusinessChart";
import { CustomerChart } from "@/components/CustomerChart";
import { Chart } from "react-chartjs-2";
import { PopularDish } from "@/components/PopularDish";
import { useState, useRef, useEffect } from "react";

import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const activities = [
  {
    id: 1,
    event: "Quoc Co vừa bán đơn hàng với giá trị 305,000₫",
    time: "16:29",
  },
  {
    id: 2,
    event: "Quoc Nghiep vừa bán đơn hàng với giá trị 30,000₫",
    time: "16:50",
  },
  {
    id: 3,
    event: "Gordon Ramsey vừa làm vỡ 3 cái bát trị giá 3,000,000₫",
    time: "17:29",
  },
];

const DashboardPage = () => {
  const [toggle, setToggle] = useState(false);

  const activitiesRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        activitiesRef.current &&
        !activitiesRef.current.contains(event.target)
      ) {
        setToggle(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="h-screen w-full bg-[#f7f7f7] p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="font-extrabold text-2xl">Thống kê</div>
        <div className="relative">
          <button
            onClick={() => setToggle(!toggle)}
            className={`flex items-center justify-center gap-1 rounded-md h-9 w-40 ${
              toggle
                ? "text-[#fafafa] bg-[#2b2b2b]"
                : "hover:shadow-sm hover:bg-[#e2e2e2]"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-bell w-5 h-5"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
              <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
            </svg>
            <div className="text-sm">Hoạt động gần đây</div>
          </button>

          {toggle && (
            <div
              ref={activitiesRef}
              className="absolute rounded-lg shadow-md p-3 w-80 min-h-[200px] max-h-[400px] overflow-auto top-12 -left-40 bg-white"
            >
              {activities.map((activity) => (
                <div key={activity.id} className="border-b m-2">
                  <div className="font-semibold">{activity.event}</div>
                  <div className="text-[#999999] text-md font-flux">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex w-full h-[700px]">
        <div className="basis-1/2 flex flex-col">
          <div className="grid grid-cols-2 grid-rows-2 gap-6 mr-3 mb-6 basis-1/3 min-h-[280px]">
            <div className="bg-[#ffffff] px-4 flex flex-col justify-evenly shadow-sm">
              <div className="text-[#808080] flex items-center justify-between">
                <div>Tổng doanh số</div>
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
                <div className="font-extrabold text-2xl">₫12,000,000</div>
                <div className="ml-6 text-[#72ada9] font-bold">+3.67%</div>
              </div>
            </div>
            <div className="bg-[#ffffff] px-4 flex flex-col justify-evenly shadow-sm">
              <div className="text-[#808080] flex items-center justify-between">
                <div>Tổng kinh phí</div>
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
                <div className="font-extrabold text-2xl">₫5,000,000</div>
                <div className="ml-6 text-[#d57c72] font-bold">-3.57%</div>
              </div>
            </div>
            <div className="bg-[#ffffff] px-4 flex flex-col justify-evenly shadow-sm">
              <div className="text-[#808080] flex items-center justify-between">
                <div>2 đơn đang phục vụ</div>
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
                <div className="font-extrabold text-2xl">₫1,200,000</div>
              </div>
            </div>
            <div className="bg-[#ffffff] px-4 flex flex-col justify-evenly shadow-sm">
              <div className="text-[#808080] flex items-center justify-between">
                <div>Tổng số khách hàng</div>
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
                <div className="font-extrabold text-2xl">15</div>
                <div className="ml-6 text-[#72ada9] font-bold">+50%</div>
              </div>
            </div>
          </div>
          <CustomerChart />
        </div>

        <div className="basis-1/2">
          <BusinessChart />
          <PopularDish />
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
