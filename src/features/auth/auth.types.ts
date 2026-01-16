import { Role } from "./auth.enum";

export interface AuthUser {
    uid: string;
    email: string;
    name: string;
    photo?: string;
    accessToken: string;
    refreshToken: string;
    providerId:string;
    phoneNumber:string|null;
}