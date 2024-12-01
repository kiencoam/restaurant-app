import apiClientService from "./ApiClientService";
import { StockEntity } from "./StockService";

const baseUrl: string = "http://localhost:8080/api/v1/products";

export type ImageEntity = {
  id: number;
  url: string;
  entityId?: number;
  entityType: string;
};

export type ProductEntity = {
  id: number;
  name: string;
  description: string;
  code: string;
  costPrice: number;
  sellingPrice: number;
  thumbnailImg: string;
  status: string;
  productType: string;
  stock?: StockEntity;
  images?: ImageEntity[];
};

export type CreateProductRequest = {
  name: string;
  description: string;
  code?: string;
  costPrice: number;
  sellingPrice: number;
  thumbnailImg: string;
  status: string;
  productType: string;
  images: string[];
};

export type UpdateProductRequest = {
  name: string;
  description: string;
  code?: string;
  sellingPrice: number;
  thumbnailImg: string;
  status: string;
  productType: string;
  images: string[];
};

export type GetProductRequest = {
  page: number,
  pageSize: number,
  name?: string,
  status?: string,
  priceFrom?: number,
  priceTo?: number,
  sortBy?: string,
  sortType?: string,
}

export const getDetailProduct = async (id: number): Promise<ProductEntity> => {
  return await apiClientService.get(`${baseUrl}/${id}`).then((res) => res.data);
};

export const getAllProducts = async (query: string) => {
  return await apiClientService
    .get(`${baseUrl}?${query}`)
    .then((res) => res.data);
};

export const createProduct = async (
  payload: CreateProductRequest
): Promise<ProductEntity> => {
  return await apiClientService.post(baseUrl, payload).then((res) => res.data);
};

export const updateProduct = async (
  id: number,
  payload: UpdateProductRequest
): Promise<ProductEntity> => {
  return await apiClientService
    .put(`${baseUrl}/${id}`, payload)
    .then((res) => res.data);
};

export const deleteProduct = async (id: number) => {
  return await apiClientService
    .delete(`${baseUrl}/${id}`)
    .then((res) => res.data);
};
