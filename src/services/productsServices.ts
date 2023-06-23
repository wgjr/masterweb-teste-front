import type { AxiosInstance } from "axios";
import http from "../plugins/http";

export const getProducts = async (): Promise<any> => {
    return await http.get<AxiosInstance>("products");
};