export interface AuthUser {
    isAuthenticated: boolean;
    uid: string;
    email: string;
    name: string;
    photo?: string;
    accessToken: string;
    refreshToken: string;
    providerId: string;
    phoneNumber: string | null;
}