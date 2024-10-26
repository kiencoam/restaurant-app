"use client";

import { Menu } from "@/components/Menu";
import { Receipt } from "@/components/Receipt";
import { Table } from "@/components/Table";
import { useState } from "react";

const initOrders: OrderEntity[] = [
  {
    id: 1,
    customerId: 1,
    userId: 1,
    orderStatus: "PROCESSING",
    totalCost: 125000,
    numberOfPeople: 2,
    note: "Không ớt",
    checkInTime: "2024-04-01T12:00:00",
    checkOutTime: "2024-04-01T13:00:00",
    paymentId: 1,
    paymentMethod: "CASH",
    orderItems: [
      {
        id: 1,
        orderId: 1,
        menuItemId: 1,
        orderedQuantity: 3,
        reservedQuantity: 0,
        price: 125000,
        status: "PROCESSING",
      },
      {
        id: 2,
        orderId: 1,
        menuItemId: 2,
        orderedQuantity: 2,
        reservedQuantity: 0,
        price: 12000,
        status: "PROCESSING",
      },
      {
        id: 3,
        orderId: 1,
        menuItemId: 3,
        orderedQuantity: 2,
        reservedQuantity: 1,
        price: 1200000,
        status: "PROCESSING",
      },
    ],
    orderTables: [
      {
        id: 1,
        orderId: 1,
        tableId: 1,
      },
    ],
  },
  {
    id: 2,
    customerId: 2,
    userId: 2,
    orderStatus: "PROCESSING",
    totalCost: 125000,
    numberOfPeople: 2,
    note: "Không ớt",
    checkInTime: "2024-04-01T12:00:00",
    checkOutTime: "2024-04-01T13:00:00",
    paymentId: 1,
    paymentMethod: "CASH",
    orderItems: [
      {
        id: 4,
        orderId: 2,
        menuItemId: 1,
        orderedQuantity: 2,
        reservedQuantity: 0,
        price: 125000,
        status: "PROCESSING",
      },
      {
        id: 5,
        orderId: 2,
        menuItemId: 2,
        orderedQuantity: 2,
        reservedQuantity: 0,
        price: 12000,
        status: "PROCESSING",
      },
      {
        id: 6,
        orderId: 2,
        menuItemId: 3,
        orderedQuantity: 2,
        reservedQuantity: 1,
        price: 1200000,
        status: "PROCESSING",
      },
    ],
    orderTables: [
      {
        id: 2,
        orderId: 2,
        tableId: 3,
      },
    ],
  },
];

const orderTables: OrderTableEntity[] = [
  {
    id: 1,
    orderId: 1,
    tableId: 1,
    status: "PROCESSING"
  },
  {
    id: 2,
    orderId: 1,
    tableId: 2,
    status: "PROCESSING"
  },
  {
    id: 3,
    orderId: 2,
    tableId: 3,
    status: "PROCESSING"
  },
  {
    id: 4,
    orderId: 2,
    tableId: 4,
    status: "PROCESSING"
  },
];

const menuItems: MenuItemEntity[] = [
  {
    id: 1,
    title: "Nem chua",
    description: "Nem chua rán giòn",
    costPrice: 20000,
    sellingPrice: 26000,
    menuSectionId: 1,
    thumbnailUrl:
      "https://truongfoods.vn/wp-content/uploads/2024/01/snapedit_1724054760134.png",
  },
  {
    id: 2,
    title: "Bánh tráng",
    description: "Bánh tráng trộn",
    costPrice: 15000,
    sellingPrice: 23000,
    menuSectionId: 1,
    thumbnailUrl:
      "https://tiemkemsuti.com/wp-content/uploads/2024/03/banh-trang-tron.png",
  },
  {
    id: 3,
    title: "Bia hơi",
    description: "Bia hơi lạnh",
    costPrice: 10000,
    sellingPrice: 16000,
    menuSectionId: 2,
    thumbnailUrl:
      "https://thegioibiaruou.com/wp-content/uploads/2018/10/ha-noi-beer-png.png",
  },
  {
    id: 4,
    title: "Kem",
    description: "Kem tươi",
    costPrice: 15000,
    sellingPrice: 20000,
    menuSectionId: 3,
    thumbnailUrl:
      "https://jollibee.com.vn/media/catalog/product/cache/11f3e6435b23ab624dc55c2d3fe9479d/m/_/m_n_tr_ng_mi_ng_-_6.png",
  },
];



const OrderTakingPage = () => {
  const [selectMode, setSelectMode] = useState('table');
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(initOrders[0].id);
  const [orders, setOrders] = useState<OrderEntity[]>(initOrders);
  const [selectedTableIds, setSelectedTableIds] = useState<number[]>(orderTables
    .filter(orderTable => orderTable.orderId === orders[0].id).map(orderTable => orderTable.tableId));

  const tableOccupiedIds: number[] = orderTables.map(orderTable => orderTable.tableId);
  const currentOrder = orders.find(order => order.id === selectedOrderId);

  const handleOrderItemsChange = (newOrderItems: OrderItemEntity[]) => {
    const newOrder = {
      ...currentOrder,
      orderItems: newOrderItems
    }
    const newOrders = orders.map(order => order.id === selectedOrderId ? newOrder : order);
    setOrders(newOrders);
  }

  const handleSelectTable = (tableId: number) => {
    console.log(tableId);
    if (selectedTableIds.includes(tableId)) {
      return;
    }

    const nextOrderTable = orderTables.find(orderTable => orderTable.tableId === tableId);
    if (!nextOrderTable) {
      setSelectedTableIds([])
      setSelectedOrderId(null);
      return;
    }

    const nextSelectedTableIds = orderTables
      .filter(orderTable => orderTable.orderId === nextOrderTable.orderId)
      .map(orderTable => orderTable.tableId);

    setSelectedTableIds(nextSelectedTableIds);
    setSelectedOrderId(nextOrderTable.orderId);
  }

  const handleAddMenuItem = (menuItemId: number) => {
    let currentOrderItem = currentOrder.orderItems.find(orderItem => orderItem.menuItemId === menuItemId);

    if (currentOrderItem == null) {
      currentOrderItem = {
        orderId: selectedOrderId,
        menuItemId: menuItemId,
        orderedQuantity: 1,
        reservedQuantity: 0,
        price: menuItems.find(menuItem => menuItem.id === menuItemId).sellingPrice,
        status: "PROCESSING",
      }
    } else {
      currentOrderItem = {
        ...currentOrderItem,
        orderedQuantity: currentOrderItem.orderedQuantity + 1,
        price: menuItems.find(menuItem => menuItem.id === menuItemId).sellingPrice * (currentOrderItem.orderedQuantity + 1)
      }
    }

    const newOrderItems = currentOrder.orderItems.map(orderItem => orderItem.menuItemId === menuItemId ? currentOrderItem : orderItem);
    handleOrderItemsChange(newOrderItems);
  }

  return (
    <main className="w-full h-screen flex p-4 gap-4 bg-[#edebe8]">
      <div className="basis-1/2">
        <div className="flex m-3 border h-12 w-48 text-[#898a84] text-sm bg-[#e5e6e1] font-semibold rounded-md p-1 gap-2">
          <button
            className={`basis-1/2 rounded-md transition-all duration-500 ${selectMode === 'table' ? "text-[#fafafa] bg-[#2b2b2b] shadow-sm" : ""
              }`}
            onClick={() => setSelectMode('table')}
          >
            Bàn ăn
          </button>
          <button
            className={`basis-1/2 rounded-md transition-all duration-500 ${selectMode === 'menu' ? "text-[#fafafa] bg-[#2b2b2b] shadow-sm" : ""
              }`}
            onClick={() => setSelectMode('menu')}
          >
            Thực đơn
          </button>
        </div>
        {selectMode === 'table' ?
          <Table
            tableOccupiedIds={tableOccupiedIds}
            selectedTableIds={selectedTableIds}
            handleSelectTable={handleSelectTable}
          />
          :
          <Menu handleAddMenuItem={handleAddMenuItem} menuItems={menuItems} />}
      </div>
      <Receipt menuItems={menuItems} orderItems={currentOrder.orderItems} handleOrderItemsChange={handleOrderItemsChange} />
    </main>
  );
};

export default OrderTakingPage;
