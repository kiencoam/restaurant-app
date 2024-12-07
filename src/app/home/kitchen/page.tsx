/*
  Gọi API lấy tất cả kitchen items ở trạng thái PENDING ở dòng 228
  Gọi API lấy tất cả kitchen items ở trạng thái READY ở dòng 244
  Gọi API cập nhật các kitchen items hiện ở trạng thái PENDING ở dòng 252
  Gọi API cập nhật các kitchen items hiện ở trạng thái READY ở dòng 273
*/

"use client";

import { Ordered } from "@/components/Ordered";
import { Prepared } from "@/components/Prepared";
import { MenuItemEntity, TableEntity } from "../order-taking/entity";
import { useEffect, useState, useCallback } from "react";

import { UpdateOrderItemKitchenStatusRequest } from "@/app/api-client/OrderItemKitchenService";

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

const samplePendingKitchenItems: OrderItemKitchenEntity[] = [
  {
    id: 1,
    orderId: 1,
    tableId: 1,
    menuItemId: 1,
    quantity: 1,
    status: "PENDING",
    receivedTime: new Date("2021-09-01T00:00:00.000Z"),
    menuItem: {
      id: 1,
      title: "Hamburger",
      description: "Hamburger",
      costPrice: 10000,
      sellingPrice: 12000,
      thumbnailUrl: "https://via.placeholder.com/150",
      menuSectionId: 1,
    },
    table: {
      id: 1,
      name: "Table 1",
      capacity: 4,
      type: "INDOOR",
      location: "1st Floor",
      isActive: true,
    },
  },
  {
    id: 3,
    orderId: 2,
    tableId: 2,
    menuItemId: 3,
    quantity: 2,
    status: "PENDING",
    receivedTime: new Date("2021-09-01T01:00:00.000Z"),
    menuItem: {
      id: 3,
      title: "Pasta",
      description: "Creamy Pasta",
      costPrice: 15000,
      sellingPrice: 18000,
      thumbnailUrl: "https://via.placeholder.com/150",
      menuSectionId: 2,
    },
    table: {
      id: 2,
      name: "Table 2",
      capacity: 2,
      type: "OUTDOOR",
      location: "2nd Floor",
      isActive: true,
    },
  },
  {
    id: 4,
    orderId: 3,
    tableId: 3,
    menuItemId: 4,
    quantity: 3,
    status: "PENDING",
    receivedTime: new Date("2021-09-01T02:00:00.000Z"),
    menuItem: {
      id: 4,
      title: "Salad",
      description: "Caesar Salad",
      costPrice: 8000,
      sellingPrice: 10000,
      thumbnailUrl: "https://via.placeholder.com/150",
      menuSectionId: 3,
    },
    table: {
      id: 3,
      name: "Table 3",
      capacity: 6,
      type: "INDOOR",
      location: "3rd Floor",
      isActive: true,
    },
  },
  {
    id: 5,
    orderId: 2,
    tableId: 2,
    menuItemId: 5,
    quantity: 1,
    status: "PENDING",
    receivedTime: new Date("2021-09-01T00:15:00.000Z"),
    menuItem: {
      id: 5,
      title: "Sushi",
      description: "Salmon Sushi Roll",
      costPrice: 20000,
      sellingPrice: 25000,
      thumbnailUrl: "https://via.placeholder.com/150",
      menuSectionId: 4,
    },
    table: {
      id: 2,
      name: "Table 2",
      capacity: 2,
      type: "OUTDOOR",
      location: "2nd Floor",
      isActive: true,
    },
  },
  {
    id: 6,
    orderId: 3,
    tableId: 3,
    menuItemId: 6,
    quantity: 2,
    status: "PENDING",
    receivedTime: new Date("2021-09-01T00:20:00.000Z"),
    menuItem: {
      id: 6,
      title: "Steak",
      description: "Grilled Ribeye Steak",
      costPrice: 30000,
      sellingPrice: 35000,
      thumbnailUrl: "https://via.placeholder.com/150",
      menuSectionId: 5,
    },
    table: {
      id: 3,
      name: "Table 3",
      capacity: 6,
      type: "INDOOR",
      location: "1st Floor",
      isActive: true,
    },
  },
  {
    id: 7,
    orderId: 3,
    tableId: 1,
    menuItemId: 6,
    quantity: 2,
    status: "PENDING",
    receivedTime: new Date("2021-09-01T00:20:00.000Z"),
    menuItem: {
      id: 6,
      title: "Steak",
      description: "Grilled Ribeye Steak",
      costPrice: 30000,
      sellingPrice: 35000,
      thumbnailUrl: "https://via.placeholder.com/150",
      menuSectionId: 5,
    },
    table: {
      id: 1,
      name: "Table 1",
      capacity: 4,
      type: "INDOOR",
      location: "1st Floor",
      isActive: true,
    },
  },
];
const sampleReadyKitchenItems = [
  {
    id: 2,
    orderId: 1,
    tableId: 1,
    menuItemId: 2,
    quantity: 1,
    status: "READY",
    receivedTime: new Date("2021-09-01T00:00:00.000Z"),
    menuItem: {
      id: 2,
      title: "Pizza",
      description: "Cheese Pizza",
      costPrice: 12000,
      sellingPrice: 15000,
      thumbnailUrl: "https://via.placeholder.com/150",
      menuSectionId: 1,
    },
    table: {
      id: 1,
      name: "Table 1",
      capacity: 4,
      type: "INDOOR",
      location: "1st Floor",
      isActive: true,
    },
  },
];

const KitchenPage = () => {
  const [pendingKitchenItems, setPendingKitchenItems] = useState<
    OrderItemKitchenEntity[]
  >([]);
  const [readyKitchenItems, setReadyKitchenItems] = useState<
    OrderItemKitchenEntity[]
  >([]);

  useEffect(() => {
    /* Gọi API */
    const fetchPendingKitchenItems = () => {
      const query = "status=PENDING";
      // const newPendingKitchenItems = getAll (query);
      const newPendingKitchenItems = samplePendingKitchenItems;
      setPendingKitchenItems(newPendingKitchenItems);
    };

    fetchPendingKitchenItems();

    const interval = setInterval(fetchPendingKitchenItems, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    /* Gọi API */
    const query = "status=READY";
    // const newReadyKitchenItems = getAll (query);
    setReadyKitchenItems(sampleReadyKitchenItems);
  }, []);

  const handlePendingKitchenItems = useCallback(
    (kitchenItemIds: number[]) => {
      /* Gọi API */
      const payload: UpdateOrderItemKitchenStatusRequest = {
        orderItemKitchenIds: kitchenItemIds,
        status: "PENDING",
      };
      // const response = updateOrderItemKitchen (payload);
      // if (response.ok) {
      setReadyKitchenItems((prev) => [
        ...prev,
        ...pendingKitchenItems.filter((item) =>
          kitchenItemIds.includes(item.id)
        ),
      ]);
      setPendingKitchenItems((prev) =>
        prev.filter((item) => !kitchenItemIds.includes(item.id))
      );
    },
    [pendingKitchenItems]
  );

  const handleReadyKitchenItems = useCallback((kitchenItemIds: number[]) => {
    /* Gọi API */
    const payload: UpdateOrderItemKitchenStatusRequest = {
      orderItemKitchenIds: kitchenItemIds,
      status: "READY",
    };
    // const response = updateOrderItemKitchen (payload);
    // if (response.ok) {
    setReadyKitchenItems((prev) =>
      prev.filter((item) => !kitchenItemIds.includes(item.id))
    );
  }, []);

  return (
    <section className="flex h-screen w-full bg-[#f7f7f7]">
      <Ordered
        pendingKitchenItems={pendingKitchenItems}
        handlePendingKitchenItems={handlePendingKitchenItems}
      />
      <Prepared
        readyKitchenItems={readyKitchenItems}
        handleReadyKitchenItems={handleReadyKitchenItems}
      />
    </section>
  );
};

export default KitchenPage;
