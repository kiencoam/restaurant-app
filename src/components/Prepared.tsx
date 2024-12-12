"use client";

import { OrderItemKitchenEntity } from "@/app/api-client/OrderItemKitchenService";
import { MenuItemEntity, TableEntity } from "@/app/home/order-taking/entity";
import { formatDateToTimeString, formatToHHColonMM } from "@/utils/timeUtils";

export function Prepared({
  readyKitchenItems,
  handleReadyKitchenItems,
}: {
  readyKitchenItems: OrderItemKitchenEntity[];
  handleReadyKitchenItems: (kitchenItemIds: number[]) => void;
}) {
  return (
    <section className="basis-1/2 h-full py-6 pl-3 pr-6">
      <div className="font-extrabold text-2xl mb-6 h-10 flex items-center text-nowrap">
        Đã xong / Chờ phục vụ
      </div>
      <div className="bg-white h-[660px] shadow-sm p-4">
        <div className="max-h-full overflow-auto font-semibold">
          {readyKitchenItems.map((item) => (
            <div
              key={item.id}
              className="group flex items-center w-full rounded-md px-4 py-2 mb-2 hover:bg-slate-50"
            >
              <div className="basis-1/2">
                <div className="overflow-hidden text-nowrap text-base">
                  {item.menuItem.title}
                </div>
                <div className="text-[#999999] text-sm font-normal font-flux">
                  {formatToHHColonMM(item.receivedTime)}
                </div>
              </div>
              <div className="basis-[20%] text-center">{item.quantity}</div>
              <div className="basis-[20%] text-center">{item.table.name}</div>
              <button
                onClick={() => {
                  handleReadyKitchenItems([item.id]);
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
      </div>
    </section>
  );
}