import { useState } from "react";

const mostPopular = [
  {
    id: 1,
    name: "Cá kiếm Ẽcalibur",
    price: 125000,
    revenue: 20000000,
  },
  {
    id: 2,
    name: "Cá voi xào hành tây",
    price: 12000,
    revenue: 2000000,
  },
  {
    id: 3,
    name: "Cá vàng bơi trong chảo mỡ",
    price: 1200000,
    revenue: 13000000,
  },
  {
    id: 4,
    name: "Anh Long",
    price: 10000,
    revenue: 3000000,
  },
];

export function PopularDish() {
  const [selectedMode, setSelectedMode] = useState("weekly");

  return (
    <section className="bg-white p-4 shadow-sm ml-3 mt-6 h-[280px]">
      <div className="flex justify-between items-center h-10 mb-4">
        <div className="font-extrabold text-xl">Món ăn phổ biến</div>
        <div className="flex h-10 w-48 text-[#898a84] text-sm bg-[#f7f7f7] font-semibold rounded-md p-1 gap-2">
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
      <div className="flex items-center h-6 w-full text-sm text-[#808080]">
        <div className="basis-[50%]">Item</div>
        <div className="basis-[25%] text-center">Price</div>
        <div className="basis-[25%] text-end">Total Revenue</div>
      </div>
      <div className="max-h-[170px] overflow-auto font-bold text-lg">
        {mostPopular.map((item) => (
          <div key={item.id} className="group flex items-center h-10 w-full">
            <div className="overflow-hidden text-nowrap basis-[50%]">
              {item.name}
            </div>
            <div className="basis-[25%] text-center text-[#808080]">
              ₫{item.price}
            </div>
            <div className="basis-[25%] text-end">₫{item.revenue}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
