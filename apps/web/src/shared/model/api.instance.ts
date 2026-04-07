/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
/** biome-ignore-all lint/complexity/noBannedTypes: <explanation> */
import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import { Env } from "../config";

type ApiType = {
    get: typeof axios.get;
    post: typeof axios.post;
    patch: typeof axios.patch;
    put: typeof axios.put;
    delete: typeof axios.delete;
};

class Api implements ApiType {
    private instance = axios.create({
        baseURL: Env.api.url
    });

    private isAuthError(error: any) {
        return error?.response?.status === 401 || error?.response?.status === 403;
    }

    private refreshSession() {
        this.instance.get("/auth/refresh");
    }

    private async executeQuery<T>(cb: () => Promise<T>): Promise<T> {
        try {
            return await cb();
        } catch (error) {
            if (this.isAuthError(error)) {
                this.refreshSession();
                return await this.executeQuery(cb);
            }

            throw error;
        }
    }

    public get<T = any, R = AxiosResponse<T, any, {}>, D = any>(url: string, config?: AxiosRequestConfig<D>) {
        return this.executeQuery(() => this.instance.get<T, R, D>(url, config));
    }

    public post<T = any, R = AxiosResponse<T, any, {}>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
        return this.executeQuery(() => this.instance.post<T, R, D>(url, data, config));
    }

    public patch<T = any, R = AxiosResponse<T, any, {}>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
        return this.executeQuery(() => this.instance.patch<T, R, D>(url, data, config));
    }

    public put<T = any, R = AxiosResponse<T, any, {}>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
        return this.executeQuery(() => this.instance.put<T, R, D>(url, data, config));
    }

    public delete<T = any, R = AxiosResponse<T, any, {}>, D = any>(url: string, config?: AxiosRequestConfig<D>) {
        return this.executeQuery(() => this.instance.delete<T, R, D>(url, config));
    }
}

export const ApiInstance = new Api();
