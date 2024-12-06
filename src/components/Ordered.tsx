"use client";

import { MenuItemEntity, TableEntity } from "@/app/home/order-taking/entity";
import { formatDateToTimeString } from "@/utils/timeUtils";
import { useMemo, useState } from "react";

// giống type trong OrderItemKitchenService.ts nhưng receiveTime là Date
// nên sửa lại entity trong OrderItemKitchenService.ts rồi import ở đây
type OrderItemKitchenEntity = {
  id: number;
  orderId: number;
  tableId: number;
  menuItemId: number;
  quantity: number;
  status: string;
  note?: string;
  receivedTime: Date;
  menuItem: MenuItemEntity;
  table: TableEntity;
};

export function Ordered({
  pendingKitchenItems,
  handlePendingKitchenItems,
}: {
  pendingKitchenItems: OrderItemKitchenEntity[];
  handlePendingKitchenItems: (kitchenItemIds: number[]) => void;
}) {
  const [mode, setMode] = useState<string>("prior");

  const pendingKitchenItemsByDish = useMemo(() => {
    const groupByDish = Object.groupBy(
      pendingKitchenItems,
      (item) => item.menuItemId
    );
    return Object.entries(groupByDish).map(([menuItemId, orders]) => ({
      ...orders[0].menuItem,
      quantity: orders.reduce((acc, item) => acc + item.quantity, 0),
      kitchenItemIds: orders.reduce((acc, item) => {
        acc.push(item.id);
        return acc;
      }, [] as number[]),
    }));
  }, [pendingKitchenItems]);

  const pendingKitchenItemsByTable = useMemo(() => {
    const groupByTable = Object.groupBy(
      pendingKitchenItems,
      (item) => item.tableId
    );
    return Object.entries(groupByTable).map(([tableId, orders]) => ({
      ...orders[0].table,
      tableQuantity: orders.reduce((acc, item) => acc + item.quantity, 0),
      kitchenItems: orders.reduce((acc, item) => {
        acc.push(item);
        return acc;
      }, [] as OrderItemKitchenEntity[]),
    }));
  }, [pendingKitchenItems]);
  return (
    <section className="basis-1/2 h-full py-6 pl-6 pr-3">
      <div className="flex justify-between items-center mb-6">
        <div className="font-extrabold text-2xl text-nowrap">Chờ chế biến</div>
        <div className="flex ml-[250px] border h-10 w-64 text-[#898a84] text-sm bg-[#e5e6e1] font-semibold rounded-md p-1 gap-2">
          <button
            className={`basis-1/3 rounded-md transition-all duration-500 ${
              mode === "prior" ? "text-[#fafafa] bg-[#2b2b2b] shadow-sm" : ""
            }`}
            onClick={() => setMode("prior")}
          >
            Ưu tiên
          </button>
          <button
            className={`basis-1/3 rounded-md transition-all duration-500 ${
              mode === "dish" ? "text-[#fafafa] bg-[#2b2b2b] shadow-sm" : ""
            }`}
            onClick={() => setMode("dish")}
          >
            Theo món
          </button>
          <button
            className={`basis-1/3 rounded-md transition-all duration-500 ${
              mode === "table" ? "text-[#fafafa] bg-[#2b2b2b] shadow-sm" : ""
            }`}
            onClick={() => setMode("table")}
          >
            Theo bàn
          </button>
        </div>
      </div>
      <div className="bg-white h-[660px] shadow-sm p-4">
        {/* Ưu tiên */}
        {mode === "prior" && (
          <div className="max-h-full overflow-auto font-semibold">
            {pendingKitchenItems.map((item) => (
              <div
                key={item.id}
                className="group flex items-center w-full py-2 px-4 mb-2 rounded-md hover:bg-slate-50"
              >
                <div className="basis-[50%]">
                  <div className="overflow-hidden text-nowrap text-base">
                    {item.menuItem.title}
                  </div>
                  <div className="text-[#999999] text-sm font-normal font-flux">
                    {formatDateToTimeString(item.receivedTime)}
                  </div>
                </div>
                <div className="basis-[20%] text-center">{item.quantity}</div>
                <div className="basis-[20%] text-center">{item.table.name}</div>

                <button
                  onClick={() => {
                    handlePendingKitchenItems([item.id]);
                  }}
                  className="basis-[10%] flex justify-center items-center h-8 rounded-full group-hover:border-2 hover:shadow-sm active:bg-[#2b2b2b] active:text-white"
                >
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

        {mode === "dish" && (
          <div className="max-h-full overflow-auto font-semibold">
            {pendingKitchenItemsByDish.map((item) => (
              <div
                key={item.id}
                className="group flex items-center w-full px-4 py-2 mb-2 hover:bg-slate-50"
              >
                <div className="basis-[60%] overflow-hidden text-nowrap text-base">
                  {item.title}
                </div>
                <div className="basis-[30%] text-center">{item.quantity}</div>
                <button
                  onClick={() => {
                    handlePendingKitchenItems(item.kitchenItemIds);
                  }}
                  className="basis-[10%] flex justify-center items-center h-8 rounded-full group-hover:border-2 hover:shadow-sm active:bg-[#2b2b2b] active:text-white"
                >
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

        {mode === "table" && (
          <div className="max-h-full overflow-auto font-semibold">
            {pendingKitchenItemsByTable.map((table) => (
              <div
                key={table.id}
                className="group/table w-full py-2 px-4 hover:bg-slate-50"
              >
                <div key={table.id} className="flex items-center w-full mb-2">
                  <div className="basis-[60%] overflow-hidden text-nowrap text-sm">
                    {table.name}
                  </div>
                  <div className="basis-[30%] invisible group-hover/table:visible text-center text-[#999999]">
                    {table.tableQuantity}
                  </div>
                  <button
                    onClick={() => {
                      handlePendingKitchenItems(
                        table.kitchenItems.map((item) => item.id)
                      );
                    }}
                    className="basis-[10%] invisible group-hover/table:visible flex justify-center items-center h-8 rounded-full group-hover/table:border-2 hover:shadow-sm active:bg-[#2b2b2b] active:text-white"
                  >
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
                {table.kitchenItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center w-full px-4 py-2 mb-2 group/item hover:bg-slate-100"
                  >
                    <div className="basis-[60%]">
                      <div className="overflow-hidden text-nowrap text-base">
                        {item.menuItem.title}
                      </div>
                      <div className="text-[#999999] text-sm font-normal font-flux">
                        {formatDateToTimeString(item.receivedTime)}
                      </div>
                    </div>
                    <div className="basis-[30%] text-center">
                      {item.quantity}
                    </div>
                    <button
                      onClick={() => {
                        handlePendingKitchenItems([item.id]);
                      }}
                      className="basis-[10%] flex justify-center items-center h-8 rounded-full group-hover/item:border-2 hover:shadow-sm active:bg-[#2b2b2b] active:text-white"
                    >
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
