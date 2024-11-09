import apiClientService from "./ApiClientService";

const baseUrl: string = "http://localhost:8080/api/v1/stocks";

export type StockEntity = {
  id?: number;
  productId: number;
  availableQuantity: number;
  soldQuantity: number;
};
export type QuantityStockItemRequest = {
  stockId: number;
  quantity: number;
};

export type QuantityStockRequest = {
  items: QuantityStockItemRequest[];
};
export const subtractStockQuantity = async (
  payload: QuantityStockRequest
): Promise<StockEntity> => {
  return await apiClientService
    .patch(`${baseUrl}/subtract`, payload)
    .then((res) => res.data);
};
