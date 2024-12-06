export type SupplierEntity = {
    id: number;
    code: string;
    name: string;
    phoneNumber: string;
    email?: string;
    address?: string;
    totalDebt: number;
    totalCost: number;
    status: string;
    note?: string;
}