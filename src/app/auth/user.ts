export interface User {
    email: string;
    banned: boolean;
    roles: string[];
}

export enum Roles {
    ADMIN = 'admin',
    MANAGER = 'manager',
    CLIENT = 'client'
}
