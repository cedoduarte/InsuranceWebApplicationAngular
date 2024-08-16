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
}

export interface IUpdateUserCommand {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface IGetUserListQuery {
    keyword: string;
    getAll: boolean;
    pageNumber: number;
    pageSize: number;
}

export interface ISidebarItem {
    icon: string;
    text: string;
}

export interface ICrudNavItem {
    text: string;
}