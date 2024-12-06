import apiClientService from "./ApiClientService";
import { UserEntity } from "./UserService";

const baseUrl: string = "http://localhost:8080/api/v1/salary_details";

export type SalaryDetailEntity = {
  id: number;
  code: string;
  userId: number;
  userName: string;
  salaryPeriodId: number;
  totalWorkingDays: number;
  totalWorkingHours: number;
  totalSalary: number;
  paidSalary: number;
  status: string;
  paymentMethod: string;
  user: UserEntity;
};

export type PaymentSalaryDetailRequest = {
  salaryDetailId: number;
  paidSalary: number;
};

export const getAllSalaryDetails = async (query: string) => {
  return await apiClientService
    .get(`${baseUrl}?${query}`)
    .then((res) => res.data);
};
