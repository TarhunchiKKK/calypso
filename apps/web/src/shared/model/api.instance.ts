/** biome-ignore-all lint/suspicious/noExplicitAny: Type `any` is necessary for valid error handling */
import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import { Env } from "../config";

// DELETE: this code will be replaced with `HttpClient`
// REFACTOR: move to shared/api folder
type ApiType = {
    get: typeof axios.get;
    post: typeof axios.post;
    patch: typeof axios.patch;
    put: typeof axios.put;
    delete: typeof axios.delete;
};

class Api implements ApiType {
    private instance = axios.create({
        baseURL: Env.api.url,
        withCredentials: true
    });

    private isAuthError(error: any) {
        return error?.response?.status === 401 || error?.response?.status === 403;
    }

    private async refreshSession() {
        await this.instance.get("/auth/refresh");
    }

    private async executeQuery<T>(cb: () => Promise<AxiosResponse<T>>): Promise<T> {
        try {
            const response = await cb();

            return response.data;
        } catch (error) {
            if (this.isAuthError(error)) {
                await this.refreshSession();

                const response = await cb();

                return response.data;
            } else {
                throw error;
            }
        }
    }

    public async get<T>(url: string, config?: AxiosRequestConfig) {
        return await this.executeQuery(() => this.instance.get<T>(url, config));
    }

    public async post<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
        return await this.executeQuery(() => this.instance.post<T>(url, data, config));
    }

    public async patch<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
        return await this.executeQuery(() => this.instance.patch<T>(url, data, config));
    }

    public async put<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
        return await this.executeQuery(() => this.instance.put<T>(url, data, config));
    }

    public async delete<T = any>(url: string, config?: AxiosRequestConfig) {
        return await this.executeQuery(() => this.instance.delete<T>(url, config));
    }
}

export const ApiInstance = new Api();
