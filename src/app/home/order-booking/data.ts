import { OrderItemEntity, OrderTableEntity } from "../order-taking/entity";

export type CustomerEntity = {
  id: number;
  name: string;
  phoneNumber: string;
  email?: string;
  address?: string;
  dob?: string;
  gender?: string;
  totalCost?: string;
};

// Khác ở chỗ checkInTime và checkOutTime ở đây là kiểu Date
export type OrderEntity = {
  id?: number;
  customerId?: number;
  userId?: number;
  orderStatus?: string;
  totalCost: number;
  numberOfPeople?: number;
  note?: string;
  checkInTime?: Date;
  checkOutTime?: Date;
  paymentId?: number;
  totalPrice?: number;
  promotion?: number;
  needToPay?: number;
  paymentMethod?: string;
  orderItems: OrderItemEntity[];
  orderTables: OrderTableEntity[];
};
