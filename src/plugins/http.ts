import axios, {
    AxiosError,
    type AxiosInstance,
    type AxiosResponse,
} from "axios";

const http: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_BASE || "http://127.0.0.1:8087/api/v1/",
});

http.interceptors.request.use(
    (config: any) => {
        const token: string | null = localStorage.getItem("access_token");
        const isAuthPath: boolean = config.url.includes("auth/login") || false;

        if (token && !isAuthPath)
            config.headers.Authorization = `Bearer ${token}`;
        else if (!isAuthPath )
            config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);
export default http;
