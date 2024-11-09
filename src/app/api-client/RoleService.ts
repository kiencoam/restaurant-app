import apiClientService from "./ApiClientService";

const baseUrl: string = "http://localhost:8080/api/v1/roles";

export type RoleEntity = {
  id: number;
  name: string;
  description: string;
};

export type CreateRoleRequest = {
  name: string;
  description: string;
};

export const createRole = async (
  payload: CreateRoleRequest
): Promise<RoleEntity> => {
  return await apiClientService.post(baseUrl, payload).then((res) => res.data);
};

export const getDetailRole = async (id: number): Promise<RoleEntity> => {
  return await apiClientService.get(`${baseUrl}/${id}`).then((res) => res.data);
};

export const getAllRoles = async () => {
  return await apiClientService.get(baseUrl).then((res) => res.data);
};

export const deleteRole = async (id: number): Promise<RoleEntity> => {
  return await apiClientService
    .delete(`${baseUrl}/${id}`)
    .then((res) => res.data);
};
