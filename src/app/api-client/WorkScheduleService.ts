import apiClientService from "./ApiClientService";
import { ShiftEntity } from "./ShiftService";
import { UserEntity } from "./UserService";

const baseUrl: string = "http://localhost:8080/api/v1/work_schedules";
export type WorkScheduleEntity = {
  id: number;
  userId: number;
  shiftId: number;
  date: string;
  user: UserEntity;
  shift: ShiftEntity;
};

export type CreateWorkScheduleRequest = {
  userId: number;
  shiftId: number;
  date: string;
};

export const createWorkSchedule = async (
  payload: CreateWorkScheduleRequest
): Promise<WorkScheduleEntity> => {
  return await apiClientService.post(baseUrl, payload).then((res) => res.data);
};

export const getAllWorkSchedules = async (query: string) => {
  return await apiClientService
    .get(`${baseUrl}?${query}`)
    .then((res) => res.data);
};

export const deleteWorkSchedule = async (
  id: number
): Promise<WorkScheduleEntity> => {
  return await apiClientService
    .delete(`${baseUrl}/${id}`)
    .then((res) => res.data);
};
