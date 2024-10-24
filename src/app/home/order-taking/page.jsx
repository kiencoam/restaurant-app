"use client";

import { Menu } from "@/components/Menu";
import { Receipt } from "@/components/Receipt";
import { Table } from "@/components/Table";
import { useState } from "react";

const OrderTakingPage = () => {
  const [selectTable, setSelectTable] = useState(true);

  return (
    <main className="w-full h-screen flex p-4 gap-4 bg-[#edebe8]">
      <div className="basis-1/2">
        <div className="flex m-3 border h-12 w-48 text-[#898a84] text-sm bg-[#e5e6e1] font-semibold rounded-md p-1 gap-2">
          <button
            className={`basis-1/2 rounded-md transition-all duration-500 ${
              selectTable ? "text-[#fafafa] bg-[#2b2b2b] shadow-sm" : ""
            }`}
            onClick={() => setSelectTable(true)}
          >
            Bàn ăn
          </button>
          <button
            className={`basis-1/2 rounded-md transition-all duration-500 ${
              !selectTable ? "text-[#fafafa] bg-[#2b2b2b] shadow-sm" : ""
            }`}
            onClick={() => setSelectTable(false)}
          >
            Thực đơn
          </button>
        </div>
        {selectTable ? <Table /> : <Menu />}
      </div>
      <Receipt />
    </main>
  );
};

export default OrderTakingPage;
