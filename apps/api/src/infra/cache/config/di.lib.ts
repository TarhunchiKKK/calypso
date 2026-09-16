/** biome-ignore-all lint/suspicious/noExplicitAny: `any` type is necessary for inline type usage */
import type { ModuleMetadata, Type } from "@nestjs/common";

export const CACHE_OPTIONS_INJECTION_TOKEN = Symbol();

export type CacheModuleOptions = {
    host: string;

    port: number;

    password?: string;

    defaultTtl: number;
};

export type CacheOptionsFactory = {
    createCacheOptions: () => CacheModuleOptions | Promise<CacheModuleOptions>;
};

export type CacheModuleAsyncOptions = Pick<ModuleMetadata, "imports"> & {
    useClass: Type<CacheOptionsFactory>;
};
