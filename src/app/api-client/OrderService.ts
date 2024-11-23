import { CreateOrderRequest, OrderEntity } from "../home/order-taking/entity";
import apiClientService from "./ApiClientService";

const baseUrl: string = "http://localhost:8080/api/v1/orders";

export type AddMenuItemsToOrderRequest = {
  menuItemsQuantity: MenuItemQuantityRequest[];
};

export type MenuItemQuantityRequest = {
  menuItemId: number;
  quantity: number;
  note?: string;
};

export type UpdateOrderRequest = {
  userId: number;
  checkInTime: string;
  checkOutTime: string;
  tableIds: number[];
  numberOfPeople: number;
  note?: string;
};

export type UpdateOrderStatusRequest = {
  status: string;
};

export const createOrder = async (
  payload: CreateOrderRequest
): Promise<OrderEntity> => {
  return await apiClientService.post(baseUrl, payload).then((res) => res.data);
};

export const getDetailOrder = async (id: number): Promise<OrderEntity> => {
  return await apiClientService.get(`${baseUrl}/${id}`).then((res) => res.data);
};

export const getAllOrders = async (query: string) => {
  return await apiClientService
    .get(`${baseUrl}?${query}`)
    .then((res) => res.data);
};

export const addMenuItemsToOrder = async (
  id: number,
  payload: AddMenuItemsToOrderRequest
): Promise<OrderEntity> => {
  return await apiClientService
    .put(`${baseUrl}/${id}/add_menu_items`, payload)
    .then((res) => res.data);
};

export const updateOrder = async (
  id: number,
  payload: UpdateOrderRequest
): Promise<OrderEntity> => {
  return await apiClientService
    .put(`${baseUrl}/${id}`, payload)
    .then((res) => res.data);
};

export const updateOrderStatus = async (
  id: number,
  payload: UpdateOrderStatusRequest
): Promise<OrderEntity> => {
  return await apiClientService
    .put(`${baseUrl}/${id}/status`, payload)
    .then((res) => res.data);
};
