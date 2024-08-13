export interface IUserAuthenticationResult {
    isAuthenticated: boolean;
    errorMessage: string;
    authenticatedUser: any;
}

export interface ISidebarItem {
    icon: string;
    text: string;
}