import apiClientService from "./ApiClientService";
import { ProductEntity } from "./ProductService";
import { SupplierEntity } from "./SupplierService";
import { UserEntity } from "./UserService";

const baseUrl: string = "http://localhost:8080/api/v1/stock_histories";

export type StockHistoryEntity = {
  id: number;
  code: string;
  supplierId: number;
  userId: number;
  status: string;
  note: string;
  totalPrice: number;
  dateTime: string;
  stockHistoryItems: StockHistoryItemEntity[];
  user: UserEntity;
  supplier: SupplierEntity;
};

export type StockHistoryItemEntity = {
  id: number;
  stockHistoryId: number;
  productId: number;
  quantity: number;
  pricePerUnit: number;
  product: ProductEntity;
};

export type CreateStockHistoryRequest = {
  supplierId: number;
  userId: number;
  code: string;
  status: string;
  note: string;
  stockHistoryItems: CreateStockHistoryItemRequest[];
}
export type CreateStockHistoryItemRequest = {
  productId: number;
  quantity: number;
  pricePerUnit: number;
}

export type UpdateStockHistoryRequest = {
  supplierId: number;
  userId: number;
  code: string;
  status: string;
  note: string;
  stockHistoryItems: UpdateStockHistoryItemRequest[];
}

export type UpdateStockHistoryItemRequest = {
  productId: number;
  quantity: number;
  pricePerUnit: number;
}

export const createStockHistory = async (payload: CreateStockHistoryRequest) : Promise<StockHistoryEntity> => {
  return await apiClientService.post(baseUrl, payload).then(res => res.data);

};

export const getDetailStockHistory = async (id: number): Promise<StockHistoryEntity> => {
  return await apiClientService.get(`${baseUrl}/${id}`).then(res => res.data);
};


export const getAllStockHistories = async (query: string) => {
  return await apiClientService.get(`${baseUrl}?${query}`).then(res => res.data);
};


export const updateStockHistory = async (id: number, payload: UpdateStockHistoryRequest): Promise<StockHistoryEntity> => {
  return await apiClientService.put(`${baseUrl}/${id}`, payload).then(res => res.data);
};


export const deleteStockHistory = async (id: number): Promise<StockHistoryEntity> => {
  return await apiClientService.delete(`${baseUrl}/${id}`).then(res => res.data);
};