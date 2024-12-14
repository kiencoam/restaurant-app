"use client";

import { BusinessChart } from "@/components/BusinessChart";
import { CustomerChart } from "@/components/CustomerChart";
import { PopularDish } from "@/components/PopularDish";
import ActivitiesLog from "@/components/ActivitiesLog";
import Statistics from "@/components/Statistics";

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

const DashboardPage = () => {
  return (
    <section className="h-screen w-full bg-[#f7f7f7] p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="font-extrabold text-2xl">Thống kê</div>
        <ActivitiesLog />
      </div>

      <div className="flex w-full h-[700px]">
        <div className="basis-1/2 flex flex-col">
          <Statistics />
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