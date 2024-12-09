import apiClientService from "./ApiClientService";
import { RoleEntity } from "./RoleService";

const baseUrl: string = "http://localhost:8080/api/v1/users";

export type UserEntity = {
  id: number;
  email: string;
  password: string; 
  name: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: Date;
  roleId: number;
  cccd: string;
  cvImg: string;
  position: string;
  salaryType: string;
  salaryPerHour: number;
  salaryPerMonth: number;
  role: RoleEntity;
};

export type CreateUserRequest = {
  id?: number;
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string;
  roleId: number;
  cccd: string;
  cvImg: string;
  position: string;
  salaryType: string;
  salaryPerHour: number;
  salaryPerMonth: number;
};

export type UpdateUserRequest = {
  name?: string;
  phoneNumber?: string;
  gender?: string;
  dateOfBirth?: string;
  roleId?: number;
  cccd?: string;
  cvImg?: string;
  position?: string;
  salaryType?: string;
  salaryPerHour?: number;
  salaryPerMonth?: number;
};

export const createUser = async (
  payload: CreateUserRequest
): Promise<UserEntity> => {
  return await apiClientService.post(baseUrl, payload).then((res) => res.data);
};

export const getDetailUser = async (id: number): Promise<UserEntity> => {
  return await apiClientService.get(`${baseUrl}/${id}`).then((res) => res.data);
};

export const getAllUsers = async (query: string) => {
  return await apiClientService
    .get(`${baseUrl}?${query}`)
    .then((res) => res.data);
};

export const updateUser = async (
  id: number,
  payload: UpdateUserRequest
): Promise<UserEntity> => {
  return await apiClientService
    .put(`${baseUrl}/${id}`, payload)
    .then((res) => res.data);
};
