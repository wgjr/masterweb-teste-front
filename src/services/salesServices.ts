import type { AxiosInstance } from "axios";
import http from "../plugins/http";

export const createSales = async (
    products: [],
): Promise<any> => {
    return await http.post<AxiosInstance>("cart/close", {
        "products" : products,
    });
};