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
}
export type UserEntity = {
    id: number;
    name: string;
    phoneNumber: string;
    email?: string;
    password?: string;
    address?: string;
    dob?: string;
    gender?: string;
    roleId?: number;
    position?: string;
    salaryType?:string;
    salaryPerHour?:number;
    salaryPerMonth?:number;
    status?:string;
    note?:string;
}

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
    updatedTime: string;
}