import apiClientService from "./ApiClientService"

const baseUrl = "http://127.0.0.1:8080/api/v1/statistics/"

export type RevenueStatisticPerDate = {
    date: string,
    revenue: number
}

export type StatisticByRevenueAndDate = {
    totalRevenue: number,
    revenueStatistics: RevenueStatisticPerDate[]
}

export const getStatisticByRevenueAndDate = async (params: string):
    Promise<StatisticByRevenueAndDate> => {
    return await apiClientService.get(baseUrl + "by_revenue_and_date?" + params).then(res => res.data);
}