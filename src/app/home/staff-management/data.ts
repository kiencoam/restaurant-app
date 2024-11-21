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
}
export type AccountEntity = {
    id: number;
    userName: string;
    password: string;
    position: string;
}