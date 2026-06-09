/** biome-ignore-all lint/suspicious/noExplicitAny: `any` type is necessary for inline type usage */
import type { ModuleMetadata } from "@nestjs/common";

export const CACHE_OPTIONS_INJECTION_TOKEN = Symbol();

export type CacheModuleOptions = {
    host: string;

    port: number;

    password?: string;

    defaultTtl: number;
};

export type CacheModuleAsyncOptions = Pick<ModuleMetadata, "imports"> & {
    inject?: any[];

    useFactory?: (...args: any[]) => CacheModuleOptions | Promise<CacheModuleOptions>;
};
