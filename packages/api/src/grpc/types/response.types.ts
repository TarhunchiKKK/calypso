import type { Observable } from "rxjs";
import type { GrpcError } from "../generated";

export type GrpcResponse<T = unknown> = {
    data?: T;

    error?: GrpcError;
};

export type UnwrapGrpcResponse<T extends Record<string, any>> = {
    [P in keyof T]: T[P] extends (
        ...args: any[]
    ) =>
        | Promise<{ data?: infer U; error?: unknown }>
        | Observable<{ data?: infer U; error?: unknown }>
        | { data?: infer U; error?: unknown }
        ? (...args: Parameters<T[P]>) => Promise<U> | Observable<U> | U
        : T[P];
};
