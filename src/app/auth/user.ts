export interface User {
    email: string;
    banned: boolean;
    roles: Roles;
}

export interface Roles {
    admin: boolean,
    manager: boolean,
    client: boolean
}
