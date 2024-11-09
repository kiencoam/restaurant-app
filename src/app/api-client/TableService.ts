import apiClientService from "./ApiClientService";

const baseUrl: string = "http://localhost:8080/api/v1/tables";

export type TableEntity = {
  id: number;
  name: string;
  capacity: number;
  type: string;
  location: string;
  isActive: boolean;
};
export type CreateTableRequest = {
  name: string;
  capacity: number;
  type: string;
  location: string;
  isActive: boolean;
}

export type UpdateTableRequest = {
  name?: string;
  type?: string;
  location?: string;
  isActive?: boolean;
};

export const createTable = async (payload: CreateTableRequest): Promise<TableEntity> => {
  return await apiClientService.post(baseUrl, payload).then((res) => res.data);
};

export const getDetailTable = async (id: number): Promise<TableEntity> => {
  return await apiClientService.get(`${baseUrl}/${id}`).then((res) => res.data);
};

export const getAllTables = async (query?: string) => {
  return await apiClientService.get(`${baseUrl}?${query}`).then((res) => res.data);
};

export const getAllTablesAvailable = async (checkInTime: string, checkOutTime: string) => {
  return await apiClientService.get(`${baseUrl}/available?check_in_time=${checkInTime}&check_out_time=${checkOutTime}`)
    .then((res) => res.data);
};

export const updateTable = async (
  id: number,
  payload: UpdateTableRequest
): Promise<TableEntity> => {
  return await apiClientService.patch(`${baseUrl}/${id}`, payload).then((res) => res.data);
};

export const deleteTable = async (id: number): Promise<void> => {
  return await apiClientService.delete(`${baseUrl}/${id}`).then((res) => res.data);
};