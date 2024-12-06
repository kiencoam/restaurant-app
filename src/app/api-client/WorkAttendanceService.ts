import apiClientService from "./ApiClientService";
import { WorkScheduleEntity } from "./WorkScheduleService";

const baseUrl: string = "http://localhost:8080/api/v1/work_attendances";

export type WorkAttendanceEntity = {
  id: number;
  workScheduleId: number;
  checkInTime: string;
  checkOutTime: string;
  status: string;
  note: string;
  workSchedule: WorkScheduleEntity;
};

export type UpdateWorkAttendanceRequest = {
  checkInTime?: string;
  checkOutTime?: string;
  status: string;
  note?: string;
};
export const getAllWorkAttendances = async (query: string) => {
  return await apiClientService
    .get(`${baseUrl}?${query}`)
    .then((res) => res.data);
};

export const getDetailWorkAttendance = async (
  id: number
): Promise<WorkAttendanceEntity> => {
  return await apiClientService.get(`${baseUrl}/${id}`).then((res) => res.data);
};

export const updateWorkAttendance = async (
  id: number,
  payload: UpdateWorkAttendanceRequest
): Promise<WorkAttendanceEntity> => {
  return await apiClientService
    .put(`${baseUrl}/${id}`, payload)
    .then((res) => res.data);
};
