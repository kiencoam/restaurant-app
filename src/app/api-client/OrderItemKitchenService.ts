import { MenuItemEntity, TableEntity } from "../home/order-taking/entity";
import apiClientService from "./ApiClientService";
const baseUrl: string = "http://localhost:8080/api/v1/order_item_kitchens";
export type UpdateOrderItemKitchenStatusRequest = {
  orderItemKitchenIds: number[];
  status: string;
};
export type OrderItemKitchenEntity = {
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

export const getAll = async (query: string) => {
  return await apiClientService
    .get(`${baseUrl}?${query}`)
    .then((res) => res.data);
};

export const updateOrderItemKitchen = async (
  payload: UpdateOrderItemKitchenStatusRequest
): Promise<OrderItemKitchenEntity> => {
  return await apiClientService.put(baseUrl, payload).then((res) => res.data);
};
