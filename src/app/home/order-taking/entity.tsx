import { CustomerEntity } from "@/app/api-client/CustomerService";

export type OrderEntity = {
    id?: number;
    customerId?: number;
    userId?: number;
    orderStatus?: string;
    totalCost: number;
    numberOfPeople?: number;
    note?: string;
    checkInTime?: string;
    checkOutTime?: string;
    paymentId?: number;
    paymentMethod?: string;
    customer?: CustomerEntity;
    orderItems: OrderItemEntity[];
    orderTables: OrderTableEntity[];
}

export type OrderTableEntity = {
    id: number,
    orderId: number,
    tableId: number,
    status?: string,
    table?: TableEntity;
}

export type TableEntity = {
    id: number;
    name: string;
    capacity: number;
    type: string;
    location: string;
    isActive: boolean;
}

export type OrderItemEntity = {
    id?: number;
    orderId: number;
    menuItemId: number;
    orderedQuantity: number;
    reservedQuantity: number;
    price: number;
    note?: string;
    status: string;
    menuItem?: MenuItemEntity;
}

export type MenuItemEntity = {
    id: number;
    title: string;
    description: string;
    costPrice: number;
    sellingPrice: number;
    thumbnailImg: string;
    menuSectionId: number;
}

export type MenuSectionEntity = {
    id: number;
    title: string;
    description: string;
    menuItems?: MenuItemEntity[];
}

export type CreateOrderRequest = {
    customerId: number;
    userId: number;
    checkInTime: string;
    checkOutTime: string;
    numberOfPeople: number;
    tableIds: Set<number>;
    note?: string;
}

export type GetOrderRequest = {
    page?: number;
    pageSize?: number;
    orderStatus?: Set<string>;
    startTime: string;
    endTime: string;
    paymentMethod?: string;
    tableIds?: Set<number>;
    userName?: string;
    customerName?: string;
    note?: string;
  };