import apiClientService from "./ApiClientService";

const baseUrl: string = "http://localhost:8080/api/v1/shifts";

export interface CreateShiftRequest {
  name: string;
  startTime: string;
  endTime: string;
}
export interface UpdateShiftRequest {
  name: string;
  startTime: string;
  endTime: string;
}

export interface ShiftEntity {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  status: string;
}

export const createShift = async (
  payload: CreateShiftRequest
): Promise<ShiftEntity> => {
  return await apiClientService.post(baseUrl, payload).then((res) => res.data);
};

export const getDetailShift = async (id: number): Promise<ShiftEntity> => {
  return await apiClientService.get(`${baseUrl}/${id}`).then((res) => res.data);
};

export const getAll = async () => {
  return await apiClientService.get(baseUrl).then((res) => res.data);
};

export const updateShift = async (
  id: string,
  payload: UpdateShiftRequest
): Promise<ShiftEntity> => {
  return await apiClientService
    .put(`${baseUrl}/${id}`, payload)
    .then((res) => res.data);
};

export const deleteShift = async (id: string): Promise<ShiftEntity> => {
  return await apiClientService
    .delete(`${baseUrl}/${id}`)
    .then((res) => res.data);
};
