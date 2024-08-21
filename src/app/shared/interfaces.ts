import { InsuranceStatus } from "./enums";

export interface IUserAuthenticationResult {
    isAuthenticated: boolean;
    errorMessage: string;
    authenticatedUser: any;
}

export interface IUserListResult {
    totalCount: number;
    userList: IUserViewModel[];
}

export interface IUserViewModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    birthdate: string;
    lastModified: string;
    isDeleted: boolean;
    lastDeleted: string;
    lastCreated: string;
}

export interface IAuthenticateUserCommand {
    email: string;
    password: string;
}

export interface ICreateUserCommand {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmedPassword: string;
    birthdate: string;
}

export interface IUpdateUserCommand {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmedPassword: string;
    birthdate: string;
}

export interface ICarViewModel {
    id: number;
    model: string;
    color: string;
    price: number;
    plateNumber: string;
    lastModified: string;
    isDeleted: boolean;
    lastDeleted: string;
    lastCreated: string;
}

export interface ICreateCarCommand {
    model: string;
    color: string;
    price: number;
    plateNumber: string;
}

export interface IUpdateCarCommand {
    id: number;
    model: string;
    color: string;
    price: number;
    plateNumber: string;
}

export interface ICarListResult {
    totalCount: number;
    carList: ICarViewModel[];
}

export interface IInsuranceViewModel {
    id: number;
    startDate: string;
    endDate: string;
    typeOfInsurance: string;
    premium: number;
    status: InsuranceStatus;
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    carId: number;
    model: string;
    color: string;
    price: number;
    plateNumber: string;
    lastModified: string;
    isDeleted: boolean;
    lastDeleted: string;
    lastCreated: string;
}

export interface IUpdateInsuranceCommand {
    id: number;
    userId: number;
    carId: number;
    startDate: string;
    endDate: string;
    typeOfInsurance: string;
    premium: number;
    status: InsuranceStatus
}

export interface IInsuranceListResult {
    totalCount: number;
    insuranceList: IInsuranceViewModel[];
}

export interface IGetEntityListQuery {
    [key: string]: any;
    keyword: string;
    getAll: boolean;
    pageNumber: number;
    pageSize: number;
    resetCache: boolean;
}

export interface ISidebarItem {
    icon: string;
    text: string;
}

export interface ICrudNavItem {
    text: string;
}