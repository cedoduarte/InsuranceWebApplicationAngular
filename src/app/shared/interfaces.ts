export interface IUserAuthenticationResult {
    isAuthenticated: boolean;
    errorMessage: string;
    authenticatedUser: any;
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

export interface ISidebarItem {
    icon: string;
    text: string;
}