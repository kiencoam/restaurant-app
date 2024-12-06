import apiClientService from "./ApiClientService";

const baseUrl: string = "http://localhost:8080/api/v1/suppliers";
export type SupplierEntity = {
  id: number;
  name: string;
  code: string;
  address: string;
  email: string;
  phoneNumber: string;
  totalDebt: number;
  totalCost: number;
  status: string;
};

export type CreateSupplierRequest = {
  name: string;
  code: string;
  address: string;
  email: string;
  phoneNumber: string;
};

export type UpdateSupplierRequest = {
  name?: string;
  code?: string;
  address?: string;
  email?: string;
  phoneNumber?: string;
  status?: string;
};

export const createSupplier = async (
  payload: CreateSupplierRequest
): Promise<SupplierEntity> => {
  return await apiClientService.post(baseUrl, payload).then((res) => res.data);
};

export const getDetailSupplier = async (
  id: number
): Promise<SupplierEntity> => {
  return await apiClientService.get(`${baseUrl}/${id}`).then((res) => res.data);
};

export const getAllSuppliers = async (query: string) => {
  console.log(`${baseUrl}?${query}`);
  return await apiClientService
    .get(`${baseUrl}/${query}`)
    .then((res) => res.data);
};

export const updateSupplier = async (
  id: number,
  payload: UpdateSupplierRequest
): Promise<SupplierEntity> => {
  return await apiClientService
    .patch(`${baseUrl}/${id}`, payload)
    .then((res) => res.data);
};
