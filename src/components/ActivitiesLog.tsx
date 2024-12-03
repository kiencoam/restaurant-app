/*
    Gọi API ở dòng 57
*/

"use client";

import { useEffect, useRef, useState } from "react";
import { ActivityLogEntity } from "@/app/api-client/ActivityLogService";

const sampleActivities: ActivityLogEntity[] = [
  {
    id: 1,
    userId: 1,
    userName: "Quoc Co",
    action: "bán đơn hàng",
    amount: 30000,
    createdAt: "16:29",
  },
  {
    id: 2,
    userId: 2,
    userName: "Hai Dang",
    action: "nhập hàng",
    amount: 20000,
    createdAt: "16:00",
  },
  {
    id: 3,
    userId: 3,
    userName: "John Wick",
    action: "bán đơn hàng",
    amount: 10000,
    createdAt: "15:30",
  },
];

const ActivitiesLog = () => {
  const [activities, setActivities] = useState<ActivityLogEntity[]>([]);
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

  useEffect(() => {
    /* Gọi API */
    const startTime = new Date(0);
    const numberOfLogs = 1000;

    const interval = setInterval(() => {
      const endTime = new Date();
      const query = `startTime=${startTime.toISOString()}&endTime=${endTime.toISOString()}&page_size=${numberOfLogs}`;
      // newActivities = callAPI(query);
      const newActivity = sampleActivities;
      setActivities(newActivity);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={activitiesRef} className="relative">
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
        <div className="absolute rounded-lg shadow-md p-3 w-80 min-h-[200px] max-h-[400px] overflow-auto top-12 -left-40 bg-white">
          {activities.map((activity) => (
            <div key={activity.id} className="border-b m-2">
              <div className="font-semibold">
                {activity.userName} vừa {activity.action} với giá trị{" "}
                {activity.amount}₫
              </div>
              <div className="text-[#999999] text-md font-flux">
                {activity.createdAt}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivitiesLog;
