import apiClientService from "./ApiClientService";

const baseUrl: string = "http://localhost:8080/api/v1/activity_logs";

export type ActivityLogEntity = {
  id: number;
  userId: number;
  userName: string;
  action: string;
  amount: number;
  createdAt: string;
};

export const getAllActivityLogs = async (
  query: string
) => {
  return await apiClientService
    .get(`${baseUrl}?${query}`)
    .then((res) => res.data);
};
