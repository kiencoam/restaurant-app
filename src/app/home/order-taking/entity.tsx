type OrderEntity = {
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
    orderItems: OrderItemEntity[];
    orderTables: OrderTableEntity[];
}

type OrderTableEntity = {
    id: number,
    orderId: number,
    tableId: number,
    status?: string,
    table?: TableEntity;
}

type TableEntity = {
    id: number;
    name: string;
    capacity: number;
    type: string;
    location: string;
    isActive: boolean;
}

type OrderItemEntity = {
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

type MenuItemEntity = {
    id: number;
    title: string;
    description: string;
    costPrice: number;
    sellingPrice: number;
    thumbnailUrl: string;
    menuSectionId: number;
}

type MenuSectionEntity = {
    id: number;
    title: string;
    description: string;
    menuItems?: MenuItemEntity[];
}

type CreateOrderRequest = {
    customerId: number;
    userId: number;
    checkInTime: string;
    checkOutTime: string;
    numberOfPeople: number;
    tableIds: Set<number>;
    note?: string;
}

type GetOrderRequest = {
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