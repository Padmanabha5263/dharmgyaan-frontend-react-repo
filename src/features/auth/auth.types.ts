import { Role } from "./auth.enum";

export interface AuthUser {
    uid: string;
    email: string;
    name: string;
    photo?: string;
    role: Role
}