"use client";

import { Menu } from "@/components/Menu";
import { Receipt } from "@/app/home/order-taking/Receipt";
import { Table } from "@/app/home/order-taking/Table";
import { useCallback, useEffect, useState } from "react";
import {
  MenuItemEntity,
  MenuSectionEntity,
  OrderEntity,
  OrderItemEntity,
  OrderTableEntity,
} from "./entity";
import { getAllOrders } from "@/app/api-client/OrderService";
import { getAllTables, TableEntity } from "@/app/api-client/TableService";
import { getAllMenuSections } from "@/app/api-client/MenuSectionService";
import { createPayment, CreatePaymentRequest } from "@/app/api-client/PaymentService";



type GetOrderRequest = {
  page: number;
  page_size: number;
  order_status?: string;
  start_time: Date;
  end_time: Date;
  payment_method?: string;
  user_name?: string;
  customer_name?: string;
  note?: string;
  table_ids?: number[];
}

const OrderTakingPage = () => {
  const [selectMode, setSelectMode] = useState("table");

  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  const [orders, setOrders] = useState<OrderEntity[]>([]);

  const [filter, setFilter] = useState<GetOrderRequest>({
    page: 0,
    page_size: 20,
    order_status: "CHECKED_IN",
    start_time: new Date("2024-01-01T00:00:00"),
    end_time: new Date("2024-12-30T00:00:00")
  })

  const [tables, setTables] = useState<TableEntity[]>([]);

  const [menuSections, setMenuSections] = useState<MenuSectionEntity[]>([]);

  const [selectedTableIds, setSelectedTableIds] = useState<number[]>([]);

  const orderTables: OrderTableEntity[] = orders.flatMap((order) => order.orderTables);

  const tableOccupiedIds: number[] = orderTables.map(
    (orderTable) => orderTable.tableId
  );


  const currentOrder = orders.find((order) => order.id === selectedOrderId);

  const menuItems: MenuItemEntity[] = menuSections.flatMap(
    (menuSection) => menuSection.menuItems
  );

  console.log(orders);
  console.log(tables);
  console.log(menuSections);
  console.log(menuItems);

  const fetchOrder = useCallback(async (query: string) => {
    getAllOrders(query).then((res) => {
      setOrders(res.second);
      setSelectedOrderId(res.second[0].id);
    });
  }, []);

  useEffect(() => {
    const query = Object.entries(filter)
      .map(([key, value]) => {
        if (value instanceof Date && value) {
          return `${key}=${convertTime(value)}`;
        }

        if (value) {
          return `${key}=${value}`;
        }
      })
      .join("&");

    fetchOrder(query);
  }, [filter, fetchOrder]);


  useEffect(() => {
    getAllTables().then((res) => setTables(res.second));
  }, [])


  useEffect(() => {
    getAllMenuSections().then((res) => {
      setMenuSections(res);
    });
  }, [])

  const convertTime = (date: Date): string => {
    const dateString = date.toISOString().split("T");
    return dateString[0] + " " + dateString[1].substring(0, 8);
  }


  const handleOrderItemsChange = (newOrderItems: OrderItemEntity[]) => {
    newOrderItems.forEach((orderItem) => {
      orderItem.price = menuItems.find((menuItem) => menuItem.id === orderItem.menuItemId).sellingPrice * orderItem.orderedQuantity;
    })

    const newOrder = {
      ...currentOrder,
      orderItems: newOrderItems,
    };
    const newOrders = orders.map((order) =>
      order.id === selectedOrderId ? newOrder : order
    );
    setOrders(newOrders);
  };

  const handleSelectTable = (tableId: number) => {
    console.log(tableId);
    if (selectedTableIds.includes(tableId)) {
      return;
    }

    const nextOrderTable = orderTables.find(
      (orderTable) => orderTable.tableId === tableId
    );
    if (!nextOrderTable) {
      setSelectedTableIds([tableId]);
      setSelectedOrderId(null);
      return;
    }

    const nextSelectedTableIds = orderTables
      .filter((orderTable) => orderTable.orderId === nextOrderTable.orderId)
      .map((orderTable) => orderTable.tableId);

    setSelectedTableIds(nextSelectedTableIds);
    setSelectedOrderId(nextOrderTable.orderId);
  };

  const handleAddMenuItem = (menuItemId: number) => {
    let currentOrderItem = currentOrder.orderItems.find(
      (orderItem) => orderItem.menuItemId === menuItemId
    );

    let isNewOrderItem = false;

    if (currentOrderItem == null) {
      currentOrderItem = {
        orderId: selectedOrderId,
        menuItemId: menuItemId,
        orderedQuantity: 1,
        reservedQuantity: 0,
        price: menuItems.find((menuItem) => menuItem.id === menuItemId)
          .sellingPrice,
        status: "PROCESSING",
      };
      isNewOrderItem = true;
    } else {
      currentOrderItem = {
        ...currentOrderItem,
        orderedQuantity: currentOrderItem.orderedQuantity + 1,
        price:
          menuItems.find((menuItem) => menuItem.id === menuItemId)
            .sellingPrice *
          (currentOrderItem.orderedQuantity + 1),
      };
    }

    let newOrderItems: OrderItemEntity[] = [];
    if (isNewOrderItem) {
      newOrderItems = [...currentOrder.orderItems, currentOrderItem];
    } else {
      newOrderItems = currentOrder.orderItems.map((orderItem) =>
        orderItem.menuItemId === menuItemId ? currentOrderItem : orderItem
      );
    }

    handleOrderItemsChange(newOrderItems);
  };

  const handleCreatePayment = useCallback((async () => {
    const totalPrice = currentOrder.orderItems.reduce((total, item) => total + item.price, 0);
    const createPaymentRequest : CreatePaymentRequest = {
      orderId: selectedOrderId,
      totalPrice: totalPrice,
      promotion: 0,
      needToPay: totalPrice,
      paymentMethod: "CASH"
    }

    await createPayment(createPaymentRequest).then((res) => {
      console.log("res", res);
    })
  }), [currentOrder, selectedOrderId])

  return (
    <main className="w-full h-screen flex p-4 gap-4 bg-[#edebe8]">
      <div className="basis-1/2">
        <div className="flex m-3 border h-12 w-48 text-[#898a84] text-sm bg-[#e5e6e1] font-semibold rounded-md p-1 gap-2">
          <button
            className={`basis-1/2 rounded-md transition-all duration-500 ${selectMode === "table"
              ? "text-[#fafafa] bg-[#2b2b2b] shadow-sm"
              : ""
              }`}
            onClick={() => setSelectMode("table")}
          >
            Bàn ăn
          </button>
          <button
            className={`basis-1/2 rounded-md transition-all duration-500 ${selectMode === "menu"
              ? "text-[#fafafa] bg-[#2b2b2b] shadow-sm"
              : ""
              }`}
            onClick={() => setSelectMode("menu")}
          >
            Thực đơn
          </button>
        </div>
        {selectMode === "table" ? (
          <Table
            tableOccupiedIds={tableOccupiedIds}
            selectedTableIds={selectedTableIds}
            handleSelectTable={handleSelectTable}
          />
        ) : (
          <Menu
            handleAddMenuItem={handleAddMenuItem}
            menuSections={menuSections}
          />
        )}
      </div>
      {tables.length > 0 && currentOrder && selectedTableIds.length > 0 &&
        <Receipt
          menuItems={menuItems}
          orderItems={currentOrder.orderItems}
          handleOrderItemsChange={handleOrderItemsChange}
          currentTable={tables.find((table) => selectedTableIds.includes(table.id))}
          selectedOrderId={selectedOrderId}
          handleCreatePayment={handleCreatePayment}
        />}
    </main>
  );
};

export default OrderTakingPage;
