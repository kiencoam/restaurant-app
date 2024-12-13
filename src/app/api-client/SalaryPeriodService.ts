import apiClientService from "./ApiClientService";
import {
  PaymentSalaryDetailRequest,
  SalaryDetailEntity,
} from "./SalaryDetailService";

const baseUrl: string = "http://localhost:8080/api/v1/salary_periods";

export type CreateSalaryPeriodRequest = {
  fromDate: string;
  toDate: string;
  title: string;
};

export type PaymentSalaryPeriodRequest = {
  paymentMethod: string;
  note?: string;
  paymentSalaryDetails: PaymentSalaryDetailRequest[];
};

export type SalaryPeriodEntity = {
  id: number;
  code: string;
  title: string;
  fromDate: string;
  toDate: string;
  totalSalary: number;
  paidSalary: number;
  status: string;
  salaryDetails: SalaryDetailEntity[];
};

export type UpdateSalaryPeriodStatusRequest = {
  status: string;
};

export const createSalaryPeriod = async (
  payload: CreateSalaryPeriodRequest
): Promise<SalaryPeriodEntity> => {
  return await apiClientService.post(baseUrl, payload).then((res) => res.data);
};

export const getDetailSalaryPeriod = async (
  id: number
): Promise<SalaryPeriodEntity> => {
  return await apiClientService.get(`${baseUrl}/${id}`).then((res) => res.data);
};

export const asyncCalculateSalaryPeriod = async (
  id: number
): Promise<SalaryPeriodEntity> => {
  return await apiClientService
    .get(`${baseUrl}/${id}/async_calculate`)
    .then((res) => res.data);
};
// : Promise<SalaryPeriodEntity>
export const getAll = async (query: string) => {
  return await apiClientService
    .get(`${baseUrl}?${query}`)
    .then((res) => res.data);
};

export const paymentSalaryPeriod = async (
  id: number,
  payload: PaymentSalaryPeriodRequest
): Promise<SalaryPeriodEntity> => {
  return await apiClientService
    .put(`${baseUrl}/${id}`, payload)
    .then((res) => res.data);
};

export const updateSalaryPeriodStatus = async (
  id: number,
  payload: UpdateSalaryPeriodStatusRequest
): Promise<SalaryPeriodEntity> => {
  return await apiClientService
    .put(`${baseUrl}/${id}/status`, payload)
    .then((res) => res.data);
};

export const deleteSalaryPeriod = async (
  id: number
): Promise<SalaryPeriodEntity> => {
  return await apiClientService
    .delete(`${baseUrl}/${id}`)
    .then((res) => res.data);
};
