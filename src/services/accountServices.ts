import type { AxiosInstance } from "axios";
import http from "../plugins/http";

export const loginService = async (
    email: string,
    password: string
): Promise<any> => {
    return await http.post<AxiosInstance>("login", {
        email,
        password,
    });
};

export const getMeService = async (): Promise<any> => {
    return await http.get<AxiosInstance>("auth/me");
};
