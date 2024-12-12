"use client";

import {
  addMenuItemsToOrder,
  AddMenuItemsToOrderRequest,
} from "@/app/api-client/OrderService";
import { TableEntity } from "@/app/api-client/TableService";
import {
  DisplayOrderItemEntity,
  MenuItemEntity,
  OrderItemEntity,
} from "@/app/home/order-taking/entity";

export function Receipt({
  menuItems,
  orderItems,
  handleOrderItemsChange,
  currentTable,
  selectedOrderId,
  handleCreatePayment,
}: {
  menuItems: MenuItemEntity[];
  orderItems: DisplayOrderItemEntity[];
  handleOrderItemsChange: (orderItems: DisplayOrderItemEntity[]) => void;
  currentTable: TableEntity;
  selectedOrderId: number;
  handleCreatePayment: (payload: any) => void;
}) {
  console.log("table", currentTable);

  const totalCost = orderItems?.reduce((acc, item) => acc + item.price, 0);

  const handleNotifyKitchen = async () => {
    const addMenuItemToOrderRequest: AddMenuItemsToOrderRequest = {
      menuItemsQuantity: orderItems
        .map((item) => ({
          menuItemId: item.menuItemId,
          quantity: item.currentQuantity - item.orderedQuantity,
        }))
        .filter((item) => item.quantity > 0),
    };

    await addMenuItemsToOrder(selectedOrderId, addMenuItemToOrderRequest).then(
      (res) => {
        console.log("res", res);
      }
    );

    console.log("addMenuItemToOrderRequest", addMenuItemToOrderRequest);

    const newOrderItems = orderItems.map((item) => ({
      ...item,
      orderedQuantityQuantity: item.currentQuantity,
    }));

    handleOrderItemsChange(newOrderItems);
  };

  const handleInCreaseClick = (menuItemId: number) => {
    const newOrderItems = orderItems.map((item) => {
      if (item.menuItemId == menuItemId) {
        return {
          ...item,
          currentQuantity: item.currentQuantity + 1,
        };
      } else {
        return item;
      }
    });
    console.log("newOrderItems", newOrderItems);
    handleOrderItemsChange(newOrderItems);
  };

  const handleDecreaseClick = (menuItemId: number) => {
    const targetItem = orderItems.find(
      (item) => item.menuItemId === menuItemId
    );
    if (targetItem.currentQuantity === 1 && targetItem.orderedQuantity === 0) {
      const newOrderItems = orderItems.filter(
        (item) => item.menuItemId !== menuItemId
      );
      handleOrderItemsChange(newOrderItems);
      return;
    }

    const newOrderItems = orderItems.map((item) => {
      if (item.menuItemId == menuItemId) {
        if (item.currentQuantity <= item.orderedQuantity) {
          return item;
        }

        return {
          ...item,
          currentQuantity: item.currentQuantity - 1,
        };
      } else {
        return item;
      }
    });
    handleOrderItemsChange(newOrderItems);
  };

  return (
    <section className="basis-1/2 h-full w-full p-4">
      <div className="relative h-full w-full flex flex-col justify-between bg-[#fafafa] shadow-sm rounded-2xl p-4 font-semibold">
        <div>
          <div className="relative ml-[150px] mb-3 z-50 font-bold font-uniform text-sm text-[#959595]">
            {currentTable.name} - {currentTable.location}
            <div className="absolute rounded-b-lg shadow-sm inset-0 -translate-x-4 -translate-y-4 z-[-1] bg-[#ede6d5] w-[150px] h-12"></div>
          </div>

          <div className="flex items-center h-10 w-full border-dotted border-b-2 border-[#adadad] font-bold mb-2">
            <div className="basis-2/3">Item</div>
            <div className="basis-1/6 text-center">Qty</div>
            <div className="basis-1/6 text-center">Price</div>
          </div>
          <div className="max-h-[450px] overflow-auto">
            {orderItems?.map((item) => (
              <div
                key={item.menuItemId}
                className="group flex items-center h-10 w-full my-2"
              >
                <div className="overflow-hidden text-nowrap basis-2/3">
                  {
                    menuItems.find(
                      (menuItem) => menuItem.id === item.menuItemId
                    ).title
                  }
                </div>
                <div className="flex justify-evenly items-center font-bold basis-1/6 rounded-full group-hover:border hover:bg-[#f0f0f0]">
                  <button
                    onClick={() => handleDecreaseClick(item.menuItemId)}
                    className="invisible group-hover:visible active:-translate-x-0.5"
                  >
                    <svg
                      className="w-5 h-5"
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
                        d="m15 19-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <div>{item.currentQuantity}</div>
                  <button
                    onClick={() => handleInCreaseClick(item.menuItemId)}
                    className="invisible group-hover:visible active:translate-x-0.5"
                  >
                    <svg
                      className="w-5 h-5"
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
                </div>
                <div className="basis-1/6 text-end">₫{item.price}</div>
              </div>
            ))}
          </div>
          <div className="w-full h-16 my-2 border-dotted border-y-2 border-[#adadad] flex justify-between items-center text-xl font-uniform font-bold">
            <div className="tracking-wide">TỔNG</div>
            <div>₫{totalCost}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full h-10">
          <button
            onClick={handleNotifyKitchen}
            className="basis-1/2 h-full rounded-md shadow-sm bg-[#f7f7f7] border border-[#333333] text-[#333333] active:bg-[#333333] active:text-[#f7f7f7]"
          >
            Báo nhà bếp
          </button>
          <button
            className="basis-1/2 h-full rounded-md shadow-sm bg-[#333333] border border-[#333333] text-[#f7f7f7] active:bg-[#f7f7f7] active:text-[#333333]"
            onClick={handleCreatePayment}
          >
            Thanh toán
          </button>
        </div>
      </div>
    </section>
  );
}
