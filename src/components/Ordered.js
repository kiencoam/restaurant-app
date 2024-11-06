"use client";

import { useState } from "react";

const byPrior = [
  {
    id: 1,
    name: "Cá kiếm Ẽcalibur",
    quantity: 1,
    table: "T-1",
    time: "21:19",
    waiter: "Quoc Co",
  },
  {
    id: 2,
    name: "Cá voi xào hành tây",
    quantity: 2,
    table: "T-1",
    time: "21:19",
    waiter: "Quoc Co",
  },
  {
    id: 3,
    name: "Cà phê fizz",
    quantity: 1,
    table: "T-2",
    time: "21:19",
    waiter: "Quoc Nghiep",
  },
  {
    id: 4,
    name: "Cá vàng bơi trong chảo mỡ",
    quantity: 2,
    table: "T-1",
    time: "21:19",
    waiter: "Quoc Co",
  },
  {
    id: 5,
    name: "Thịt ba ba áp chảo",
    quantity: 2,
    table: "T-2",
    time: "21:19",
    waiter: "Quoc Nghiep",
  },
];

const byDish = [
  {
    id: 1,
    name: "Cá kiếm Ẽcalibur",
    quantity: 1,
  },
  {
    id: 2,
    name: "Cá voi xào hành tây",
    quantity: 2,
  },
  {
    id: 3,
    name: "Cà phê fizz",
    quantity: 1,
  },
  {
    id: 4,
    name: "Cá vàng bơi trong chảo mỡ",
    quantity: 2,
  },
  {
    id: 5,
    name: "Thịt ba ba áp chảo",
    quantity: 2,
  },
];

// const byTable = Object.groupBy(byPrior, (item) => item.table);

export function Ordered() {
  const [mode, setMode] = useState(0);

  return (
    <section className="basis-[60%] h-full py-6 pl-6 pr-3">
      <div className="flex justify-between items-center mb-6">
        <div className="font-extrabold text-2xl">Chờ chế biến</div>
        <div className="flex ml-[250px] border h-10 w-64 text-[#898a84] text-sm bg-[#e5e6e1] font-semibold rounded-md p-1 gap-2">
          <button
            className={`basis-1/2 rounded-md transition-all duration-500 ${
              mode === 0 ? "text-[#fafafa] bg-[#2b2b2b] shadow-sm" : ""
            }`}
            onClick={() => setMode(0)}
          >
            Ưu tiên
          </button>
          <button
            className={`basis-1/2 rounded-md transition-all duration-500 ${
              mode === 1 ? "text-[#fafafa] bg-[#2b2b2b] shadow-sm" : ""
            }`}
            onClick={() => setMode(1)}
          >
            Theo món
          </button>
          <button
            className={`basis-1/2 rounded-md transition-all duration-500 ${
              mode === 2 ? "text-[#fafafa] bg-[#2b2b2b] shadow-sm" : ""
            }`}
            onClick={() => setMode(2)}
          >
            Theo bàn
          </button>
        </div>
      </div>
      <div className="bg-white h-[660px] shadow-sm p-4">
        {/* Ưu tiên */}
        {mode === 0 && (
          <div className="max-h-full overflow-auto font-semibold">
            {byPrior.map((item) => (
              <div key={item.id} className="flex items-center w-full my-2">
                <div className="basis-1/2">
                  <div className="overflow-hidden text-nowrap text-base">
                    {item.name}
                  </div>
                  <div className="text-[#999999] text-sm font-normal font-flux">
                    {item.time} - By {item.waiter}
                  </div>
                </div>
                <div className="basis-[15%] text-center">{item.quantity}</div>
                <div className="basis-[15%] text-center">{item.table}</div>
                <button className="basis-[10%] flex justify-center items-center h-8 rounded-full hover:border-2 hover:shadow-sm active:bg-[#f0f0f0] active:translate-x-0.5">
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m9 5 7 7-7 7"
                    />
                  </svg>
                </button>
                <button className="basis-[10%] flex justify-center items-center h-8 rounded-full hover:border-2 hover:shadow-sm active:bg-[#2b2b2b] active:text-white">
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m7 16 4-4-4-4m6 8 4-4-4-4"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
        {/* Theo món */}
        {mode === 1 && (
          <div className="max-h-full overflow-auto font-semibold">
            {byPrior.map((item) => (
              <div key={item.id} className="flex items-center w-full my-2">
                <div className="basis-[60%] overflow-hidden text-nowrap text-base">
                  {item.name}
                </div>
                <div className="basis-[20%] text-center">{item.quantity}</div>
                <button className="basis-[10%] flex justify-center items-center h-8 rounded-full hover:border-2 hover:shadow-sm active:bg-[#f0f0f0] active:translate-x-0.5">
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m9 5 7 7-7 7"
                    />
                  </svg>
                </button>
                <button className="basis-[10%] flex justify-center items-center h-8 rounded-full hover:border-2 hover:shadow-sm active:bg-[#2b2b2b] active:text-white">
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m7 16 4-4-4-4m6 8 4-4-4-4"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
        {/* Theo bàn */}
        {mode === 2 && (
          <div className="max-h-full overflow-auto font-semibold">
            {Object.entries(byTable).map(([table, items]) => (
              <div key={table} className="w-full my-2">
                <div
                  key={table}
                  className="group flex items-center w-full my-2"
                >
                  <div className="basis-[60%] overflow-hidden text-nowrap text-lg">
                    {table}
                  </div>
                  <div className="basis-[20%] invisible group-hover:visible text-center text-[#999999]">
                    10
                  </div>
                  <div className="basis-[10%]"></div>
                  <button className="basis-[10%] invisible group-hover:visible flex justify-center items-center h-8 rounded-full hover:border-2 hover:shadow-sm active:bg-[#2b2b2b] active:text-white">
                    <svg
                      className="w-6 h-6"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m7 16 4-4-4-4m6 8 4-4-4-4"
                      />
                    </svg>
                  </button>
                </div>
                {items.map((item) => (
                  <div key={item.id} className="flex items-center w-full my-2">
                    <div className="basis-[60%]">
                      <div className="overflow-hidden text-nowrap text-base">
                        {item.name}
                      </div>
                      <div className="text-[#999999] text-sm font-normal font-flux">
                        {item.time} - By {item.waiter}
                      </div>
                    </div>
                    <div className="basis-[20%] text-center">
                      {item.quantity}
                    </div>
                    <button className="basis-[10%] flex justify-center items-center h-8 rounded-full hover:border-2 hover:shadow-sm active:bg-[#f0f0f0] active:translate-x-0.5">
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m9 5 7 7-7 7"
                        />
                      </svg>
                    </button>
                    <button className="basis-[10%] flex justify-center items-center h-8 rounded-full hover:border-2 hover:shadow-sm active:bg-[#2b2b2b] active:text-white">
                      <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m7 16 4-4-4-4m6 8 4-4-4-4"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
