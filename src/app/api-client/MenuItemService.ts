import apiClientService from "./ApiClientService";
import { MenuItemEntity } from "../home/order-taking/entity";

const baseUrl: string = "http://localhost:8080/api/v1/menu_items";

interface Meta {
  code: number;
  message: string;
}

interface Resoure<T> {
  meta: Meta;
  data: T;
}

export type CreateMenuItemRequest = {
  title: string;
  description: string;
  costPrice: number;
  sellingPrice: number;
  thumbnailUrl: string;
  menuSectionId: number;
};

export type UpdateMenuItemRequest = {
  title: string;
  description: string;
  costPrice: number;
  sellingPrice: number;
  thumbnailUrl: string;
  menuSectionId: number;
};

export const getDetailMenuItem = async (
  id: number
): Promise<MenuItemEntity> => {
  return await apiClientService.get(`${baseUrl}/${id}`).then((res) => res.data);
};

export const getAllMenuItems = async (query: string) => {
  return await apiClientService
    .get(`${baseUrl}?${query}`)
    .then((res) => res.data);
};

export const createMenuItem = async (payload: CreateMenuItemRequest) => {
  return await apiClientService.post(baseUrl, payload).then((res) => res.data);
};

export const updateMenuItem = async (
  id: number,
  payload: UpdateMenuItemRequest
): Promise<MenuItemEntity> => {
  return await apiClientService
    .put(`${baseUrl}/${id}`, payload)
    .then((res) => res.data);
};

export const deleteMenuItem = async (id: number) => {
  return await apiClientService
    .delete(`${baseUrl}/${id}`)
    .then((res) => res.data);
};
