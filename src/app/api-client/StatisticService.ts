import apiClientService from "./ApiClientService";

const baseUrl = "http://127.0.0.1:8080/api/v1/statistics/";

export type CustomerStatisticPerDate = {
  date: string; // LocalDate chuyển thành string trong TypeScript
  count: number;
};

export type CustomerStatisticPerHour = {
  hour: number;
  count: number;
};

export type MenuItemStatistic = {
  menuItemId: number;
  menuItemName: string;
  quantity: number;
  revenue: number;
};

export type RevenueStatisticPerDate = {
  date: string;
  revenue: number;
};

export type RevenueStatisticPerHour = {
  hour: number;
  revenue: number;
};

export type StatisticByCustomerAndDate = {
  totalCustomer: number;
  customerStatistics: CustomerStatisticPerDate[];
};

export type StatisticByCustomerAndHour = {
  totalCustomer: number;
  customerStatistics: CustomerStatisticPerHour[];
};

export type StatisticByMenuItem = {
  menuItemStatistics: MenuItemStatistic[];
};

export type StatisticByRevenueAndDate = {
  totalRevenue: number;
  revenueStatistics: RevenueStatisticPerDate[];
};

export type StatisticByRevenueAndHour = {
  totalRevenue: number;
  revenueStatistics: RevenueStatisticPerHour[];
};

// export const getStatisticByRevenueAndDate = async (params: string):
//     Promise<StatisticByRevenueAndDate> => {
//     return await apiClientService.get(baseUrl + "by_revenue_and_date?" + params).then(res => res.data);
// }

export const getStatisticByRevenueAndDate = async (
  params: string
): Promise<StatisticByRevenueAndDate> => {
  return await apiClientService
    .get(`${baseUrl}/by_revenue_and_date?${params}`)
    .then((res) => res.data);
};

export const getStatisticByRevenueAndHour = async (
  params: string
): Promise<StatisticByRevenueAndHour> => {
  return await apiClientService
    .get(`${baseUrl}/by_revenue_and_hour?${params}`)
    .then((res) => res.data);
};

export const getStatisticByCustomerAndDate = async (
  params: string
): Promise<StatisticByCustomerAndDate> => {
  return await apiClientService
    .get(`${baseUrl}/by_customer_and_date?${params}`)
    .then((res) => res.data);
};

export const getStatisticByCustomerAndHour = async (
  params: string
): Promise<StatisticByCustomerAndHour> => {
  return await apiClientService
    .get(`${baseUrl}/by_customer_and_hour?${params}`)
    .then((res) => res.data);
};

export const getStatisticByMenuItem = async (
  params: string
): Promise<StatisticByMenuItem> => {
  return await apiClientService
    .get(`${baseUrl}/by_menu_item?${params}`)
    .then((res) => res.data);
};
